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
  let result = [];
  try {
    const response = await apiConnector({
      method: "GET",
      url: `${GET_USER_PROFILE_API}?userName=${userName}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch User Profile");
    }
    result = response?.data?.data;
  } catch (error) {
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


    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    // toast.error("Could not get Users Details.");
  }
  toast.dismiss(toastId);
  return result;
}

export async function sendFollowRequest(receivingUserId, token) {
  const toastId = toast.loading("loading...");
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


    if (!response.data.success) {
      throw new Error(response.data.message);
    } else {
      let tokens = [];
      const userRef = collection(db, "users");
      const q = query(userRef, where("id", "in", response?.data?.userIds));
      const querySnapShot = await getDocs(q);
      if (querySnapShot.empty) {
        toast.error("No matching users.");
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
    if (!response.data.success) {
      throw new Error(response.data.message);
    } else {
      const notificationResponse = await sendBroadcastNotification(
        response.data.data.notification_key,
        accessToken,
        notificationDetails,
        token
      );
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
    if (!response.data.name.includes("projects")) {
      throw new Error(response.data.message);
    }
    result = { success: true, message: "Message broadcasted successfully" };
    toast.success(response.data.message);
  } catch (error) {
    toast.error("Could not send Notification.");
  }
  toast.dismiss(toastId);
  return result;
}
