/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import {
  createComment,
  savePostImage,
  handleLiking,
  getPostDetails,
} from "../services/operations/postDetailsAPI";
import {
  RiChat3Line,
  RiDownload2Line,
  RiHeartLine,
  RiHeartFill,
  RiShareForwardLine,
} from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const PostCard = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState({});
  const [comment, setComment] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [likedPost, setLikedPost] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const navigator = window.navigator;
  const { user } = useSelector((state) => state.profile);

  const [commentBody, setCommentBody] = useState({
    body: "",
    user: "",
    postId: "",
  });

  useEffect(() => {
    const getPostData = async () => {
      const result = await getPostDetails(postId, token);

      setPostData(result?.postDetails);
      setCommentsData(
        result?.commentsDetails?.sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1
        )
      );
    };
    getPostData();
  }, [postId, comment, commentBody, likedPost]);

  function changeHandler(event) {
    setCommentBody((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    const data = {
      ...commentBody,
      user: user._id,
      postId: postData._id,
    };

    setComment(data);

    await createComment(data, token);
    setCommentBody({
      body: "",
      user: "",
      post: "",
    });
  }

  async function clickHandler(postId) {
    if (postData?.likes?.includes(user?._id)) {
      // Already liked
      await handleLiking(postId, token);
      setLikedPost((prev) => !prev);
    } else {
      // Not liked
      await handleLiking(postId, token);
      setLikedPost((prev) => !prev);
    }
  }

  // if (IsLoading) return <div className="loader">Loading...</div>;

  return (
    <div className="absolute h-screen w-screen mt-0 mobileS:-top-[4.5rem] display4K:-left-24 laptop:-left-10 tablet:left-0 mobileL:left-0 mobileM:left-0 mobileM:-top-[5.5rem] mobileS:left-0 -top-[5.8rem] -left-16 z-[1000]">
      <div className="mt-16 mobileS:mt-10  mobileL:mt-10mobileM:mt-10  w-full h-full flex items-center justify-center bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="w-10/12 display4K:w-full mobileS:w-full mobileL:w-full mobileM:w-full tablet:w-full h-full flex items-center justify-center">
          <div
            className="border-[2px] w-10/12 mobileL:w-full mobileS:w-full mobileM:w-full tablet:w-full tablet:max-w-[750px] mobileM:max-w-[360px] mobileM:max-h-[90vh]
           mobileS:max-w-[310px] mobileS:max-h-[90vh] mobileL:max-h-[90vh] mobileL:max-w-[400px] max-w-[900px] display4K:max-w-[1440px] border-secondary-600 rounded-lg overflow-hidden"
          >
            {/* Post Header */}
            <div className="flex flex-row justify-between items-center mobileL:p-2 bg-primary-100 mobileS:p-2 mobileM:p-2 p-5">
              <p className="flex flex-row gap-x-2 mobileS:text-lg mobileL:text-lg mobileM:text-lg items-center text-secondary-900 text-xl font-semibold">
                <img
                  src={postData?.user?.profileImage}
                  className="h-8 w-8 rounded-full"
                />
                {postData?.user?.userName}
              </p>
              <button onClick={() => navigate(-1)}>
                <RxCross2 className="text-2xl text-secondary-700 hover:text-secondary-900" />
              </button>
            </div>

            {/* Post Content */}
            <div className="flex flex-row h-full mobileS:flex-col mobileL:flex-col mobileM:flex-col mx-auto w-full">
              <div
                className="max-h-[400px] display4K:max-h-[900px] mobileS:h-full mobileL:w-full mobileS:w-full mobileM:w-full mobileM:h-[300px] mobileL:h-[350px] flex items-center justify-center 
              w-[50%] p-2 bg-white border-t-[2px] border-t-secondary-600 border-r-[0px] border-r-secondary-600"
              >
                <img
                  src={postData?.postImageUrl}
                  className="rounded-xl object-contain h-full w-full"
                />
              </div>
              {/* Comments */}
              <div className="relative flex flex-col mobileS:w-full mobileL:w-full display4K:max-h-[900px] mobileM:w-full w-[50%] max-h-[400px]">
                {/* User Comments */}
                <div className="flex flex-row gap-x-2 items-center bg-primary-100 border-t-[2px] border-t-secondary-600 p-5 py-2">
                  <img
                    src={postData?.user?.profileImage}
                    className="h-6 w-6 rounded-full"
                  />

                  <div className="flex flex-col">
                    <p className="flex gap-x-2 items-center">
                      <span className="font-bold text-secondary-900 underline">
                        {postData?.user?.userName}
                      </span>
                      <span className=" text-secondary-700">
                        {postData?.caption}
                      </span>
                      {postData?.tags?.length > 0 && (
                        <span className="text-primary-700">
                          {postData?.tags?.map((tag, index) => (
                            <span key={index}>#{tag}</span>
                          ))}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-secondary-500">
                      {" "}
                      {new Date(postData?.postedAt).toLocaleString("en-US", {
                        weekday: "short",
                        year: "2-digit",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>

                {/* other user comments */}
                <div className="bg-primary-100 no-scrollbar bg-opacity-40 flex flex-col mobileS:max-h-[120px] mobileM:max-h-[120px] display4K:max-h-[600px] max-h-[240px] overflow-y-scroll">
                  {commentsData?.length > 0 &&
                    commentsData?.map((comment, index) => {
                      const date = new Date(comment?.createdAt);
                      const time = date.toLocaleString("en-US", {
                        weekday: "short",
                        year: "2-digit",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      });
                      return (
                        <div
                          key={index}
                          className={`flex flex-row gap-x-2 items-center p-5 pt-2 pb-0 ${
                            commentsData?.length - 1 === index ? "pb-2" : ""
                          }`}
                        >
                          <img
                            src={comment?.userDetails?.profileImage}
                            className="h-6 w-6 rounded-full"
                          />
                          <div>
                            <p className="flex gap-x-2 items-center">
                              <span className="font-bold text-secondary-900 underline">
                                {comment?.userDetails?.userName}
                              </span>
                              <span className="text-secondary-700">
                                {comment?.body}
                              </span>
                            </p>
                            <p className="text-xs text-secondary-500">{time}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Like comments and Share */}
                <div className="absolute mobileS:relative mobileM:relative w-full bottom-0 bg-primary-100 border-t-[2px] border-t-secondary-600 max-h-[150px]">
                  <div className="flex flex-row justify-between items-center text-3xl p-5 py-2">
                    <div className="grid grid-cols-3 place-items-center gap-x-1">
                      {/* Like */}
                      <div
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          clickHandler(postData?._id);
                        }}
                      >
                        {postData?.likes?.includes(user?._id) ? (
                          <div>
                            <RiHeartFill className="text-red" />
                          </div>
                        ) : (
                          <div>
                            <RiHeartLine />
                          </div>
                        )}
                      </div>

                      {/* comment */}
                      <div className="cursor-pointer">
                        <RiChat3Line />
                      </div>

                      {/* share */}
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location);
                          toast.success("Link copied Successfully.");
                        }}
                      >
                        {" "}
                        <RiShareForwardLine />
                      </div>

                      {/* No. of likes */}
                      <p className="text-xs">
                        {" "}
                        {postData?.likes?.length || 0} likes
                      </p>

                      {/* no> of comments */}
                      <p className=" text-sm col-span-2">
                        {" "}
                        {postData?.comments?.length || 0} comments
                      </p>
                    </div>

                    {/* Save */}
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        savePostImage(postData?._id, token);
                      }}
                    >
                      <RiDownload2Line />
                    </div>
                  </div>

                  {/* Add comment */}
                  <form
                    onSubmit={submitHandler}
                    className="flex flex-row gap-x-2 border-t-[2px] border-t-secondary-600 px-5 py-2"
                  >
                    <input
                      type="text"
                      name="body"
                      id="body"
                      value={commentBody.body}
                      onChange={changeHandler}
                      placeholder="Add a comment..."
                      required
                      className="outline-none border-b-[1px] border-b-slate-300 py-1 rounded-md px-2 w-full outline-b"
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue to-red text-secondary-100 px-2 transition-all duration-200 hover:text-secondary-900 rounded-lg "
                    >
                      POST
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
