import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../api";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateProfile(token, data) {
  // console.log("DATA", data);
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector({
        method: "PUT",
        url: UPDATE_PROFILE_API,
        bodyData: { data },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("UPDATE PROFILE RESPONSE", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(
        setUser({
          
          ...response.data.updatedUserDetails,
          ...response.data.updatedUserDetails.additionalDetails,
        })
      );
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.updatedUserDetails)
      );
      toast.success("Update Successful");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector({
        method: "PUT",
        url: UPDATE_DISPLAY_PICTURE_API,
        bodyData: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("UPDATE_DISPLAY_PICTURE_API RESPONSE .... ", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Display Picture Updated Successfully");

      dispatch(
        setUser({
          ...response.data.updatedUserDetails,
          profileImage: response.data.image_url,
        })
      );

      localStorage.setItem("user", JSON.stringify(response.data.image_url));
    } catch (error) {
      toast.error("Could Not Update Display Picture");
    }
    toast.dismiss(toastId);
  };
}

export function updatePassword(token, data) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector({
        method: "POST",
        url: CHANGE_PASSWORD_API,
        bodyData: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Update Successful");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function deleteProfile(token, data, navigate) {
  // console.log("token", token);
  // console.log("data", data);
  // console.log("navigate", navigate);
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector({
        method: "DELETE",
        url: DELETE_PROFILE_API,
        bodyData: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      console.log("REAPONSE", response);

      dispatch(setToken(null));
      dispatch(setUser(null));
      // dispatch(resetCart());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged Out");
      navigate("/");
      toast.success("Account Deleted Successful");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
