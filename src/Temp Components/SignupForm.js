import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    branch: "",
    year: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("student");

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  // const createEmployee = async (data) => {
  //   const savedUserResponse = await fetch(
  //     `http://localhost:4000/api/v1/user/signup`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ ...data }),
  //     }
  //   );
  //   setFormData(savedUserResponse);
  //   console.log("FORM RESPONSE......", savedUserResponse);
  //   console.log("FORM form Data......", formData);
  // };

  function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password do not match.");
      return;
    }
    // createEmployee(formData);
    setIsLoggedIn(true);
    toast.success("Account Created.");
    const accountData = {
      ...formData,
    };

    const finalData = {
      ...accountData,
      accountType,
    };
    console.log("Printing final account Data.");
    console.log(finalData);
    navigate("/dashboard");
  }

  return (
    <div>
      {/* Student - lecturer Tab */}
      <div className="text-[0.875rem] text-richblack-5 leading-[1.375rem]">
        Choose Account Type
      </div>
      <div className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max">
        <button
          className={`${
            accountType === "student"
              ? " bg-richblack-900 text-richblack-5"
              : " bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => {
            setAccountType("student");
          }}
        >
          Student
        </button>

        <button
          className={`${
            accountType === "lecturer"
              ? " bg-richblack-900 text-richblack-5"
              : " bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => {
            setAccountType("lecturer");
          }}
        >
          Lecturer
        </button>
      </div>

      <form onSubmit={submitHandler}>
        {/* First Name - Last Name  */}
        <div className="flex gap-x-4 mt-4">
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              First Name
              <sup className=" text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstname"
              onChange={changeHandler}
              placeholder="Enter First Name"
              value={formData.firstName}
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
            />
          </label>

          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Last Name
              <sup className=" text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastname"
              onChange={changeHandler}
              placeholder="Enter Last Name"
              value={formData.lastName}
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
            />
          </label>
        </div>

        {/* userName */}
        <div className="mt-4">
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              User Name
              <sup className=" text-pink-200">*</sup>
            </p>

            <input
              required
              type="text"
              name="userName"
              onChange={changeHandler}
              placeholder="Enter User Name"
              value={formData.userName}
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] "
            />
          </label>
        </div>

        {/* branch */}
        <div className="flex gap-x-4 mt-4">
          <div className="mt-4">
            <label className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                Branch Name
                <sup className=" text-pink-200">*</sup>
              </p>

              <input
                required
                type="text"
                name="branch"
                onChange={changeHandler}
                placeholder="Enter Branch Name"
                value={formData.branch}
                className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] "
              />
            </label>
          </div>

          {/* year */}
          <div className="mt-4">
            <label className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                College Year
                <sup className=" text-pink-200">*</sup>
              </p>

              <input
                required
                type="text"
                name="year"
                onChange={changeHandler}
                placeholder="Enter your year"
                value={formData.year}
                className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] "
              />
            </label>
          </div>
        </div>

        {/* Email Address */}
        <div className="mt-4">
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Email Address
              <sup className=" text-pink-200">*</sup>
            </p>

            <input
              required
              type="email"
              name="email"
              onChange={changeHandler}
              placeholder="Enter Email Address"
              value={formData.email}
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] "
            />
          </label>
        </div>

        {/* Create Password - COnfirm Password */}
        <div className="flex gap-x-4 mt-4">
          <label className=" relative w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Create Password
              <sup className=" text-pink-200">*</sup>
            </p>

            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={changeHandler}
              placeholder="Enter Password"
              value={formData.password}
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] "
            />

            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className=" absolute right-3 top-[38px] cursor-pointer "
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#afb2bf" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#afb2bf" />
              )}
            </span>
          </label>

          <label className=" relative w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Confirm Password
              <sup className=" text-pink-200">*</sup>
            </p>

            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={changeHandler}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
            />

            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className=" absolute right-3 top-[38px] cursor-pointer "
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#afb2bf" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#afb2bf" />
              )}
            </span>
          </label>
        </div>
        <button className="bg-yellow-50 w-full rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
