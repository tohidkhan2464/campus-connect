import React from "react";
// import { Link } from "react-router-dom";
import featureIcon from "../assets/layers.svg";
import featureIcon1 from "../assets/lock.svg";
import featureIcon2 from "../assets/settings.svg";

function FeatureSection() {
  return (
    <div>
      <div className="flex flex-col gap-y-2 mt-20 items-center">
        <h1 className="font-semibold text-[36px] mt-6">
          What Makes <span className=" text-[#4ead75] ">Campus Connect</span>{" "}
          Different?
        </h1>
        <div className="w-32 h-1 bg-purple-800 mx-auto mt-4 mb-6 md:mb-20"></div>

        <div class="w-full grid grid-cols-3 realtive gap-4 my-2">
          {/* <!-- box - 1 --> */}
          <div
            class="w-full max-w-[20rem] min-h-[30rem] flex flex-col items-center justify-center cursor-pointer rounded-[100px]
           hover:shadow-lg hover:shadow-slate-500 hover:-translate-y-10 transition-all duration-300
          shadow shadow-white"
          >
            {/* <!-- box icon --> */}
            <img
              src={featureIcon}
              alt="gfsadsfg"
              class="bg-lightBlue  w-24 h-24 p-2 rounded-full  transition-all duration-200"
            />

            {/* <!-- box content --> */}
            <div class="p-6">
              <div>
                <h3 class="font-mullish text-center mx-auto font-extrabold text-white leading-[1.2] text-[1.375rem]">
                  Features
                </h3>
                <p class="font-mullish text-gray-400 text-center mx-auto mt-6">
                View and edit Personal profile Details, View uploaded files, View and Edit Professional profile
                </p>
              </div>
            </div>
          </div>

          {/* <!-- box - 2 --> */}
          <div
            class="w-full max-w-[20rem] min-h-[30rem] flex flex-col items-center justify-center cursor-pointer rounded-[100px] 
          hover:shadow-lg hover:shadow-slate-500 hover:-translate-y-10 transition-all duration-300 shadow shadow-white"
          >
            {/* <!-- box icon --> */}
            <img
              src={featureIcon1}
              alt="gfsadsfg"
              class="bg-lightBlue  w-24 h-24 p-2 rounded-full  transition-all duration-200"
            />

            {/* <!-- box content --> */}
            <div class="p-6">
              <div>
                <h3 class="font-mullish text-center mx-auto font-extrabold text-white leading-[1.2] text-[1.375rem]">
                  Broadcast Data
                </h3>
                <p class="font-mullish text-gray-400 text-center mx-auto mt-6">
                Broadcasting any important message to students of any specific year/college/branch or everyone
                </p>
              </div>
            </div>
          </div>

          {/* <!-- box - 3 --> */}
          <div
            class="w-full max-w-[20rem] min-h-[30rem] flex flex-col items-center justify-center cursor-pointer rounded-[100px] 
          hover:shadow-lg hover:shadow-slate-500 hover:-translate-y-10 transition-all duration-300 shadow shadow-white"
          >
            {/* <!-- box icon --> */}
            <img
              src={featureIcon2}
              alt="gfsadsfg"
              class="bg-lightBlue  w-24 h-24 p-2 rounded-full  transition-all duration-200"
            />

            {/* <!-- box content --> */}
            <div class="p-6">
              <div>
                <h3 class="font-mullish text-center mx-auto font-extrabold text-white leading-[1.2] text-[1.375rem]">
                  Campus-Centric
                </h3>
                <p class="font-mullish text-gray-400 text-center mx-auto mt-6">
                  Specific features catering to campus life, including event
                  College News, club discussions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Login - SigUp - LogOut - Dashboard */}

      <div className="flex items-center gap-x-8 "></div>
    </div>
  );
}

export default FeatureSection;
