import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { AuthEndpoints } from "../api";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = AuthEndpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector({
        method: "POST",
        url: SENDOTP_API,
        bodyData: {
          email,
          checkUserPresent: true,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Check Your mail and try again."
      );
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(data, navigate) {
  // console.log("email", data.email, "pass", data.password);
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector({
        method: "POST",
        url: LOGIN_API,
        bodyData: {
          email: data.email,
          password: data.password,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      console.log("LOGIN API RESPONSE", response);
      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/my-profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed");
      console.log("ERROR", error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  firstName,
  lastName,
  email,
  password,
  userName,
  confirmPassword,
  accountType,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector({
        method: "POST",
        url: SIGNUP_API,
        bodyData: {
          firstName,
          lastName,
          email,
          password,
          userName,
          confirmPassword,
          accountType,
          otp,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector({
        method: "POST",
        url: RESETPASSTOKEN_API,
        bodyData: { email },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      toast.error(error);
    }

    dispatch(setLoading(false));
  };
}

export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector({
        method: "POST",
        url: RESETPASSWORD_API,
        bodyData: { password, confirmPassword, token },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been updated successfully");
    } catch (error) {
      toast.error(error);
    }
    dispatch(setLoading(false));
  };
}
