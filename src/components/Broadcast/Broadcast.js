import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendBroadcast } from "../../services/operations/profileAPI";
const BroadcastBy = ["College", "Branch", "Department", "Year"];
const years = [1, 2, 3, 4];

const Broadcast = () => {
  const { register, handleSubmit } = useForm();
  const { token, accessToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [broadcastBy, setBroadcastBy] = useState("College");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (broadcastBy === "College") {
        formData.append("broadcastTo", data.broadcastToCollege);
      } else if (broadcastBy === "Year") {
        formData.append("broadcastTo", data.broadcastToYear);
      } else {
        formData.append("broadcastTo", data.broadcastTo);
      }
      if (data.broadcastImage !== null) {
        formData.append("broadcastImage", data.broadcastImage);
      }
      formData.append("messageTitle", data.messageTitle);
      formData.append("message", data.message);
      formData.append("sender", data.sender);
      formData.append("broadcastBy", data.broadcastBy);

      const response = await sendBroadcast(formData, token, accessToken);
      setLoading(false);
      if (response.success) {
        navigate("/my-profile");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 mobileS:mt-5 mobileL:mt-5 tablet:mt-5 mobileM:mt-5 w-full h-full flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-md border-secondary-700 mobileS:max-w-[300px] mobileL:max-w-[400px] mobileL:p-3 mobileL:space-y-1 mobileM:max-w-[350px] mobileM:text-sm 
          mobileM:p-3 mobileM:space-y-1 mobileS:text-sm mobileS:p-3 flex flex-col items-center 
          max-w-[800px] justify-center border-[1px]  bg-secondary-100 my-10 p-8 mobileS:space-y-1 space-y-4"
        >
          <div className="w-full">
            <div className="w-full">
              <label
                className="font-semibold w-fit group-focus-within:text-red group-focus-within:border-b-[2px] transition-colors duration-200 ease-linear"
                htmlFor="messageTitle"
              >
                Message Title <sup className="text-red">*</sup>
              </label>
              <input
                id="messageTitle"
                placeholder="Enter Message Title"
                {...register("messageTitle", { required: true })}
                className="outline-none mt-2 mobileS:mt-0 mobileM:mt-0 border-[2px] border-slate-300 py-1 px-2 rounded-md  w-[100%] outline-b"
              />
            </div>
            <div className="w-full mobileS:mt-2 mobileM:mt-2">
              <label
                className="font-semibold w-fit group-focus-within:text-red group-focus-within:border-b-[2px] transition-colors duration-200 ease-linear"
                htmlFor="message"
              >
                Message <sup className="text-red">*</sup>
              </label>
              <textarea
                id="message"
                placeholder="Enter Message"
                {...register("message", { required: true })}
                className="outline-none mt-2 mobileS:mt-0 mobileM:mt-0 border-[2px]  min-h-[120px] border-slate-300 py-1 px-2 rounded-md  w-[100%] outline-b"
              />
            </div>
          </div>

          <div className="flex gap-x-10 w-full mobileS:flex-col mobileS:gap-2 mobileM:gap-2 mobileM:flex-col justify-between">
            <div className="w-full">
              <label
                className="font-semibold w-fit group-focus-within:text-red group-focus-within:border-b-[2px] transition-colors duration-200 ease-linear"
                htmlFor="broadcastBy"
              >
                Broadcast By <sup className="text-red">*</sup>
              </label>
              <select
                type="text"
                name="broadcastBy"
                id="broadcastBy"
                className="outline-none mt-2 mobileS:mt-0 mobileM:mt-0 border-[2px] border-slate-300 py-1 px-2 rounded-md  w-[100%] outline-b text-left p-2 cursor-pointer"
                {...register("broadcastBy")}
                defaultValue={"College"}
                onChange={(e) => setBroadcastBy(e.target.value)}
              >
                {BroadcastBy.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-full">
              <label
                className="font-semibold w-fit group-focus-within:text-red group-focus-within:border-b-[2px] transition-colors duration-200 ease-linear"
                htmlFor="broadcastTo"
              >
                Broadcast To <sup className="text-red">*</sup>
              </label>
              {broadcastBy === "Year" ? (
                <select
                  type="broadcastToYear"
                  name="broadcastToYear"
                  id="broadcastToYear"
                  className="outline-none mt-2 mobileS:mt-0 mobileM:mt-0 border-[2px] border-slate-300 py-1 px-2 rounded-md  w-[100%] outline-b text-left p-2 cursor-pointer"
                  {...register("broadcastToYear", { required: true })}
                  defaultValue={1}
                >
                  {years.map((ele, i) => {
                    return (
                      <option key={i} value={ele}>
                        {ele}
                      </option>
                    );
                  })}
                </select>
              ) : broadcastBy === "College" ? (
                <select
                  type="broadcastToCollege"
                  name="broadcastToCollege"
                  id="broadcastToCollege"
                  className="outline-none mt-2 mobileS:mt-0 mobileM:mt-0 border-[2px] border-slate-300 py-1 px-2 rounded-md  w-[100%] outline-b text-left p-2 cursor-pointer"
                  {...register("broadcastToCollege", { required: true })}
                  defaultValue={1}
                >
                  <option value="students">Students</option>
                  <option value="lecturer">Lecturer</option>
                </select>
              ) : (
                <input
                  id="broadcastTo"
                  placeholder={`Enter ${broadcastBy} Name`}
                  {...register("broadcastTo", { required: true })}
                  className="outline-none mt-2 mobileS:mt-0 mobileM:mt-0 border-[2px] border-slate-300 py-1 px-2 rounded-md  w-[100%] outline-b"
                />
              )}
            </div>
          </div>

          <div className="flex flex-row w-full gap-x-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r mobileS:text-sm mobileS:my-1 mobileM:text-sm mobileM:my-1  w-full from-blue font-semibold to-red text-secondary-100 my-4 py-2 transition-all duration-200 ease-linear 
          hover:text-secondary-900 rounded-lg text-lg"
            >
              {loading ? "Loading..." : "SEND"}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => navigate("/home")}
              className="bg-gradient-to-r  mobileS:text-sm mobileS:my-1 mobileM:text-sm mobileM:my-1 to-blue font-semibold from-red text-secondary-100 w-full my-4 py-2 transition-all duration-200 ease-linear 
          hover:text-secondary-900 rounded-lg text-lg"
            >
              {loading ? "Loading..." : "CANCEL"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Broadcast;
