import React from "react";
import { savePostImage } from "../services/operations/postDetailsAPI";
import { useSelector } from "react-redux";
import {
  RiChat3Line,
  RiDownload2Line,
  RiHeartLine,
  RiHeartFill,
  RiShareForwardLine,
} from "react-icons/ri";
import copy from "copy-to-clipboard";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const SearchResults = () => {
  const { query } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { searchData } = useSelector((state) => state.activity);
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="mt-16 mobileS:mt-5 mobileM:mt-5 mobileL:mt-5 w-full h-full flex items-center justify-center ">
      <div className="w-full h-full flex items-center justify-center ">
        {query !== "userSearch" ? (
          <div className="">
            {searchData?.length < 1 ? (
              <div className="flex w-full mt-44 mobileS:mt-5 mobileL:mt-5 mobileM:mt-5 items-center justify-center ">
                <div
                  className="bg-white p-2 pb-0 mobileS:text-xl mobileL:text-xl mobileM:text-xl rounded-lg text-center w-full text-[3rem] font-semibold 
              text-transparent bg-clip-text bg-gradient-to-t from-[#b5faff] to-[#f1ff77] border-b-[2px]"
                >
                  No Data Found
                </div>
              </div>
            ) : (
              <div
                className="rounded-md border-secondary-700 mobileS:max-w-[300px] mobileL:max-w-[400px] mobileM:max-w-[350px] mobileM:w-full mobileM:gap-y-2 mobileM:gap-0
               mobileS:w-full mobileS:gap-y-2 mobileS:gap-0 grid grid-cols-2 mobileS:grid-cols-1 mobileL:grid-cols-1 mobileL:gap-0 mobileL:w-full mobileM:grid-cols-1 gap-8 max-w-[750px]"
              >
                {searchData?.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white p-2 mobileS:w-full mobileM:w-full mobileL:w-full rounded-md border-[1px] border-secondary-700 "
                    onClick={() => navigate(`/view-post/${post._id}`)}
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
                          <div className="cursor-pointer">
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
        ) : (
          <div>
            {searchData?.length < 1 ? (
              <div className="flex w-full mt-44 mobileS:mt-5 mobileL:mt-5 mobileM:mt-5 items-center justify-center ">
                <div
                  className="bg-white p-2 pb-0 rounded-lg text-center w-full text-[3rem] font-semibold 
              text-transparent bg-clip-text mobileS:text-xl mobileL:text-xl mobileM:text-xl bg-gradient-to-t from-[#b5faff] to-[#f1ff77] border-b-[2px]"
                >
                  No Data Found
                </div>
              </div>
            ) : (
              <div className="rounded-md border-secondary-700 mobileS:max-w-[310px] mobileL:max-w-[400px] mobileL:grid-cols-1 mobileM:max-w-[350px] mobileM:grid-cols-1 
              grid grid-cols-3 mobileS:grid-cols-1 gap-8">
                {searchData?.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white p-2 px-4 rounded-md border-[1px] border-secondary-700 w-full cursor-pointer"
                    onClick={() => navigate(`/profile/${user?.userName}`)}
                  >
                    {/* Post */}
                    <div className="flex flex-row gap-2 w-full">
                      <img
                        src={user?.profileImage}
                        alt="post"
                        className="w-20 h-20 mobileS:h-16 mobileL:h-16 mobileL:w-16 mobileS:w-16 mobileM:h-16 mobileM:w-16 object-contain rounded-[50%] border-[2px] border-secondary-600"
                      />

                      <div className="flex flex-col gap-0 justify-center items-start w-full">
                        <p className="text-lg font-semibold hover:underline cursor-pointer">
                          {user?.userName}
                        </p>
                        <p className="text-xs font-normal">
                          <span> {user?.follower?.length} Followers </span>
                          <span> {user?.following?.length} Followings </span>
                          <span> {user?.posts?.length} Posts</span>
                        </p>
                        <p className="text-sm whitespace-nowrap opacity-50 mobileS:text-xs mobileM:text-xs">
                          {user?.additionalDetails?.about}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
