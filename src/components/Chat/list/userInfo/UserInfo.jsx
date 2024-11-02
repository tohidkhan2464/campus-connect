import React from "react";
import "./userInfo.css";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useUserStore } from "../../../../lib/userStore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="userinfo">
      <div className="user">

        <img src={user?.profileImage || "./assets/avatar.png"} className="img" alt="" onClick={() => navigate("/my-profile")} />
        <div className="username">
          <h2 onClick={() => navigate("/my-profile")}>{currentUser?.username}</h2>
          <p>{user?.additionalDetails?.about}</p>
        </div>
      </div>
      <div className="icons">
        <HiOutlinePencilAlt className="img text-white" onClick={() => navigate(`/my-profile/${currentUser?.username}`)} />
      </div>
    </div>
  );
};

export default UserInfo;