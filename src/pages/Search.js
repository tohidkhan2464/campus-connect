import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  postByCollege,
  randomSearch,
  searchPost,
  searchUser,
} from "../services/operations/searchAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchData } from "../redux/slices/activitySlice";
import toast from "react-hot-toast";

const Search = () => {
  const [search, setSearch] = useState("");
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const submitSearch = async (data) => {
    if (search === "posts") {
      const result = await searchPost(token, data);
      setSearch("");
      if (result.length > 0) {
        dispatch(setSearchData(result));
        navigate(`/search/postSearch`);
      } else {
        toast.error("No Data Found.");
      }
    }
    if (search === "users") {
      const result = await searchUser(token, data);
      setSearch("");
      if (result.length > 0) {
        dispatch(setSearchData(result));
        navigate("/search/userSearch");
      } else {
        toast.error("No Data Found.");
      }
    }
    reset();
  };

  return (
    <div>
      <div className="mt-16 mobileS:mt-4 mobileL:mt-5 tablet:mt-5 mobileM:mt-4 laptop:mt-5 w-full h-full flex items-center justify-center">
        <div className="w-9/12 mobileS:w-full mobileL:w-full tablet:w-full laptop:w-11/12 mobileM:w-full mx-auto h-full flex flex-col items-center justify-center">
          <h2 className="text-center text-4xl tablet:text-2xl mobileL:text-xl laptop:text-2xl mobileS:text-xl mobileM:text-xl underline font-semibold">
            Search for ...{" "}
          </h2>
          <div className="w-9/12 mobileS:w-full laptop:w-11/12 mobileL:w-full tablet:w-full mobileM:w-full mx-auto">
            <div className="flex flex-row justify-between gap-5 mobileL:gap-2 laptop:mt-5 mobileL:mt-2 mobileL:p-1 mobileS:gap-2 mobileM:gap-2 mobileM:mt-2 mobileM:p-1 mobileM:mx-2 mobileS:mt-2 mobileS:p-1
             mt-10 tablet:mt-5 mobileS:mx-2 mobileL:mx-2 tablet:mx-20 mx-40 bg-white p-5 laptop:p-2 laptop:py-1 py-1 rounded-lg border-[3px] border-secondary-500 z-0 ">
              <button
                className="submit-button-style mobileS:text-sm mobileM:text-sm mobileM:py-1 laptop:my-1 mobileM:my-1 max-w-40 mobileS:my-1 mobileS:py-1 mobileL:my-1 mobileL:py-1"
                onClick={() => setSearch("posts")}
              >
                Posts
              </button>
              <button
                className="submit-button-style mobileS:text-sm mobileM:text-sm mobileM:my-1 laptop:my-1 mobileM:py-1 max-w-40 mobileS:my-1 mobileS:py-1 mobileL:my-1 mobileL:py-1"
                onClick={() => setSearch("users")}
              >
                Users
              </button>
              <button
                className="submit-button-style mobileS:text-sm mobileM:text-sm mobileM:my-1 laptop:my-1 mobileM:py-1 max-w-40 mobileS:my-1 mobileS:py-1 mobileL:my-1 mobileL:py-1"
                onClick={async () => {
                  setSearch("");
                  const result = await randomSearch(token);
                  if (result.length > 0) {
                    dispatch(setSearchData(result));
                    navigate("/search/random");
                  } else {
                    toast.error("Error in fetching data");
                  }
                }}
              >
                Random
              </button>
              <button
                className="submit-button-style mobileS:text-sm mobileM:text-sm mobileM:my-1 laptop:my-1 mobileM:py-1 max-w-40 mobileS:my-1 mobileS:py-1 mobileL:my-1 mobileL:py-1"
                onClick={async () => {
                  setSearch("");
                  const result = await postByCollege(token);
                  if (result.length > 0) {
                    dispatch(setSearchData(result));
                    navigate("/search/college");
                  } else {
                    toast.error("Error in fetching data");
                  }
                }}
              >
                College
              </button>
            </div>
          </div>

          {search === "posts" && (
            <form
              className="w-9/12 mx-auto mobileS:w-11/12 laptop:w-8/12 mobileM:w-11/12 mobileL:w-11/12 tablet:w-11/12"
              onSubmit={handleSubmit(submitSearch)}
            >
              <div className="flex flex-col justify-between mt-16 laptop:mt-10 laptop:w-10/12 laptop:mx-auto laptop:p-2 laptop:px-0 mobileS:mt-5 mobileL:mt-5 mobileL:py-4 mobileL:p-2 mobileM:mt-5 mobileM:p-2 mobileM:py-4 bg-white p-5 
              mobileS:p-2 mobileS:py-4 mobileS:text-sm rounded-lg border-[3px] border-secondary-500 z-0">
                <div>
                  <div className="flex gap-x-10 laptop:gap-x-5 mobileS:flex-col laptop:justify-center items-center justify-between mobileM:flex-col mobileL:flex-col">
                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full mobileL:w-full">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter the username of user."
                        className="input-style text-left p-2"
                        {...register("username")}
                      />
                    </div>
                    <div className="flex flex-col w-[38%] mobileS:w-fit mobileM:w-fit mobileL:w-fit">
                      <button className="submit-button-style mobileS:text-sm mobileS:px-4 mobileL:px-4 mobileM:px-4 mobileM:text-sm" type="submit">
                        Search by User
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex gap-x-10 mobileS:flex-col laptop:gap-x-5 laptop:justify-center mobileM:flex-col mobileL:flex-col items-center justify-between">
                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full mobileL:w-full">
                      <input
                        type="text"
                        name="tags"
                        id="tags"
                        placeholder="Enter the tags"
                        className="input-style text-left p-2"
                        {...register("tags")}
                      />
                    </div>
                    <div className="flex flex-col w-[38%] mobileS:w-fit mobileM:w-fit mobileL:w-fit">
                      <button className="submit-button-style mobileS:text-sm mobileM:text-sm mobileL:px-4 mobileM:px-4 mobileS:px-4" type="submit">
                        Search by Tags
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex gap-x-10 mobileS:flex-col laptop:gap-x-5 laptop:justify-center mobileM:flex-col mobileL:flex-col items-center justify-between">
                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full mobileL:w-full">
                      <input
                        type="text"
                        name="captions"
                        id="captions"
                        placeholder="Enter the captions"
                        className="input-style text-left p-2"
                        {...register("captions")}
                      />
                    </div>
                    <div className="flex flex-col w-[38%] mobileS:w-fit mobileM:w-fit mobileL:w-fit ">
                      <button className="submit-button-style mobileS:text-sm mobileS:px-4 mobileL:px-4 mobileM:text-sm mobileM:px-4 " type="submit">
                        Search by Captions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}

          {search === "users" && (
            <form
              className="w-9/12 mx-auto mobileS:w-11/12 laptop:w-8/12 mobileM:w-11/12 mobileL:w-11/12  tablet:w-11/12"
              onSubmit={handleSubmit(submitSearch)}
            >
              <div className="flex flex-col justify-between mt-16 laptop:mt-10 laptop:w-10/12 laptop:mx-auto laptop:p-2 mobileM:mt-5 mobileL:mt-5 mobileL:p-2 mobileL:py-4 mobileM:text-sm mobileM:p-2 mobileM:py-4  mobileS:mt-5 bg-white p-5 
              mobileS:p-2 mobileS:py-4 mobileS:text-sm rounded-lg border-[3px] border-secondary-500 z-0">
                <div>
                  <div className="flex gap-x-10 items-center mobileS:flex-col laptop:gap-x-5 laptop:justify-center mobileM:flex-col mobileL:flex-col justify-between">
                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full mobileL:w-full">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter the name of user."
                        className="input-style text-left p-2"
                        {...register("firstName")}
                      />
                    </div>
                    <div className="flex flex-col w-[38%]  mobileS:w-fit mobileM:w-fit mobileL:w-fit">
                      <button className="submit-button-style mobileS:text-sm mobileS:px-4  mobileL:px-4 mobileM:px-4 mobileM:text-sm" type="submit">
                        Search by Name
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex gap-x-10 items-center mobileS:flex-col laptop:gap-x-5 laptop:justify-center mobileM:flex-col mobileL:flex-col justify-between">
                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full mobileL:w-full">
                      <input
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="Enter the tags or captions."
                        className="input-style text-left p-2"
                        {...register("userName")}
                      />
                    </div>
                    <div className="flex flex-col w-[38%]  mobileS:w-fit mobileM:w-fit mobileL:w-fit">
                      <button className="submit-button-style mobileS:text-sm mobileS:px-4 mobileL:px-4 mobileM:px-4 mobileM:text-sm " type="submit">
                        Search by Username
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex gap-x-10 items-center mobileS:flex-col laptop:gap-x-5 laptop:justify-center mobileM:flex-col mobileL:flex-col justify-between">
                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full mobileL:w-full">
                      <input
                        type="text"
                        name="collegeName"
                        id="collegeName"
                        placeholder="Enter the tags or captions."
                        className="input-style text-left p-2"
                        {...register("collegeName")}
                      />
                    </div>
                    <div className="flex flex-col w-[38%]  mobileS:w-fit mobileM:w-fit mobileL:w-fit">
                      <button className="submit-button-style mobileS:text-sm mobileS:px-4 mobileL:px-4 mobileM:text-sm mobileM:px-4 " type="submit">
                        Search by College
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
