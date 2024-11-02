import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../api";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { updatePassword } from "firebase/auth";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateProfile(token, data) {
  console.log("DATA", data);
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
      } else {
        await updateDoc(
          doc(db, "users", response.data.updatedUserDetails._id),
          {
            additionalDetails: data,
          }
        );

        dispatch(
          setUser({
            ...response.data.updatedUserDetails,
            ...response.data.updatedUserDetails.additionalDetails,
          })
        );
        console.log("h");
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.updatedUserDetails)
        );
        toast.success("Update Successful");
      }
    } catch (error) {
      console.log("UPDATE PROFILE ERROR", error);
      toast.error(error?.response?.data?.message);
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
      } else {
        await updateDoc(
          doc(db, "users", response.data.updatedUserDetails._id),
          {
            avatar: response.data.image_url,
          }
        );

        toast.success("Display Picture Updated Successfully");

        dispatch(
          setUser({
            ...response.data.updatedUserDetails,
            profileImage: response.data.image_url,
          })
        );

        localStorage.setItem("user", JSON.stringify(response.data.image_url));
      }
    } catch (error) {
      toast.error("Could Not Update Display Picture");
    }
    toast.dismiss(toastId);
  };
}

export function updateCurrentPassword(token, navigate, data) {
  return async (dispatch) => {
    console.log("DATA updatePassword", data);
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

      // console.log("UPDATE PASSWORD RESPONSE", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        const user = auth.currentUser;
        updatePassword(user, data?.newPassword)
          .then(() => {
            console.log("Password Updated Successfully");
            toast.success("Password Updated Successfully");
            navigate("/my-profile");
          })
          .catch((error) => {
            console.log("ERROR Firebase", error);
            toast.error("Could Not Update Password");
          });
      }
    } catch (error) {
      toast.error(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function deleteProfile(token, data, navigate) {
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

      // console.log("DELETE PROFILE RESPONSE", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        await deleteDoc(doc(db, "userchats", response?.data?.data?._id));
        await deleteDoc(doc(db, "users", response?.data?.data?._id));
        dispatch(setToken(null));
        dispatch(setUser(null));
        auth.currentUser.delete();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/");
        toast.success("Account Deleted Successful");
      }
    } catch (error) {
      console.log("Error in delete profile", error);
      toast.error(error?.response?.data?.message || "Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
