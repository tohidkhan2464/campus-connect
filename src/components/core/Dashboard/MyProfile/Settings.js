import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPassword } from "../../../../services/operations/settingsAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import DeleteModal from "./deleteModal";
import { RxCross2 } from "react-icons/rx";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [deleteModal, setDeleteModal] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitProfileForm = (data) => {
    try {
      dispatch(updateCurrentPassword(token, navigate, data));
    } catch (error) {
      toast.error("Something went wrong. Try again.");
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        currentPassword: "",
        newPassword: "",
      });
    }
  }, []);

  return (
    <div>
      <div className="mt-16 w-full h-full flex items-center justify-center">
        <div className="w-8/12 mx-auto h-full flex items-center justify-center">
          {/* Heading */}
          <div className="h-full w-11/12 flex flex-col items-center justify-center gap-y-5">
            <p className="text-center text-2xl font-semibold">
              Profile Settings
            </p>
            <div className="flex flex-col justify-center items-center w-10/12 gap-y-10">
              {/* Change Password */}
              <div className="relative bg-white w-full p-8 rounded-xl border-[3px] border-secondary-500">
                <RxCross2
                  onClick={() => navigate("/my-profile")}
                  className="absolute right-7 text-secondary-500 text-2xl cursor-pointer hover:text-secondary-900"
                />
                <p className="text-center text-2xl font-semibold underline text-secondary-500 mb-5">
                  CHANGE PASSWORD
                </p>
                <form
                  onSubmit={handleSubmit(submitProfileForm)}
                  className="w-full"
                >
                  <div className="flex flex-row gap-x-4">
                    {/* Email */}
                    <div className="flex flex-col items-center my-2 group w-full">
                      <label htmlFor="currentPassword" className="label-style">
                        CURRENT PASSWORD<sup className=" text-red">*</sup>
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        placeholder="Enter your Current Password"
                        {...register("currentPassword", { required: true })}
                        className="input-style"
                      />
                      {errors.currentPassword && (
                        <span className=" text-red underline animate-bounce">
                          Current Password is required
                        </span>
                      )}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col items-center my-2 mx-auto group w-full">
                      <label htmlFor="newPassword" className="label-style">
                        NEW PASSWORD <sup className=" text-red">*</sup>
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="Enter your New Password"
                        {...register("newPassword", { required: true })}
                        className="input-style"
                      />
                      {errors.newPassword && (
                        <span className=" text-red underline animate-bounce">
                          New Password is required
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row gap-x-4 max-w-[70%] w-full mx-auto">
                    <button
                      type="button"
                      onClick={() => navigate("/my-profile")}
                      className="cancel-button-style"
                    >
                      CANCEL
                    </button>
                    <button type="submit" className="submit-button-style">
                      CHANGE PASSWORD
                    </button>
                  </div>
                </form>
              </div>

              {/* Delete Account */}
              <div
                onClick={() => setDeleteModal(true)}
                className="flex flex-col justify-between group cursor-pointer hover:border-secondary-900  transition-all duration-200
               bg-slate-300 bg-opacity-30 p-6 rounded-xl border-[3px] border-secondary-500 hover:bg-white hover:underline"
              >
                <div className="flex flex-row gap-x-6 w-full items-start ">
                  <div className="rounded-full p-2 bg-primary-100 group-hover:animate-bounce transition-all duration-200">
                    <CiTrash className="h-10 w-10 text-secondary-600 group-hover:text-secondary-900 transition-all duration-200" />
                  </div>
                  <div className="flex flex-col items-start space-y-2 mobile:mt-5 mobile:items-center mobile:text-center ">
                    <p className="text-xl font-semibold text-red-100">
                      Delete Account
                    </p>
                    <p>Would you like to delete account?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {deleteModal && (
        <DeleteModal
          user={user}
          token={token}
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
        />
      )}
    </div>
  );
};

export default Settings;
