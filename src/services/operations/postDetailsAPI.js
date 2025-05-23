import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { postEndpoints } from "../api";

const {
  LIKE_POST_API,
  GET_POST_DETAILS_API,
  COMMENT_POST_API,
  SEND_POST_API,
  SAVE_POST_API,
  GET_POST_API,
  GET_USER_POST_API,
  GET_POST_COMMENTS_API,
  SAVE_IMAGE_API,
} = postEndpoints;

export const sendPost = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector({
      method: "POST",
      url: SEND_POST_API,
      bodyData: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Send Post Details");
    }
    toast.success("Send Post Successfully");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createComment = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector({
      method: "POST",
      url: COMMENT_POST_API,
      bodyData: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Create Comment");
    }
    toast.success("Send Post Successfully");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getAllPosts = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_POST_API,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success) {
      throw new Error("Could Not  GET_POST");
    }
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getUserPost = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_USER_POST_API,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch UserPost");
    }
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const savePostImage = async (postId, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector({
      method: "POST",
      url: SAVE_POST_API,
      bodyData: { postId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Post Downloaded Details");
    }
    toast.success("Post Downloaded Successfully");
    toast.success("Check Downloads Folder.");
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};

export const saveImage = async (imageURL, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector({
      method: "POST",
      url: SAVE_IMAGE_API,
      bodyData: { imageURL },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Save the Photo");
    }
    toast.success("Photo Downloaded Successfully");
    toast.success("Check Downloads Folder.");
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};

export const getComments = async (postId, token) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector({
      method: "GET",
      url: `${GET_POST_COMMENTS_API}?postId=${postId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Comments");
    }
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const handleLiking = async (postId, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector({
      method: "POST",
      url: LIKE_POST_API,
      bodyData: { postId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Handle liking post Details");
    }
    result = response?.data?.data;
    // toast.success("Post Downloaded Successfully");
    // toast.success("Check Downloads Folder.");
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getPostDetails = async (postId, token) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector({
      method: "POST",
      url: GET_POST_DETAILS_API,
      bodyData: { postId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Post details");
    }
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
