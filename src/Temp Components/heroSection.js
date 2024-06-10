import React from "react";
import welcomeImage from "../assets/welcome-bg.jpg";
import welcomeImageWhite from "../assets/welcome-bg-white.png";

function HeroSection() {

  return (
    <div>
      <div className="flex flex-col gap-y-2  items-center">
        <h1 className="font-semibold text-[36px]">
          Campus <span className=" text-[#A6FFCB] ">Connect</span>
        </h1>
        <p className="text-[16px] font-medium w-[80%] text-wrap m-10 text-center">
          College Connect is a web application aimed to be a one-stop-shop for
          all the college needs. It aims to bring the student community closer
          and creates a helpful platform for all college students. The app
          boasts a modern user interface for an enjoyable experience
        </p>
        {/* Login - SigUp - LogOut - Dashboard */}

        <div className="flex items-center justify-center relative mt-20 ">
          <img
            src={welcomeImage}
            alt="welcome"
            className=" z-10 h-[500px] w-[900px] rounded-lg"
          ></img>
          <img
            src={welcomeImageWhite}
            alt="welcome"
            className=" absolute top-4 left-6 h-[500px] w-[900px] rounded-lg"
          ></img>
          <div className=" absolute h-[400px] w-[400px] -z-2 rounded-full bg-fuchsia-400 blur-3xl -top-12"></div>
          <div className=" absolute h-[400px] w-[400px] -z-3 rounded-full bg-fuchsia-400 blur-3xl -bottom-5"></div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
