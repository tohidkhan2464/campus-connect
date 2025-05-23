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
  const [requestSent, setRequestSent] = useState(false);
  const [isSeen, setIsSeen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getActivityData = async () => {
      const result = await getActivity(token);
      if (result) {
        setData(result);
      }
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
      <div className="mt-10 mobileS:mt-3 mobileL:mt-3 mobileM:mt-3 w-full h-full flex items-center justify-center">
        <div className="w-8/12 mx-auto mobileL:w-full mobileS:w-full mobileM:w-full h-full flex items-center justify-center">
          <div className="h-full w-11/12 mobileS:w-full mobileL:w-full mobileM:w-full flex items-center mx-auto">
            <div className="mx-auto w-11/12">
              {data.length < 1 ? (
                <div className="flex w-full mt-44 items-center justify-center ">
                  <div
                    className="bg-white p-2 pb-0 mobileS:text-3xl mobileL:text-3xl mobileM:text-3xl mobileM:whitespace-nowrap mobileS:whitespace-nowrap rounded-lg text-center w-full text-[3rem] font-semibold 
                 text-transparent bg-clip-text bg-gradient-to-t from-[#b5faff] to-[#f1ff77] border-b-[2px]"
                  >
                    No activity till now
                  </div>
                </div>
              ) : (
                <div className="mx-auto w-11/12 mobileS:w-full mobileL:w-full mobileM:w-full">
                  <p className="text-center mobileS:text-xl mobileM:text-xl mobileL:text-xl text-3xl font-semibold underline mb-5">
                    ACTIVITY
                  </p>
                  <div className="flex flex-col w-full gap-y-6 mobileL:gap-y-1 mobileS:gap-y-1 mobileM:gap-y-1 overflow-hidden ">
                    {data?.map((item, index) => (
                      <div
                        key={item._id}
                        onClick={() => {
                          setActivitySeen(item?._id);
                          if (item?.postId?.postImageUrl) {
                            navigate(`/view-post/${item?.postId?._id}`);
                          }
                        }}
                        className={` w-full py-1 px-10 mobileS:px-2 mobileL:px-2 mobileM:px-2 border-[2px] rounded-lg border-secondary-800  ${
                          item?.isSeen === "False"
                            ? "bg-secondary-300 font-extrabold"
                            : "bg-white "
                        }  `}
                      >
                        <div className="flex my-4 mobileS:my-0 mobileM:my-0 mobileL:my-0 mobileL:gap-x-4 mobileM:gap-x-4 w-full flex-row gap-x-16 mobileS:gap-x-4 justify-between items-center ">
                          <div className="flex flex-row gap-x-2 items-center w-[70%] mobileS:w-full mobileL:w-full">
                            <img
                              src={item?.senderId?.profileImage}
                              alt="Sender Profile"
                              className={`h-12 w-12 mobileS:h-4 mobileM:h-5 mobileM:w-5 mobileL:h-6 mobileL:w-6 mobileS:w-4 rounded-full ${
                                item?.isSeen === "False"
                                  ? " outline-[1px] outline-offset-[1px] outline"
                                  : " outline-none"
                              }`}
                            />
                            <div className="mobileS:text-sm mobileM:text-sm mobileL:font-normal mobileL:w-full mobileS:font-normal mobileM:font-normal mobileM:w-full mobileS:w-full ">
                              <span
                                className={` mx-2 mobileS:mx-0 mobileM:mx-0 mobileL:mx-0 mobileL:mr-1 mobileM:mr-1 mobileS:mr-1 ${
                                  item?.isSeen === "False"
                                    ? "font-semibold"
                                    : "font-normal"
                                } `}
                              >
                                {item?.senderId?.userName}
                              </span>
                              <span className="">{item?.message}</span>
                            </div>
                          </div>
                          {item?.postId?.postImageUrl ? (
                            <div className="w-[30%] mobileS:max-h-[30px] mobileL:max-h-[30px] mobileL:w-auto mobileM:max-h-[30px] mobileS:w-auto mobileM:w-auto mx-auto">
                              <img
                                src={item?.postId?.postImageUrl}
                                alt="Post"
                                className={`max-h-20 mobileS:max-h-[30px]  mobileL:max-h-[30px] mobileM:max-h-[30px] w-full object-contain `}
                              />
                            </div>
                          ) : (
                            <div
                              className="flex flex-row mx-auto w-[30%] mobileS:max-h-[60px]  mobileL:max-h-[60px]  mobileL:max-w-[70px] mobileM:max-h-[60px] mobileM:text-sm mobileM:w-[70px]
                             mobileS:text-sm mobileS:w-[70px] gap-x-2 text-xl font-semibold cursor-pointer transition-all duration-200 items-center "
                            >
                              {item?.senderId?.following.includes(user._id) ? (
                                <span
                                  className="flex gap-x-2 items-center border-[2px] mobileS:px-1 mobileM:px-1 mobileL:px-1 mobileL:border-[1px] mobileL:gap-x-1 mobileM:border-[1px] mobileM:gap-x-1 mobileS:border-[1px] mobileS:gap-x-1 
                                border-secondary-900 mx-auto rounded-md px-4 py-1"
                                >
                                  <FiCheckCircle className="text-primary-700" />
                                  Following
                                </span>
                              ) : (
                                <span
                                  className="flex gap-x-2 items-center border-[2px] mobileS:px-1 mobileL:px-1 mobileL:border-[1px] mobileL:gap-x-1 mobileM:px-1 mobileM:border-[1px] mobileM:gap-x-1 
                                  mobileS:border-[1px] mobileS:gap-x-1 border-secondary-900 rounded-md mx-auto px-4 py-1 text-white bg-primary-700"
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
