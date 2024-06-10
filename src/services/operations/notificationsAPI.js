import { toast } from "react-hot-toast";
// import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { notifications } from "../api";
import { broadcast } from "../api";
// import { messages } from "../api";
// import { logout } from "./authAPI";

const { GET_BROADCASTS, SEND_BROADCASTS } = broadcast;
// const { GET_BROADCASTS, SEND_BROADCASTS } = message;
const { GET_ACTIVITY, GET_NOTIFICATIONS } = notifications;
