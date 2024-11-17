import React, { useEffect, useState } from "react";
import {
  getActivity,
  handleActivitySeen,
} from "../services/operations/notificationsAPI";
import { useDispatch, useSelector } from "react-redux";
import { sendFollowRequest } from "../services/operations/profileAPI";
import { FiUserPlus, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Activity = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [isSeen, setIsSeen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getActivityData = async () => {
      setLoading(true);
      const result = await getActivity(token);
      if (result) {
        setData(result);
      }
      setLoading(false);
    };
    getActivityData();
  }, [token, requestSent, isSeen]);

  const sendRequest = async (userId) => {
    const res = await sendFollowRequest(userId, token);
    if (res) {
      dispatch(setRequestSent(!requestSent));
    }
  };

  const setActivitySeen = (activityId) => {
    handleActivitySeen(activityId, token);
    setIsSeen(!isSeen);
  };

  return (
    <div>
      <div className="mt-10 mobileS:mt-3 w-full h-full flex items-center justify-center">
        <div className="w-8/12 mx-auto mobileS:w-full h-full flex items-center justify-center">
          <div className="h-full w-11/12 mobileS:w-full flex items-center mx-auto">
            <div className="mx-auto w-11/12">
              {data.length < 1 ? (
                <div className="flex w-full mt-44 items-center justify-center ">
                  <div
                    className="bg-white p-2 pb-0 mobileS:text-3xl mobileS:whitespace-nowrap rounded-lg text-center w-full text-[3rem] font-semibold 
                 text-transparent bg-clip-text bg-gradient-to-t from-[#b5faff] to-[#f1ff77] border-b-[2px]"
                  >
                    No activity till now
                  </div>
                </div>
              ) : (
                <div className="mx-auto w-11/12 mobileS:w-full">
                  <p className="text-center mobileS:text-xl text-3xl font-semibold underline mb-5">
                    ACTIVITY
                  </p>
                  <div className="flex flex-col w-full gap-y-6 mobileS:gap-y-1 overflow-hidden ">
                    {data?.map((item, index) => (
                      <div
                        key={item._id}
                        onClick={() => {
                          setActivitySeen(item?._id);
                          if (item?.postId?.postImageUrl) {
                            navigate(`/view-post/${item?.postId?._id}`);
                          }
                        }}
                        className={` w-full py-1 px-10 mobileS:px-2 border-[2px] rounded-lg border-secondary-800  ${
                          item?.isSeen === "False"
                            ? "bg-secondary-300 font-extrabold"
                            : "bg-white "
                        }  `}
                      >
                        <div className="flex my-4 mobileS:my-0 w-full flex-row gap-x-16 mobileS:gap-x-4 justify-between items-center ">
                          <div className="flex flex-row gap-x-2 items-center w-[70%] mobileS:w-full">
                            <img
                              src={item?.senderId?.profileImage}
                              alt="Sender Profile"
                              className={`h-12 w-12 mobileS:h-4 mobileS:w-4 rounded-full ${
                                item?.isSeen === "False"
                                  ? " outline-[1px] mobileS:outline-[1px] outline-offset-[1px] outline"
                                  : " outline-none"
                              }`}
                            />
                            <div className="mobileS:text-sm mobileS:font-normal mobileS:w-full ">
                              <span
                                className={` mx-2 mobileS:mx-0 mobileS:mr-1 ${
                                  item?.isSeen === "False"
                                    ? "font-extrabold mobileS:font-semibold"
                                    : "font-semibold mobileS:font-normal"
                                } `}
                              >
                                {item?.senderId?.userName}
                              </span>
                              <span className="">
                                {item?.message}
                              </span>
                            </div>
                          </div>
                          {item?.postId?.postImageUrl ? (
                            <div className="w-[30%] mobileS:max-h-[30px] mobileS:w-auto mx-auto">
                              <img
                                src={item?.postId?.postImageUrl}
                                alt="Post"
                                className={`max-h-20 mobileS:max-h-[30px] w-full object-contain `}
                              />
                            </div>
                          ) : (
                            <div className="flex flex-row mx-auto w-[30%] mobileS:max-h-[60px] mobileS:text-sm mobileS:w-[70px] gap-x-2 text-xl font-semibold cursor-pointer transition-all duration-200 items-center ">
                              {item?.senderId?.following.includes(user._id) ? (
                                <span className="flex gap-x-2 items-center border-[2px] mobileS:px-1 mobileS:border-[1px] mobileS:gap-x-1 border-secondary-900 mx-auto rounded-md px-4 py-1">
                                  <FiCheckCircle className="text-primary-700" />
                                  Following
                                </span>
                              ) : (
                                <span
                                  className="flex gap-x-2 items-center border-[2px] mobileS:px-1 mobileS:border-[1px] mobileS:gap-x-1 border-secondary-900 rounded-md mx-auto px-4 py-1 text-white bg-primary-700"
                                  onClick={(e) => {
                                    sendRequest(item?.senderId?._id);
                                    setActivitySeen(item?._id);
                                  }}
                                >
                                  <FiUserPlus /> Follow
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
