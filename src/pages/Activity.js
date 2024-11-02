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
      <div className="mt-10 w-full h-full flex items-center justify-center">
        <div className="w-8/12 mx-auto h-full flex items-center justify-center">
          <div className="h-full w-11/12 flex items-center mx-auto">
            <div className="mx-auto w-11/12">
              {data.length < 1 ? (
                <div className="flex w-full mt-44 items-center justify-center ">
                  <div
                    className="bg-white p-2 pb-0 rounded-lg text-center w-full text-[3rem] font-semibold 
                 text-transparent bg-clip-text bg-gradient-to-t from-[#b5faff] to-[#f1ff77] border-b-[2px]"
                  >
                    No activity till now
                  </div>
                </div>
              ) : (
                <div className="mx-auto w-11/12">
                  <p className="text-center text-3xl font-semibold underline mb-5">
                    ACTIVITY
                  </p>
                  <div className="flex flex-col w-full  gap-y-6 overflow-hidden ">
                    {data?.map((item, index) => (
                      <div
                        key={item._id}
                        onClick={() => {
                          setActivitySeen(item?._id);
                          if (item?.postId?.postImageUrl) {
                            navigate(`/view-post/${item?.postId?._id}`);
                          }
                        }}
                        className={` w-full py-1 px-10 border-[2px] rounded-lg border-secondary-800  ${
                          item?.isSeen === "False"
                            ? "bg-secondary-300 font-extrabold"
                            : "bg-white "
                        }  `}
                      >
                        <div className="flex my-4 w-full flex-row gap-x-16 justify-between items-center ">
                          <div className="flex flex-row gap-x-2 items-center w-[70%] ">
                            <img
                              src={item?.senderId?.profileImage}
                              alt="Sender Profile"
                              className={`h-12 w-12 rounded-full ${
                                item?.isSeen === "False"
                                  ? " outline-2 outline-offset-2 outline"
                                  : " outline-none"
                              }`}
                            />
                            <div className="">
                              <span
                                className={` mx-2 ${
                                  item?.isSeen === "False"
                                    ? "font-extrabold"
                                    : "font-semibold"
                                } `}
                              >
                                {item?.senderId?.userName}
                              </span>
                              {item?.message}
                            </div>
                          </div>
                          {item?.postId?.postImageUrl ? (
                            <div className="w-[30%] mx-auto">
                              <img
                                src={item?.postId?.postImageUrl}
                                alt="Post"
                                className={`max-h-20 w-full object-contain `}
                              />
                            </div>
                          ) : (
                            <div className="flex flex-row mx-auto w-[30%] gap-x-2 text-xl font-semibold cursor-pointer transition-all duration-200 items-center ">
                              {item?.senderId?.following.includes(user._id) ? (
                                <span className="flex gap-x-2 items-center border-[2px] border-secondary-900 mx-auto rounded-md px-4 py-1">
                                  <FiCheckCircle className="text-primary-700" />{" "}
                                  Following
                                </span>
                              ) : (
                                <span
                                  className="flex gap-x-2 items-center border-[2px] border-secondary-900 rounded-md mx-auto px-4 py-1 text-white bg-primary-700"
                                  onClick={(e) => {
                                    sendRequest(item?.senderId?._id);
                                    setActivitySeen(item?._id);
                                  }}
                                >
                                  <FiUserPlus /> Follow{" "}
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
