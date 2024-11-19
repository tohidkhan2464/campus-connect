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
      <div className="mt-16 mobileS:mt-5 mobileL:mt-5 tablet:mt-5 mobileM:mt-5 w-full h-full flex items-center justify-center">
        <div className="w-8/12 mobileS:w-full mobileM:w-full tablet:w-full mobileL:w-full mx-auto h-full flex items-center justify-center">
          {/* Heading */}
          <div className="h-full w-11/12 flex flex-col items-center justify-center gap-y-5">
            <p className="text-center text-2xl mobileS:text-xl mobileL:text-2xl mobileM:text-xl font-semibold">
              Profile Settings
            </p>
            <div className="flex flex-col justify-center items-center w-10/12 mobileL:w-full mobileL:gap-y-5 mobileS:w-full mobileM:w-full mobileM:gap-y-5 gap-y-10 mobileS:gap-y-5">
              {/* Change Password */}
              <div className="relative bg-white w-full p-8 mobileS:p-4 mobileM:p-4 mobileL:p-5 rounded-xl border-[3px] border-secondary-500">
                <RxCross2
                  onClick={() => navigate("/my-profile")}
                  className="absolute right-7 mobileS:right-3 mobileM:right-3 text-secondary-500 text-2xl cursor-pointer hover:text-secondary-900"
                />
                <p className="text-center text-2xl mobileL:text-lg mobileS:text-lg mobileM:text-lg font-semibold underline text-secondary-500 mb-5 mobileM:mb-1 mobileS:mb-1">
                  CHANGE PASSWORD
                </p>
                <form
                  onSubmit={handleSubmit(submitProfileForm)}
                  className="w-full"
                >
                  <div className="flex flex-row mobileS:flex-col mobileL:flex-col mobileM:flex-col mobileM:text-sm gap-x-4 mobileS:text-sm">
                    {/* Email */}
                    <div className="flex flex-col items-center my-2 mobileS:my-1 mobileM:my-1 group w-full">
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
                    <div className="flex flex-col items-center my-2 mobileS:my-1 mobileM:my-1 mx-auto group w-full ">
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

                  <div className="flex flex-row mobileS:flex-col-reverse mobileL:flex-col-reverse gap-x-4 tablet:max-w-full max-w-[70%] mobileM:w-full mobileM:flex-col-reverse mobileS:w-full w-full mx-auto ">
                    <button
                      type="button"
                      onClick={() => navigate("/my-profile")}
                      className="cancel-button-style mobileS:text-sm mobileM:text-sm mobileM:my-2 mobileL:my-2 mobileS:my-2"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      className="submit-button-style mobileS:text-sm mobileS:my-2 mobileM:text-sm  mobileL:my-2 mobileM:my-2"
                    >
                      CHANGE PASSWORD
                    </button>
                  </div>
                </form>
              </div>

              {/* Delete Account */}
              <div
                onClick={() => setDeleteModal(true)}
                className="flex flex-col justify-between group cursor-pointer hover:border-secondary-900  transition-all duration-200
               bg-slate-300 bg-opacity-30 p-6 mobileS:p-2 mobileM:p-2 rounded-xl border-[3px] border-secondary-500 hover:bg-white hover:underline"
              >
                <div className="flex flex-row mobileS:flex-col-reverse mobileS:items-center mobileS:justify-center mobileM:flex-col-reverse 
                mobileM:items-center mobileM:justify-center gap-x-6 w-full items-start ">
                  <div className="rounded-full p-2 bg-primary-100 mobileS:my-2 mobileM:my-2 group-hover:animate-bounce transition-all duration-200">
                    <CiTrash className="h-10 w-10 text-secondary-600 group-hover:text-secondary-900 transition-all duration-200" />
                  </div>
                  <div className="flex flex-col items-start space-y-2 mobileS:my-2 mobileS:mx-2 mobileS:items-center mobileS:text-center 
                  mobileM:my-2 mobileM:mx-2 mobileM:items-center mobileM:text-center ">
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
