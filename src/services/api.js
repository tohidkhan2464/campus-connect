const BASE_URL = "http://localhost:4000/api/v1";
// const BASE_URL = "https://studynotion-auqd.onrender.com/api/v1"

// AUTH ENDPOINTS
export const AuthEndpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_PROFILE_API: BASE_URL + "/profile/getUserProfile",
  GET_USER_FOLLOWERS_API: BASE_URL + "/profile/getFollowers",
  GET_ALL_USERS_API: BASE_URL + "/profile/getAllUsers",
  GET_ALL_USER_FOLLOWING_API: BASE_URL + "/profile/getFollowing",
  DELETE_ACCOUNT_BY_ADMIN: BASE_URL + "/profile/deleteAccountByAdmin",

  GET_USER_PENDING_FOLLOWERS_API: BASE_URL + "/profile/followers",
  SEND_FOLLOW_REQUEST_API: BASE_URL + "/profile/send-request",
  GET_ALL_USER_PENDING_FOLLOWING_API: BASE_URL + "/profile/follow",
  ACCEPT_FOLLOW_REQUEST_API: BASE_URL + "/profile/accept-request",
};

// NOTIFICATIONS
export const notifications = {
  GET_NOTIFICATIONS: BASE_URL + "/notification",
  GET_ACTIVITY: BASE_URL + "/notification/activity",
  SET_ACTIVITY_SEEN: BASE_URL + "/notification/setActivity",
};

// BROADCAST
export const broadcast = {
  GET_BROADCASTS: BASE_URL + "/broadcast/get-broadcast",
  SEND_BROADCASTS: BASE_URL + "/broadcast/send-broadcast",
};

// MESSAGES
// export const messages = {
//   GET_NOTIFICATIONS: BASE_URL + "/notification",
//   GET_ACTIVITY: BASE_URL + "/notification/activity",
// };

// POST AND POST ACTIVITIES
export const postEndpoints = {
  GET_ALL_LIKES: BASE_URL + "/post/all-likes",
  GET_ALL_COMMENTS: BASE_URL + "/post/all-comments",
  LIKE_POST_API: BASE_URL + "/post/like",
  GET_POST_DETAILS_API: BASE_URL + "/post/postDetails",
  COMMENT_POST_API: BASE_URL + "/post/comment",
  SEND_POST_API: BASE_URL + "/post/send",
  SAVE_POST_API: BASE_URL + "/post/save",
  GET_POST_API: BASE_URL + "/post",
  GET_USER_POST_API: BASE_URL + "/post/user-post",
  GET_POST_COMMENTS_API: BASE_URL + "/post/get-comments",
};

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
};

// Search APIs
export const searchEndpoints = {
  POST_SEARCH_API: BASE_URL + "/search/post",
  USER_SEARCH_API: BASE_URL + "/search/user",
  NEWS_SEARCH_API: BASE_URL + "/search/news",
  SEARCH_HOME_PAGE_API: BASE_URL + "/search",
};
