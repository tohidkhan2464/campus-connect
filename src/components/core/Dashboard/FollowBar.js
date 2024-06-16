/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  sendFollowRequest,
  // acceptFollowRequest,
} from "../../../services/operations/profileAPI";
import { FiUserPlus, FiCheckCircle, FiClock } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { setUsersData } from "../../../redux/slices/activitySlice";

const FollowBar = () => {
  const { usersData } = useSelector((state) => state.activity);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [requestSent, setRequestSent] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const sendRequest = (userId) => {
    sendFollowRequest({
      receivingUserId: userId,
      token,
    });
    setRequestSent(!requestSent);
  };

  // const acceptRequest = (userId) => {
  //   acceptFollowRequest({
  //     acceptingUserid: userId,
  //     token,
  //   });
  //   setRequestSent(!requestSent);
  // };

  useEffect(() => {
    const getAllUsersData = async () => {
      const result = await getAllUsers(token);
      const filteredData = result.filter(
        (data) => data.userName !== user.userName
      );
      dispatch(setUsersData(filteredData));
    };
    getAllUsersData();
  }, [requestSent, user, location.pathname, token, dispatch]);

  return (
    <div className="fixed top-[60px] right-0 max-h-[calc(100vh-3.5rem)] h-full">
      {/* For Desktop Mode */}
      <div className=" mx-auto flex flex-col items-center min-w-[300px] h-[100%] w-full py-10 border-l-2 ">
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
                                <span className="flex gap-x-2 items-center">
                                  <FiCheckCircle /> Following
                                </span>
                              ) : userData?.following?.includes(user?._id) ? (
                                <span className="flex gap-x-2 items-center">
                                  <FiCheckCircle className="text-primary-700" />{" "}
                                  Follower
                                </span>
                              ) : userData?.pendingFollower?.includes(
                                  user?._id
                                ) ? (
                                <span className="flex gap-x-2 items-center">
                                  <FiClock /> Pending
                                </span>
                              ) : (
                                <span
                                  className="flex gap-x-2 items-center"
                                  onClick={(e) => {
                                    sendRequest(userData?._id);
                                    e.stopPropagation();
                                  }}
                                >
                                  <FiUserPlus /> Follow{" "}
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
