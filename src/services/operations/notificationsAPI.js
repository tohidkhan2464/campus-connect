import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { notifications } from "../api";

const {
  GET_ACTIVITY,
  SET_ACTIVITY_SEEN,
} = notifications;

export const getActivity = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_ACTIVITY,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Activity");
    }
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const handleActivitySeen = async (activityId, token) => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: SET_ACTIVITY_SEEN,
      bodyData: { activityId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Handle activity");
    }
  } catch (error) {
    toast.error(error.message);
  }
  // toast.dismiss(toastId);
  return;
};
