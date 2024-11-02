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
import copy from "copy-to-clipboard";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const PostCard = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState({});
  const [comment, setComment] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [likedPost, setLikedPost] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
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

  return (
    <div className="absolute h-screen w-screen mt-0 -top-[5.8rem] -left-16 z-[1000]">
      <div className="mt-16 w-full h-full flex items-center justify-center bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="w-10/12 h-full flex items-center justify-center">
          <div className="border-[2px] w-10/12 max-w-[900px] border-secondary-600 rounded-lg overflow-hidden">
            {/* Post Header */}
            <div className="flex flex-row justify-between items-center bg-primary-100 p-5">
              <p className="flex flex-row gap-x-2 items-center text-secondary-900 text-xl font-semibold">
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
            <div className="flex flex-row mx-auto w-full">
              <div className="max-h-[400px] flex items-center justify-center w-[50%] p-2 bg-white border-t-[2px] border-t-secondary-600 border-r-[2px] border-r-secondary-600">
                <img
                  src={postData?.postImageUrl}
                  className="rounded-xl object-contain h-full"
                />
              </div>
              {/* Comments */}
              <div className="relative flex flex-col w-[50%] max-h-[400px]">
                {/* User Comments */}
                <div className="flex flex-row gap-x-2 items-center bg-primary-100 border-t-[2px] border-t-secondary-600 p-5 py-2">
                  <img
                    src={postData?.user?.profileImage}
                    className="h-6 w-6 rounded-full"
                  />
                  <div>
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
                  </div>
                </div>

                {/* other user comments */}
                <div className=" bg-primary-100 no-scrollbar h-full bg-opacity-40 flex flex-col max-h-[240px] overflow-y-scroll">
                  {commentsData?.length > 0 &&
                    commentsData?.map((comment, index) => (
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
                        </div>
                      </div>
                    ))}
                </div>

                {/* Like comments and Share */}
                <div className=" absolute w-full bottom-0 bg-primary-100 border-t-[2px] border-t-secondary-600 max-h-[150px]">
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
                          // copy(location);
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
