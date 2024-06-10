/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  sendFollowRequest,
} from "../../../services/operations/profileAPI";
import { FiUserPlus, FiCheckCircle, FiClock } from "react-icons/fi";

const FollowBar = () => {
  const [usersData, setUsersData] = useState({});
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [requestSent, setRequestSent] = useState(false);

  const sendRequest = (userId) => {
    sendFollowRequest({
      receivingUserId: userId,
      token,
    });
    setRequestSent(!requestSent);
  };

  useEffect(() => {
    const getAllUsersData = async () => {
      const result = await getAllUsers(token);
      setUsersData(result);
    };
    getAllUsersData();
  }, [requestSent]);

  return (
    <div className="fixed top-[60px] right-0 max-h-[calc(100vh-3.5rem)] h-full">
      {/* For Desktop Mode */}
      <div className=" mx-auto flex flex-col items-center min-w-[300px] h-[100%] w-full py-10 border-l-2 ">
        <div className="flex flex-col mx-auto gap-y-2 justify-end ">
          {usersData.length > 0 &&
            usersData.map((userData, index) => {
              // filtered user entry and user active followings
              return (
                <React.Fragment key={index}>
                  {user._id === userData._id ? (
                    <div></div>
                  ) : (
                    <div className="flex bg-white p-2 rounded-lg max-w-[250px]">
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
                            {user?.following?.includes(userData?._id) ? (
                              <span className="flex gap-x-2 items-center">
                                <FiCheckCircle /> Following
                              </span>
                            ) : user?.pendingFollowing?.includes(
                                userData?._id
                              ) ? (
                              <span className="flex gap-x-2 items-center">
                                <FiClock /> Pending
                              </span>
                            ) : (
                              <span
                                className="flex gap-x-2 items-center"
                                onClick={() => sendRequest(userData?._id)}
                              >
                                <FiUserPlus /> Follow
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
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
