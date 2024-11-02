import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../api";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";

const {
  GET_USER_DETAILS_API,
  GET_ALL_USERS_API,
  SEND_FOLLOW_REQUEST_API,
  GET_USER_PROFILE_API,
  SEND_BROADCASTS_API,
  SEND_NOTIFICATION_API,
} = profileEndpoints;

export async function getUserDetails(token) {
  const toastId = toast.loading("loading...");
  let result = [];
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_USER_DETAILS_API,
      bodyData: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    toast.error("Could not get User Details.");
  }
  toast.dismiss(toastId);
  return result;
}

export const getUserProfile = async (token, userName) => {
  const toastId = toast.loading("Loading...");
  // console.log("userName IN", userName);
  let result = [];
  try {
    const response = await apiConnector({
      method: "GET",
      url: `${GET_USER_PROFILE_API}?userName=${userName}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("GET_USER_PROFILE_API API response............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch User Profile");
    }
    result = response?.data?.data;
  } catch (error) {
    // console.log("GET_USER_PROFILE_API API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export async function getAllUsers() {
  const toastId = toast.loading("loading...");
  let result = [];
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_ALL_USERS_API,
      bodyData: null,
    });

    // console.log("RESPONSE GET_ALL_USERS_API", response)

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("GET_ALL_USERS_API error", error);
    // toast.error("Could not get Users Details.");
  }
  toast.dismiss(toastId);
  return result;
}

export async function sendFollowRequest(receivingUserId, token) {
  const toastId = toast.loading("loading...");
  console.log("RECEIVER", receivingUserId);
  console.log("token", token);
  let result = [];
  try {
    const response = await apiConnector({
      method: "POST",
      url: SEND_FOLLOW_REQUEST_API,
      bodyData: { receivingUserId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("RESPONSE SEND_FOLLOW_REQUEST_API", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    toast.error("Could not SEND_FOLLOW_REQUEST_API.");
  }
  toast.dismiss(toastId);
  return result;
}

export async function sendBroadcast(data, token, accessToken) {
  const toastId = toast.loading("loading...");
  let result = null;
  try {
    const response = await apiConnector({
      method: "POST",
      url: SEND_BROADCASTS_API,
      bodyData: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("RESPONSE SEND_BROADCASTS_API", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    } else {
      let tokens = [];
      const userRef = collection(db, "users");
      const q = query(userRef, where("id", "in", response?.data?.userIds));
      const querySnapShot = await getDocs(q);
      if (querySnapShot.empty) {
        toast.error("No matching users.");
        console.log("No matching documents");
      } else {
        querySnapShot.forEach((doc) => {
          tokens = tokens.concat(doc.data().notificationToken);
        });
      }
      const responseSendNotification = await sendNotification(
        tokens,
        accessToken,
        response.data.data,
        token
      );
      if (responseSendNotification.success) {
        result = { success: true, message: "Message broadcasted successfully" };
        toast.success("Message broadcasted successfully");
      }
    }
  } catch (error) {
    toast.error("Could not SEND_BROADCASTS_API.");
    console.log("SEND_BROADCASTS_API error", error);
  }
  toast.dismiss(toastId);
  return result;
}

async function sendNotification(
  tokens,
  accessToken,
  notificationDetails,
  token
) {
  let result = null;

  try {
    const response = await apiConnector({
      method: "POST",
      url: SEND_NOTIFICATION_API,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      bodyData: {
        accessToken: accessToken,
        messageBody: {
          operation: "create",
          notification_key_name: Date.now().toString(),
          registration_ids: tokens,
        },
      },
    });
    console.log("SEND_NOTIFICATION_API response", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    } else {
      const notificationResponse = await sendBroadcastNotification(
        response.data.data.notification_key,
        accessToken,
        notificationDetails,
        token
      );
      console.log("notificationResponse", notificationResponse);
      if (notificationResponse.success) {
        result = { success: true, message: "Message broadcasted successfully" };
      }
    }
  } catch (error) {
    console.error("SEND_NOTIFICATION_API error", error);
  }
  return result;
}

export async function sendBroadcastNotification(
  notificationKey,
  accessToken,
  notificationDetails,
  token
) {
  const toastId = toast.loading("loading...");
  console.log(accessToken);
  let result = null;
  try {
    const response = await apiConnector({
      method: "POST",
      url: `https://fcm.googleapis.com/v1/projects/react-chat-app-25799/messages:send`,
      bodyData: {
        message: {
          token: notificationKey,
          notification: {
            title: notificationDetails.messageTitle,
            body: notificationDetails.message,
          },
        },
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("RESPONSE Notification", response);
    if (!response.data.name.includes("projects")) {
      throw new Error(response.data.message);
    }
    result = { success: true, message: "Message broadcasted successfully" };
    toast.success(response.data.message);
  } catch (error) {
    toast.error("Could not send Notification.");
    console.log("Notification error", error);
  }
  toast.dismiss(toastId);
  return result;
}
