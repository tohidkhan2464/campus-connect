import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupData } = useSelector((state) => state.auth);

  const {
    firstName,
    lastName,
    email,
    userName,
    password,
    confirmPassword,
    accountType,
  } = signupData;
  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);
  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(
      signUp(
        firstName,
        lastName,
        email,
        password,
        userName,
        confirmPassword,
        accountType,
        otp,
        navigate
      )
    );
  };
  return (
    <div className="bg-gradient-to-br from-blue to-red w-screen min-h-screen flex items-center justify-center">
      <div>
        <div className=" bg-white flex flex-col items-center justify-center mt-16 p-10 rounded-lg desktop:w-[500px]">
          <div className="text-4xl mt-4 mb-1 font-semibold w-full text-center text-red border-b-[2px]">
            VERFIY YOUR EMAIL
          </div>

          <form onSubmit={submitHandler} className="w-full">
            <div className="flex flex-col items-center justify-center w-full">
              <p className="font-semibold text-center text-sm w-fit mb-2 transition-colors duration-200 ease-linear">
                A verification code has been sent to you, Enter the code below
              </p>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>&nbsp;&nbsp;</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-[48px] desktop:w-[60px] border-0 bg-primary-800 rounded-[0.5rem] text-white 
                  text-2xl font-bold  aspect-square text-center focus:border-0 my-3 focus:outline-4 focus:outline-black"
                  />
                )}
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue font-semibold to-red text-secondary-100 w-full my-4 py-2 transition-all duration-200 ease-linear 
           hover:text-secondary-900 rounded-lg text-lg"
            >
              SUBMIT
            </button>
          </form>
          <div className="flex flex-row items-center justify-between w-full mt-2">
            <div>
              <Link to="/login">
                <p className=" text-[16px] mt-1 w-full text-secondary-600 max-w-max flex flex-row items-center gap-1 hover:text-black hover:underline transition-all duration-200">
                  Back to Login
                </p>
              </Link>
            </div>
            <button
              type="button"
              className=" text-primary-900 text-[16px] flex flex-row gap-1 items-center hover:text-primary-500 hover:underline"
            >
              Resent it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
