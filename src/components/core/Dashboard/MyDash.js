import React, { useEffect, useState } from "react";
import {
  getAllPosts,
  handleLiking,
  savePostImage,
} from "../../../services/operations/postDetailsAPI";
import { useSelector } from "react-redux";
import {
  RiChat3Line,
  RiDownload2Line,
  RiHeartLine,
  RiHeartFill,
  RiShareForwardLine,
} from "react-icons/ri";
import copy from "copy-to-clipboard";
import { useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyDash = () => {
  const [postData, setPostData] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();
  const [likedPost, setLikedPost] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      const result = await getAllPosts(token);
      setPostData(result);
    };
    getPostData();
  }, [likedPost, token]);

  async function clickHandler(postId) {
    if (likedPost.includes(postId)) {
      // Already liked
      await handleLiking(postId, token);
      setLikedPost((prev) => prev.filter((cid) => cid !== postId));
    } else {
      // Not liked
      await handleLiking(postId, token);
      if (likedPost.length === 0) {
        setLikedPost([postId]);
      } else {
        setLikedPost((prev) => [...prev, postId]);
      }
    }
  }

  return (
    <div className="mt-16 mobileS:mt-3 mobileM:mt-3 laptop:mt-10 mobileL:mt-3 w-full h-full flex items-center justify-center ">
      <div className="w-full h-full flex items-center justify-center ">
        <div className="">
          {postData?.length < 1 ? (
            <div className="flex w-full mt-44 items-center justify-center ">
              <div
                className="bg-white p-2 pb-0 mobileS:text-3xl mobileM:text-3xl mobileL:text-3xl rounded-lg text-center w-full text-[3rem] font-semibold 
              text-transparent bg-clip-text bg-gradient-to-t from-[#b5faff] to-[#f1ff77] border-b-[2px]"
              >
                No Data Found
              </div>
            </div>
          ) : (
            <div
              className="rounded-md border-secondary-700  grid grid-cols-2 mobileS:grid-cols-1 mobileL:grid-cols-1 display4K:grid-cols-3 display4K:min-w-[1000px] laptop:grid-cols-1
             mobileM:grid-cols-1 mobileM:max-w-[350px] mobileS:max-w-[300px] mobileL:max-w-[400px] mobileS:gap-3 mobileL:gap-3 gap-8 flex-col max-w-[750px]"
            >
              {postData?.map((post) => (
                <div
                  key={post._id}
                  className="bg-white p-2 rounded-md border-[1px] border-secondary-700 "
                >
                  {/* Post */}
                  <div className=" ">
                    <Link to={`/view-post/${post._id}`}>
                      <img
                        src={post?.postImageUrl}
                        alt="post"
                        className="h-fit w-[300px] max-h-[230px] object-contain rounded-md"
                      />
                    </Link>
                    <div className="flex flex-row justify-between items-center text-3xl">
                      <div className="grid grid-cols-3 place-content-center gap-x-2">
                        <div
                          className="cursor-pointer"
                          onClick={(e) => {
                            clickHandler(post._id);
                          }}
                        >
                          {post?.likes?.includes(user?._id) ? (
                            <div>
                              <RiHeartFill className="text-red" />
                            </div>
                          ) : (
                            <div>
                              <RiHeartLine />
                            </div>
                          )}
                        </div>

                        <div className="cursor-pointer">
                          <Link to={`/view-post/${post._id}`}>
                            <RiChat3Line />
                          </Link>
                        </div>

                        <div
                          className="cursor-pointer"
                          onClick={(e) => {
                            copy(location.pathname);
                            toast.success("Link copied Successfully.");
                          }}
                        >
                          <RiShareForwardLine />
                        </div>
                        <p className="text-xs">
                          {post?.likes?.length || 0} likes
                        </p>
                        <p className="text-xs col-span-2">
                          {post?.comments?.length || 0} comments
                        </p>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          savePostImage(post?._id, token);
                        }}
                      >
                        <RiDownload2Line />
                      </div>
                    </div>
                    {post?.tags?.slice(0, 5).map((tag, index) => (
                      <span key={index}>#{tag} </span>
                    ))}
                    {post?.comments?.length > 0 && (
                      <div>
                        {post?.comments?.length > 0 ? (
                          <p className="cursor-pointer">View all comments</p>
                        ) : (
                          <p></p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyDash;
