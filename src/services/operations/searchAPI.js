import { toast } from "react-hot-toast";
import { searchEndpoints } from "../api";
import { apiConnector } from "../apiConnector";

const {
  SEARCH_BY_COLLEGE_API,
  USER_SEARCH_API,
  POST_SEARCH_API,
  RANDOM_SEARCH_API,
} = searchEndpoints;

export async function searchPost(token, data) {
  const toastId = toast.loading("loading...");
  console.log("searchPost API", data);
  let result = [];
  try {
    const response = await apiConnector({
      method: "POST",
      url: POST_SEARCH_API,
      bodyData: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("POST_SEARCH_API RESPONSE", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("POST_SEARCH_API ERROR", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
}

export async function postByCollege(token) {
  const toastId = toast.loading("loading...");
  let result = [];
  try {
    const response = await apiConnector({
      method: "GET",
      url: SEARCH_BY_COLLEGE_API,
      bodyData: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("SEARCH_BY_COLLEGE_API RESPONSE", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("SEARCH_BY_COLLEGE_API ERROR", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
}

export async function searchUser(token, data) {
  const toastId = toast.loading("loading...");
  console.log("searchUser API", data);
  let result = [];
  try {
    const response = await apiConnector({
      method: "POST",
      url: USER_SEARCH_API,
      bodyData: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("USER_SEARCH_API RESPONSE", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("USER_SEARCH_API ERROR", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
}

export async function randomSearch(token) {
  const toastId = toast.loading("loading...");
  let result = [];
  try {
    const response = await apiConnector({
      method: "GET",
      url: RANDOM_SEARCH_API,
      bodyData: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("RANDOM_SEARCH_API RESPONSE", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("RANDOM_SEARCH_API ERROR", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
}
