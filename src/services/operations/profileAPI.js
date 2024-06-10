import { toast } from "react-hot-toast";
// import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../api";
// import { logout } from "./authAPI";

const {
  GET_USER_DETAILS_API,
  GET_USER_FOLLOWERS_API,
  GET_ALL_USERS_API,
  GET_ALL_USER_FOLLOWING_API,
  DELETE_ACCOUNT_BY_ADMIN,
  GET_USER_PENDING_FOLLOWERS_API,
  SEND_FOLLOW_REQUEST_API,
  GET_ALL_USER_PENDING_FOLLOWING_API,
  ACCEPT_FOLLOW_REQUEST_API,
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
    toast.error("Could not get Enrolled Courses.");
  }
  toast.dismiss(toastId);
  return result;
}

export async function getAllUsers(token) {
  const toastId = toast.loading("loading...");
  let result = [];
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_ALL_USERS_API,
      bodyData: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("RESPONSE GET_ALL_USERS_API", response)

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    toast.error("Could not get Enrolled Courses.");
  }
  toast.dismiss(toastId);
  return result;
}

export async function sendFollowRequest(receivingUserId, token) {
  const toastId = toast.loading("loading...");
  console.log("RECEIVER", receivingUserId);
  let result = [];
  try {
    const response = await apiConnector({
      method: "POST",
      url: SEND_FOLLOW_REQUEST_API,
      bodyData: receivingUserId,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("RESPONSE GET_ALL_USERS_API", response)

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    toast.error("Could not get Enrolled Courses.");
  }
  toast.dismiss(toastId);
  return result;
}
