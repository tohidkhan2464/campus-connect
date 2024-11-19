import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { deleteProfile } from "../../../../services/operations/settingsAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const DeleteModal = ({ token, user, deleteModal, setDeleteModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitDeletionForm = (data) => {
    try {
      dispatch(deleteProfile(token, data, navigate));
    } catch (error) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="absolute h-screen w-screen mt-0 -top-[5.8rem] mobileS:top-0 tablet:left-0 mobileL:left-0 mobileS:left-0 mobileM:top-0 mobileM:left-0 -left-16 z-[1000]">
      <div className="mt-16 mobileS:-mt-2 mobileM:-mt-2 w-full h-full flex items-center justify-center bg-primary-200 bg-opacity-40 backdrop-blur-md">
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-11/12 flex flex-col items-center  justify-center bg-white py-10 mobileS:p-4 mobileM:p-4
           px-8 rounded-xl border-[3px] border-secondary-600">
            <RxCross2
              onClick={() => {
                setDeleteModal(false);
                navigate('/settings');
              }}
              className="absolute top-7 right-7 text-secondary-500 text-2xl cursor-pointer hover:text-secondary-900"
            />
            <div className="bg-primary-100 p-2 rounded-full mb-6 mobileS:mb-2">
              <CiTrash className="h-14 w-14 mobileS:w-8 mobileS:h-8 mobileM:h-9 mobileM:w-9 text-black" />
            </div>
            <h1 className="text-2xl mobileS:text-lg mobileM:text-lg text-center text-black font-semibold">
              Delete your Campus Connect Account ?
            </h1>
            <p className="mt-2 mobileS:text-sm mobileM:text-sm text-center text-secondary-500">
              You are requesting to delete your Campus Connect account.
            </p>
            <p className="text-secondary-500 text-center mobileS:text-sm mobileM:text-sm">
              You can stop deletion by clicking on cancel button.
            </p>

            <form
              onSubmit={handleSubmit(submitDeletionForm)}
              className="w-full"
            >
              {/* password */}
              <div className="flex flex-col items-center text-center my-4 mobileS:my-2 mobileM:my-2 mobileM:text-sm group w-full mobileS:text-sm">
                <label htmlFor="currentPassword" className="label-style">
                  Confirm Password for deleting the account.
                  <sup className=" text-red">*</sup>
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Enter your Current Password"
                  {...register("currentPassword", { required: true })}
                  className="input-style w-8/12 mobileS:w-full mobileL:w-full mobileM:w-full mt-1"
                />
                {errors.currentPassword && (
                  <span className=" text-red underline animate-bounce">
                    Current Password is required
                  </span>
                )}
              </div>

              <div className="flex flex-row mobileS:flex-col mobileM:flex-col gap-x-4 w-full mx-auto">
                <button
                  type="button"
                  onClick={() => {
                    setDeleteModal(false);
                    navigate("/settings");
                  }}
                  className="cancel-button-style mobileS:my-2 mobileM:my-2 mobileM:text-sm mobileS:text-sm"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="submit-button-style mobileS:my-2 mobileM:my-2 mobileM:text-sm mobileS:text-sm"
                >
                  DELETE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
