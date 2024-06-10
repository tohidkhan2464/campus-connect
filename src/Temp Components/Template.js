import React from "react";
import frameImage from "../assets/frame.png";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const Template = ({ title, image, formType, setIsLoggedIn }) => {
  return (
    <div className="h-screen w-screen bg-richblack-900">
      <div className=" flex w-11/12 max-w-[1160px] py-6 mx-auto gap-x-12 justify-between gap-y-0 ">
        <div className=" w-11/12 max-w-[450px]">
          <h1 className="text-richblack-5 font-semibold text-[1.75rem] leading-[2.75rem]">
            {title}
          </h1>

          {formType === "signup" ? (
            <SignupForm setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
          )}
        </div>
        <div className="relative w-11/12 max-w-[450px]">
          <img
            src={frameImage}
            alt="Frame"
            width={558}
            height={504}
            loading="lazy"
            className=" rounded-lg"
          />
          <img
            src={image}
            alt="students"
            width={558}
            height={504}
            loading="lazy"
            className="absolute -top-4 right-4 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Template;
