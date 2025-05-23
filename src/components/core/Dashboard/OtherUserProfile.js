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
      <div className="mt-16 mobileS:mt-5 mobileL:mt-5 tablet:mt-5 mobileM:mt-5 w-full h-full flex items-center justify-center">
        <div className="w-8/12 mobileS:w-full mobileM:w-full tablet:w-full mobileL:w-full mx-auto h-full flex items-center justify-center">
          {/* Heading */}
          <div className="h-full w-11/12 mobileS:w-full mobileL:w-full tablet:w-full mobileM:w-full flex flex-col items-center justify-center gap-y-5">
            <p className="text-center mobileS:text-xl mobileM:text-xl tablet:text-2xl mobileL:text-2xl text-4xl underline font-semibold">
              User Profile
            </p>
            <div className="flex flex-col justify-center mobileL:w-full tablet:w-full items-center mobileS:w-full w-10/12 mobileM:w-full gap-y-10">
              {/* Details div */}
              <div
                className="flex flex-row gap-x-10 mobileL:gap-5 mobileS:gap-5 mobileM:gap-5 items-center justify-between rounded-xl border-[3px] border-secondary-600 mx-auto w-11/12 mobileS:w-11/12 mobileM:w-11/12
                 mobileL:w-11/12 mobileL:flex-col mobileM:flex-col mobileM:px-4  mobileS:flex-col bg-white p-8 px-14 mobileL:px-4 mobileS:px-4"
              >
                {/* Profile Photo Div */}
                <div
                  onClick={() => setViewImage(userData?.profileImage)}
                  className="relative border-[2px] border-secondary-600 cursor-pointer mobileL:h-36 mobileL:w-36 p-2 rounded-full mobileS:h-28 mobileS:w-28 mobileM:h-32 mobileM:w-32  h-44 w-44"
                >
                  <img
                    src={userData?.profileImage}
                    className="h-full w-full rounded-full "
                  />
                </div>

                {/* Details Div */}
                <div>
                  <div className="">
                    <div className="text-xl flex mobileS:text-sm mobileM:text-sm flex-row gap-x-2 items-center justify-between font-semibold">
                      <p className="underline mobileS:text-lg mobileM:text-lg">{userData?.userName}</p>

                      <div className="flex flex-row gap-x-2 hover:text-primary-700 text-xl font-semibold cursor-pointer transition-all duration-200 items-center">
                        {userData?.follower?.includes(user?._id) ? (
                          <span className="flex gap-x-2 items-center mobileS:text-lg mobileM:text-lg">
                            <FiCheckCircle className="mobileS:text-xl mobileM:text-xl" /> Following
                          </span>
                        ) : (
                          <span
                            className="flex gap-x-2 items-center mobileM:text-lg  mobileS:text-lg"
                            onClick={(e) => {
                              sendRequest(userData?._id);
                              // e.stopPropagation();
                            }}
                          >
                            <FiUserPlus className="mobileS:text-xl mobileM:text-xl"/> Follow{" "}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-2 mobileS:text-sm mobileM:text-sm">
                    {/* no of posts */}
                    <p>{userData?.posts?.length} Posts</p>
                    {/* no of followers */}
                    <p>{userData?.follower?.length} Followers</p>
                    {/* no of followings */}
                    <p>{userData?.following?.length} Followings</p>
                  </div>
                  <div className="flex flex-row justify-between gap-x-2 mobileS:text-sm mobileM:text-sm">
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
                  <p className="mt-1 text-secondary-600 mobileS:text-sm mobileM:text-sm">
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
