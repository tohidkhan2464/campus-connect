import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../redux/slices/authSlice";
import { sendOtp } from "../services/operations/authAPI";
import toast from "react-hot-toast";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState("Student");

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  const { password, confirmPassword, email } = formData;

  function submitHandler(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      setFormData((prevData) => ({
        ...prevData,
        password: "",
        confirmPassword: "",
      }));
      return;
    }

    const data = {
      ...formData,
      accountType,
    };
    dispatch(setSignupData(data));

    dispatch(sendOtp(email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType("Student");
  }
  return (
    <div className="bg-gradient-to-br from-blue to-red w-screen min-h-screen flex items-center justify-center">
      <div>
        <div className=" bg-white flex items-center justify-center mt-14 p-8 mobileS:mt-10 mobileL:mt-14 mobileL:py-2 mobileL:p-4 mobileM:mt-10 mobileM:py-2 mobileM:p-4 mobileL:max-w-[400px] mobileM:max-w-[350px] mobileS:p-4 mobileS:py-2 rounded-lg w-[600px] mobileS:w-[300px]">
          <div className="flex flex-col items-center w-full">
            <div className="text-4xl my-1 mobileL:text-2xl font-semibold mobileS:text-xl mobileM:text-xl w-full text-center">
              SIGN UP
            </div>
            <form onSubmit={submitHandler} className="w-full">
              <div className="flex flex-col items-center my-1 mobileS:m-0 mobileM:m-0 mobileM:text-sm mobileS:text-sm mobileL:text-sm group w-full">
                <label className="label-style">
                  ACCOUNT TYPE<sup className=" text-red">*</sup>
                </label>
                <div className="flex flex-row  px-2 py-1 bg-secondary-300 rounded-full">
                  <div
                    className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                      accountType === "Student"
                        ? " text-secondary-100 bg-secondary-900"
                        : ""
                    }`}
                    onClick={() => setAccountType("Student")}
                  >
                    <p>Student</p>
                  </div>
                  <div
                    className={` px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                      accountType === "Lecturer"
                        ? " text-secondary-100 bg-secondary-900"
                        : ""
                    }`}
                    onClick={() => setAccountType("Lecturer")}
                  >
                    <p>Lecturer</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row mobileS:flex-col mobileM:flex-col mobileL:flex-col mobileM:gap-0 mobileL:gap-0 mobileM:text-sm 
              gap-4 mobileS:gap-0  mobileS:text-sm  mobileL:text-sm ">
                {/* First Name */}
                <div className="flex flex-col items-center my-2 mobileS:my-1 mobileM:my-1 mobileL:my-1 group w-full">
                  <label htmlFor="firstName" className="label-style">
                    FIRST NAME<sup className=" text-red">*</sup>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={changeHandler}
                    placeholder="Enter your First Name"
                    id="firstName"
                    className="input-style "
                  />
                </div>

                {/* Last Name */}
                <div className="flex flex-col items-center my-2 mobileS:my-1 mobileM:my-1 mobileL:my-1 group w-full">
                  <label htmlFor="lastName" className="label-style">
                    LAST NAME<sup className=" text-red">*</sup>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={changeHandler}
                    placeholder="Enter your Last Name"
                    id="lastName"
                    className="input-style "
                  />
                </div>
              </div>

              <div className="flex flex-row mobileS:flex-col mobileL:text-sm  gap-4 mobileM:flex-col mobileM:gap-0  mobileL:gap-0 mobileL:flex-col  mobileM:text-sm mobileS:gap-0  mobileS:text-sm">
                {/* User-Name */}
                <div className="flex flex-col items-center my-2 mobileS:my-1 mobileM:my-1 mobileL:my-1 group w-full">
                  <label htmlFor="userName" className="label-style">
                    USER-NAME<sup className=" text-red">*</sup>
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={changeHandler}
                    placeholder="Enter your User-Name"
                    id="userName"
                    className="input-style "
                  />
                </div>

                {/* Email  */}
                <div className="flex flex-col items-center my-2 mobileS:my-1 mobileM:my-1 mobileL:my-1 group w-full">
                  <label htmlFor="email" className="label-style">
                    EMAIL<sup className=" text-red">*</sup>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder="Enter your Email"
                    id="email"
                    className="input-style "
                  />
                </div>
              </div>

              <div className="flex flex-row mobileS:flex-col gap-4 mobileL:text-sm  mobileM:flex-col mobileM:gap-0 mobileL:gap-0 mobileL:flex-col  mobileM:text-sm mobileS:gap-0 mobileS:text-sm">
                {/* password  */}
                <div className="flex flex-col items-center my-2 mobileS:my-1 mobileM:my-1 mobileL:my-1 group w-full">
                  <label htmlFor="password" className="label-style">
                    PASSWORD<sup className=" text-red">*</sup>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder="Enter your Password"
                    id="password"
                    className="input-style "
                  />
                </div>

                {/* Confirm password  */}
                <div className="flex flex-col items-center my-2 mobileS:my-1 mobileM:my-1 mobileL:my-1 group w-full">
                  <label htmlFor="confirmPassword" className="label-style">
                    CONFIRM PASSWORD<sup className=" text-red">*</sup>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={changeHandler}
                    placeholder="Confirm your Password"
                    id="confirmPassword"
                    className="input-style "
                  />
                </div>
              </div>

              <button type="submit" className="submit-button-style mobileL:text-sm  mobileS:my-2 mobileL:my-2 mobileM:my-2 mobileM:text-sm  mobileS:text-sm">
                SUBMIT
              </button>
            </form>
            <div className="mobileS:text-sm mobileM:text-sm mobileL:text-sm ">
              <p>
                Already have a Account?{" "}
                <span
                  className=" text-red font-semibold underline cursor-pointer hover:text-blue"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign In
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
