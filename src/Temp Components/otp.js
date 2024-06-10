import React, { useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Otp({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [otpForm, setOtpForm] = useState({
    otp:""
  });

  function changeHandler(event) {
    setOtpForm((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const getOTP = async () => {
    const response = await axios.get(
      "http://localhost:4000/api/v1/user/getotp",
      {  }
    );
    return response;
  };
//   const sentOTP = async () => {
//     const response = await axios.post(
//       "http://localhost:4000/api/v1/user/sendotp",
//       { email: formData.email }
//     );
//     return response;
//   };

  function resendOTP(event){
    event.preventDefault();

  }

  function submitHandler(event) {
    event.preventDefault();
    
    console.log("form otp", otpForm.otp)
    const DBotp = getOTP();
    console.log("dbotp", DBotp)
    if (otpForm.otp !== DBotp){
        toast.error("OTP donot match.");
      return;
    }
    
    setIsLoggedIn(true);
    toast.success("OTP Macthed");
    

    
    navigate("/dashboard");
  }

  return (
    <div className=" h-screen w-screen relative">
      <div className="w-10/12 h-full  max-w-[1080px] flex flex-col mx-auto justify-center items-center relative -mt-20">
        <h2 className="font-mullish text-center text-2xl leading-[1.2] text-white font-extrabold">
          Verify Email
        </h2>
        <div class="w-16 h-1 bg-greenLight mx-auto mt-4 mb-14 "></div>
        <div className="w-full mx-auto text-center">
          <p className="text-white ">
            A verification code has been sent to your email. Enter the code
            below.
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="w-10/12 flex flex-row justify-center items-center realtive gap-1 my-5 py-5 mx-auto">
            <input
            value={otpForm.otp} onChange={changeHandler}
              className=" bg-richblack-700 text-2xl text-white tracking-wider py-[12px] px-[12px] leading-[24px] text-center h-[50px] w-[200px] rounded-[8px] 
          border border-richblack-700 focus:bg-slate-300 focus:text-black"
              name="otp" 
            />
          </div>
          <div className="w-10/12 flex flex-row justify-center items-center realtive gap-x-10 my-5 py-5 mx-auto">
            <button
              type="submit"
              className=" bg-[#ecd042] text-black py-[12px] px-[24px] leading-[24px] text-center h-[50px] w-[200px] rounded-[8px] border border-richblack-700
             hover:shadow-lg hover:shadow-slate-500 hover:-translate-y-1 transition-all duration- hover:text-white hover:bg-black"
            >
              Submit
            </button>
            <button
            onClick={resendOTP}
              className=" bg-richblack-700 text-richblack-25 py-[12px] px-[24px] leading-[24px] text-center h-[50px] w-[200px] rounded-[8px] border border-richblack-700
             hover:shadow-lg hover:shadow-slate-500 hover:-translate-y-1 transition-all duration-300 hover:bg-black"
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Otp;
