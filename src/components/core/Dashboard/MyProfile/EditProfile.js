import EditProfilePicture from "./EditProfilePicture";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { updateProfile } from "../../../../services/operations/settingsAPI";
import { useForm } from "react-hook-form";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];
const years = [1, 2, 3, 4];

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitProfileForm = async (data) => {
    data.userName = user.userName;
    data.email = user.email;
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {}
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      navigate("/my-profile");
    }
  }, [isSubmitSuccessful]);

  return (
    <div>
      <div className="mt-16 mobileS:mt-5 mobileL:mt-5 tablet:mt-10 mobileM:mt-5 laptop:mt-10 w-full h-full flex items-center justify-center">
        <div className="w-8/12 mobileS:w-11/12 mobileL:w-11/12 tablet:w-11/12 mobileM:w-11/12 mx-auto h-full flex items-center justify-center">
          <div className="h-full w-full">
            <h1 className="text-center text-4xl mobileL:text-xl tablet:text-2xl mobileS:text-xl mobileM:text-xl underline font-semibold">
              Edit Profile
            </h1>
            <div>
              <EditProfilePicture />
            </div>

            <form
              onSubmit={handleSubmit(submitProfileForm)}
              className="w-9/12 mx-auto mobileS:w-full mobileL:w-full tablet:w-full mobileM:w-full"
            >
              <div className="flex flex-col justify-between mt-16 mobileS:mt-5 laptop:mt-10 tablet:mt-5 tablet:mb-10 mobileM:mt-5 mobileM:p-3 tablet:p-3 tablet:px-6  bg-white p-6 mobileS:p-3 rounded-lg border-[3px] border-secondary-600 z-0">
                <div className="flex flex-row w-full items-center justify-center">
                  <p className="text-4xl laptop:text-2xl underline mobileS:text-xl mobileL:text-xl tablet:text-2xl mobileM:text-xl font-semibold">
                    Public Information
                  </p>
                </div>

                <div>
                  <div className="flex gap-x-10  mt-5 mobileS:flex-col laptop:flex-col mobileL:flex-col mobileM:flex-col">
                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full laptop:w-full mobileL:w-full mobileM:text-sm mobileS:text-sm">
                      <label htmlFor="firstName" className="label-style">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter First Name"
                        className="input-style text-left p-2"
                        {...register("firstName", { required: true })}
                        defaultValue={user?.firstName}
                      />
                      {errors.firstName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter your First Name.
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full  laptop:w-full mobileL:w-full mobileM:text-sm mobileS:text-sm">
                      <label htmlFor="lastName" className="label-style">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter your Last Name"
                        className="input-style text-left p-2"
                        {...register("lastName", { required: true })}
                        defaultValue={user?.lastName}
                      />
                      {errors.lastName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter your Last Name.
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-x-10 mt-5 mobileS:mt-0 laptop:mt-0 mobileL:flex-col laptop:flex-col mobileM:mt-0  mobileL:mt-0  mobileM:flex-col  mobileS:flex-col  ">
                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full  laptop:w-full mobileL:w-full mobileM:text-sm mobileS:text-sm">
                      <label htmlFor="email" className="label-style">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        disabled
                        placeholder="Enter your Email"
                        className="input-style text-left p-2 cursor-not-allowed"
                        {...register("email")}
                        defaultValue={user?.email}
                      />
                      {errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter your Email.
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full laptop:w-full mobileL:w-full mobileM:text-sm mobileS:text-sm">
                      <label htmlFor="userName" className="label-style">
                        User-Name
                      </label>
                      <input
                        type="text"
                        name="userName"
                        id="userName"
                        disabled
                        placeholder="Enter your User-Name"
                        className="input-style text-left p-2 cursor-not-allowed"
                        {...register("userName")}
                        defaultValue={user?.userName}
                      />
                      {errors.userName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter your User-Name.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex gap-x-10 mt-5 mobileS:mt-0 laptop:mt-0 laptop:flex-col mobileL:flex-col mobileM:mt-0 mobileM:flex-col mobileL:mt-0  mobileS:flex-col ">
                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full mobileL:w-full laptop:w-full mobileM:text-sm mobileS:text-sm">
                      <label htmlFor="gender" className="label-style">
                        Gender
                      </label>
                      <select
                        type="text"
                        name="gender"
                        id="gender"
                        className="input-style text-left p-2 cursor-pointer"
                        {...register("gender")}
                        defaultValue={user?.additionalDetails?.gender}
                      >
                        {genders.map((ele, i) => {
                          return (
                            <option key={i} value={ele}>
                              {ele}
                            </option>
                          );
                        })}
                      </select>
                      {errors.gender && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please Select your Gender.
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full mobileL:w-full laptop:w-full  mobileM:text-sm mobileS:text-sm">
                      <label htmlFor="about" className="label-style">
                        Type something your about yourself.
                      </label>
                      <input
                        type="text"
                        name="about"
                        id="about"
                        placeholder="Type something your about yourself."
                        className="input-style text-left p-2"
                        {...register("about")}
                        defaultValue={user?.additionalDetails?.about}
                      />
                      {errors.about && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please type something your about yourself.
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-x-10 mt-5 mobileS:mt-0 mobileM:mt-0 laptop:mt-0 laptop:flex-col  mobileL:flex-col mobileM:flex-col mobileL:mt-0  mobileS:flex-col ">
                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full mobileL:w-full laptop:w-full  mobileM:text-sm mobileS:text-sm">
                      <label htmlFor="contactNumber" className="label-style">
                        Contact Number
                      </label>
                      <input
                        type="number"
                        name="contactNumber"
                        id="contactNumber"
                        placeholder="Enter Contact Number"
                        className="input-style text-left p-2"
                        {...register("contactNumber")}
                        defaultValue={user?.additionalDetails?.contactNumber}
                      />
                      {errors.contactNumber && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          {errors.contactNumber.message}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full mobileL:w-full laptop:w-full  mobileM:text-sm mobileS:text-sm">
                      <label htmlFor="dateOfBirth" className="label-style">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        className="input-style text-left p-2"
                        {...register("dateOfBirth")}
                        defaultValue={user?.additionalDetails?.dateOfBirth}
                      />
                      {errors.dateOfBirth && (
                        <span className="-mt-1 text-[12px] bg-richblack-700 text-yellow-100">
                          {errors.dateOfBirth.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex w-full mt-10  mobileS:mt-5 mobileM:mt-5 laptop:mt-5 mobileL:mt-5 items-center justify-center">
                  <p className="text-4xl mobileS:text-xl laptop:text-2xl tablet:text-2xl mobileL:text-xl mobileM:text-xl underline font-semibold">
                    College Information
                  </p>
                </div>

                <div>
                  <div className="flex gap-x-10 mt-5 mobileS:flex-col laptop:flex-col  mobileL:flex-col mobileM:flex-col mobileM:gap-y-4 mobile:gap-y-4">
                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full laptop:w-full mobileL:w-full  mobileM:text-sm mobileS:text-sm">
                      <label htmlFor="branchName" className="label-style">
                        Name of your Branch / Stream
                      </label>
                      <input
                        type="text"
                        name="branchName"
                        id="branchName"
                        placeholder="Enter your Branch/Stream Name."
                        className="input-style text-left p-2"
                        {...register("branchName")}
                        defaultValue={user?.additionalDetails?.branchName}
                      />
                      {errors.branchName && (
                        <span className="-mt-1 text-[12px] bg-richblack-700 text-yellow-100">
                          {errors.branchName.message}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full laptop:w-full mobileL:w-full  mobileM:text-sm  mobileS:text-sm">
                      <label htmlFor="departmentName" className="label-style">
                        Name of your Department
                      </label>
                      <input
                        type="text"
                        name="departmentName"
                        id="departmentName"
                        placeholder="Enter your Department Name."
                        className="input-style text-left p-2"
                        {...register("departmentName")}
                        defaultValue={user?.additionalDetails?.departmentName}
                      />
                      {errors.departmentName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter the name of your Department.
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-x-10 mt-5 mobileS:mt-0 mobileM:mt-0 mobileM:flex-col laptop:flex-col laptop:mt-0 mobileL:flex-col mobileL:mt-0 mobileS:flex-col">
                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full mobileL:w-full laptop:w-full mobileM:text-sm mobileS:text-sm">
                      <label htmlFor="enrollmentNumber" className="label-style">
                        Enrollment Number
                      </label>
                      <input
                        type="text"
                        name="enrollmentNumber"
                        id="enrollmentNumber"
                        placeholder="Enter your Enrollment/Roll Number"
                        className="input-style text-left p-2"
                        {...register("enrollmentNumber")}
                        defaultValue={user?.additionalDetails?.enrollmentNumber}
                      />
                      {errors.enrollmentNumber && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Plearse enter your Enrollment/Roll Number
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full mobileL:w-full laptop:w-full mobileM:text-sm mobileS:text-sm">
                      <label htmlFor="year" className="label-style">
                        Year
                      </label>
                      <select
                        type="number"
                        name="year"
                        id="year"
                        className="input-style text-left p-2 cursor-pointer"
                        {...register("year", { required: true })}
                        defaultValue={user?.additionalDetails?.year}
                      >
                        {years.map((ele, i) => {
                          return (
                            <option key={i} value={ele}>
                              {ele}
                            </option>
                          );
                        })}
                      </select>
                      {errors.year && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please select your year.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex gap-x-10 mt-5 mobileS:mt-0 mobileM:mt-0 laptop:mt-0 laptop:flex-col mobileL:flex-col mobileM:flex-col mobileL:mt-0 mobileS:flex-col">
                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full mobileL:w-full  laptop:w-full mobileM:text-sm mobileS:text-sm">
                      <label htmlFor="collegeName" className="label-style">
                        Name of your College
                      </label>
                      <input
                        type="text"
                        name="collegeName"
                        id="collegeName"
                        placeholder="Enter your College Name."
                        className="input-style text-left p-2"
                        {...register("collegeName")}
                        defaultValue={user?.additionalDetails?.collegeName}
                      />
                      {errors.collegeName && (
                        <span className="-mt-1 text-[12px] bg-richblack-700 text-yellow-100">
                          Please enter the name of your College.{" "}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col w-[48%] mobileS:w-full mobileM:w-full mobileL:w-full  laptop:w-full mobileM:text-sm mobileS:text-sm">
                      <label htmlFor="cityName" className="label-style">
                        Name of your City
                      </label>
                      <input
                        type="text"
                        name="cityName"
                        id="cityName"
                        placeholder="Enter your City Name."
                        className="input-style text-left p-2"
                        {...register("cityName")}
                        defaultValue={user?.additionalDetails?.cityName}
                      />
                      {errors.cityName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter the name of your City.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row mobileS:flex-col-reverse mobileL:flex-col-reverse laptop:flex-row laptop:my-5 mobileM:flex-col-reverse gap-x-4 ml-[53%] mobileS:ml-0 mobileL:ml-0 mobileM:ml-0 
                mobileM:max-w-[100%] mobileS:max-w-[100%] mobileL:max-w-[100%] tablet:max-w-[100%] laptop:max-w-[100%] laptop:ml-0 tablet:ml-0 max-w-[49%] my-10 tablet:my-5 mobileS:my-5 mobileL:my-5 mobileM:my-5 justify-end items-center">
                  <button
                    type="button"
                    onClick={() => navigate("/my-profile")}
                    className="cancel-button-style mobileS:my-2 mobileM:my-2 mobileL:my-2 laptop:my-2 mobileM:text-sm mobileS:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="submit-button-style  mobileS:my-2 mobileM:my-2 mobileL:my-2 laptop:my-2 mobileM:text-sm mobileS:text-sm"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
