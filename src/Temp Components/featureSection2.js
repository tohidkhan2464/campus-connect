import React from "react";
import { HiChevronDoubleRight } from "react-icons/hi";
import downloadImage from "../assets/download-bg.jpg";

function FeatureSection2() {
  return (
    <div>
      <div class="w-10/12 md:w-11/12 max-w-[1080px] mx-auto relative pt-4">
        <h2 class=" font-mullish text-center text-2xl leading-[1.2] text-white font-extrabold">
          Why to use <span class="text-greenLight"> Campus Connect</span> ?
        </h2>
        <div class="w-16 h-1 bg-greenLight md:mx-auto mt-4 mb-6 md:mb-20"></div>
        {/* <!-- Main Feature Box --> */}
        <div class="w-full min-h-[440px] flex md:border border-grayText border-opacity-50 rounded-md relative">
          <div class="w-full p-4 md:p-10 py-12 bg-[#181c2e] z-20">

            <div class="flex flex-col justify-between items-start w-full h-full z-20">
              <h3 class=" font-mullish text-xl md:leading-10 md:text-[28px] font-bold md:max-w-[500px] max-w-[190px] text-white">
                Easily Maintain Your Data and Settings using
                <span class="text-greenLight"> Campus Connect</span>
              </h3>
              {/* <!-- Features list --> */}
              <ul class="space-y-2 my-6 md:my-0">
                <li class="font-mullish flex text-white items-center space-x-2">
                  <i class="text-greenLight">
                    <HiChevronDoubleRight />
                  </i>
                  <span>View and edit Personal profile Details</span>
                </li>
                <li class="font-mullish flex text-white items-center space-x-2">
                  <i class="text-greenLight">
                    <HiChevronDoubleRight />
                  </i>
                  <span>Change Application theme</span>
                </li>
                <li class="font-mullish flex text-white items-center space-x-2">
                  <i class="text-greenLight">
                    <HiChevronDoubleRight />
                  </i>
                  <span>View uploaded files</span>
                </li>
                <li class="font-mullish flex text-white items-center space-x-2">
                  <i class="text-greenLight">
                    <HiChevronDoubleRight />
                  </i>
                  <span>View and Edit Professional profile</span>
                </li>
              </ul>
              <div class="w-full md:w-fit flex flex-col-reverse md:flex-row md:items-center md:space-x-4 gap-y-4 md:space-y-0">
                <button class="relative bg-lightBlue w-full md:w-fit flex items-center justify-center md:justify-start text-white py-[14px] px-[18px] md:pr-[90px] rounded-md font-mullish font-bold hover:bg-lightBlue500 transition-all duration-200">
                  Sign Up
                  <div class="z-10 w-12 h-[60px] bg-greenLight skew-x-[20deg] absolute right-6 grid place-items-center">
                    <svg
                      viewBox="0 0 24 24"
                      focusable="false"
                      class="w-[20px] h-[20px] -skew-x-[20deg]"
                    >
                      <path
                        fill="currentColor"
                        d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            <img
              src={downloadImage}
              alt="payment suite"
              class=" rounded-lg  absolute h-[300px] top-[50%] right-10 translate-y-[-50%] z-[5]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureSection2;
