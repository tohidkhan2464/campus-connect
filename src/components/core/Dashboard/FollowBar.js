/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  sendFollowRequest,
} from "../../../services/operations/profileAPI";
import { FiUserPlus, FiCheckCircle } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setRequestSent,
  setUsersData,
} from "../../../redux/slices/activitySlice";

const FollowBar = () => {
  const { usersData, requestSent } = useSelector((state) => state.activity);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  async function sendRequest(userId) {
    const res = await sendFollowRequest(userId, token);
    if (res) {
      dispatch(setRequestSent(!requestSent));
    }
  }

  useEffect(() => {
    (async () => {
      const result = await getAllUsers();
      const filteredData = result.filter(
        (data) => data.userName !== user.userName
      );
      dispatch(setUsersData(filteredData));
    })();
  }, [requestSent, user, token]);

  return (
    <div className="fixed top-[60px] mobileS:hidden mobileM:hidden right-0 max-h-[calc(100vh-3.5rem)] h-full">
      {/* For Desktop Mode */}
      <div className=" mx-auto flex flex-col items-center min-w-[250px] h-[100%] w-full py-10 mobileS:border-none border-l-2 ">
        <div className="flex flex-col mx-auto gap-y-2 justify-end ">
          {usersData?.length > 0 &&
            usersData?.map((userData, index) => {
              // filtered user entry and user active followings
              return (
                <React.Fragment key={index}>
                  {userData?._id === user?._id ? (
                    <div></div>
                  ) : (
                    <>
                      <div
                        onClick={() => {
                          navigate(`/profile/${userData?.userName}`);
                        }}
                        className="flex bg-white p-2 rounded-lg max-w-[250px]"
                      >
                        <div className="flex flex-row gap-x-2 mx-4">
                          <img
                            src={userData?.profileImage}
                            alt={`Profile Image of ${userData?.firstName} ${userData?.lastName}`}
                            className="rounded-full h-12 w-12"
                          />
                          <div className="flex w-full flex-col">
                            <p>
                              {userData?.firstName} {userData?.lastName}
                            </p>

                            <p className="flex flex-row gap-x-2 hover:text-primary-700 font-semibold cursor-pointer transition-all duration-200 items-center">
                              {userData?.follower?.includes(user?._id) ? (
                                <span
                                  className="flex gap-x-2 items-center"
                                  onClick={(e) => {
                                    sendRequest(userData?._id);
                                    e.stopPropagation();
                                  }}
                                >
                                  <FiCheckCircle /> Unfollow
                                </span>
                              ) : (
                                <span
                                  className="flex gap-x-2 items-center"
                                  onClick={(e) => {
                                    sendRequest(userData?._id);
                                    e.stopPropagation();
                                  }}
                                >
                                  <FiUserPlus /> Follow
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default FollowBar;
