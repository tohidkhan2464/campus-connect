/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUserPlus, FiCheckCircle } from "react-icons/fi";
import { useParams } from "react-router-dom";
import {
  getUserProfile,
  sendFollowRequest,
} from "../../../services/operations/profileAPI";
import ViewImageModal from "./ViewImageModal";
import { setRequestSent } from "../../../redux/slices/activitySlice";

const OtherUserProfile = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { requestSent } = useSelector((state) => state.activity);
  const [userData, setUserData] = useState(null);
  const { user } = useSelector((state) => state.profile);
  const [viewImage, setViewImage] = useState(null);

  const sendRequest = async (userId) => {
    const res = await sendFollowRequest(userId, token);
    if (res) {
      dispatch(setRequestSent(!requestSent));
    }
  };
  useEffect(() => {
    const getUserData = async () => {
      const result = await getUserProfile(token, userName);
      setUserData(result);
    };
    getUserData();
  }, [userName, requestSent, token]);

  return (
    <div>
      <div className="mt-16 w-full h-full flex items-center justify-center">
        <div className="w-8/12 mx-auto h-full flex items-center justify-center">
          {/* Heading */}
          <div className="h-full w-11/12 flex flex-col items-center justify-center gap-y-5">
            <p className="text-center text-4xl underline font-semibold">
              User Profile
            </p>
            <div className="flex flex-col justify-center items-center w-10/12 gap-y-10">
              {/* Details div */}
              <div
                className="flex flex-row gap-x-10 items-center justify-between rounded-xl border-[3px] border-secondary-600
               mx-auto w-11/12 bg-white p-8 px-14"
              >
                {/* Profile Photo Div */}
                <div
                  onClick={() => setViewImage(userData?.profileImage)}
                  className="relative border-[2px] border-secondary-600 cursor-pointer  p-2 rounded-full  h-44 w-44"
                >
                  <img
                    src={userData?.profileImage}
                    className="h-full w-full rounded-full "
                  />
                </div>

                {/* Details Div */}
                <div>
                  <div className="">
                    <div className="text-xl flex flex-row gap-x-2 items-center justify-between font-semibold">
                      <p className="underline">{userData?.userName}</p>

                      <div className="flex flex-row gap-x-2 hover:text-primary-700 text-xl font-semibold cursor-pointer transition-all duration-200 items-center">
                        {userData?.follower?.includes(user?._id) ? (
                          <span className="flex gap-x-2 items-center">
                            <FiCheckCircle /> Following
                          </span>
                        ) : (
                          <span
                            className="flex gap-x-2 items-center"
                            onClick={(e) => {
                              sendRequest(userData?._id);
                              // e.stopPropagation();
                            }}
                          >
                            <FiUserPlus /> Follow{" "}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-2">
                    {/* no of posts */}
                    <p>{userData?.posts?.length} Posts</p>
                    {/* no of followers */}
                    <p>{userData?.follower?.length} Followers</p>
                    {/* no of followings */}
                    <p>{userData?.following?.length} Followings</p>
                  </div>
                  <div className="flex flex-row justify-between gap-x-2">
                    {/* name */}
                    <p>
                      {userData?.firstName} {userData?.lastName}
                    </p>
                    {/* account Type */}
                    <p className="text-secondary-800 underline">
                      {userData?.accountType}
                    </p>
                  </div>
                  <p className="text-sm">{userData?.email}</p>{" "}
                  <p className="mt-1 text-secondary-600">
                    {userData?.additionalDetails?.about}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {viewImage && (
        <ViewImageModal image={viewImage} setViewImage={setViewImage} />
      )}
    </div>
  );
};

export default OtherUserProfile;
