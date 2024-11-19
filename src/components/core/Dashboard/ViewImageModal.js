import React from "react";
import { RxCross1 } from "react-icons/rx";

const ViewImageModal = ({ image, setViewImage }) => {
  return (
    <div>
      <div className="absolute h-screen w-screen mt-0 mobileS:-left-0 tablet:left-0 mobileM:left-0 -top-[5.75rem] -left-20 z-[1000]">
        <div
          className="mt-16 w-full h-full flex items-center justify-center bg-primary-200 bg-opacity-40 backdrop-blur-lg"
          onClick={() => setViewImage(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <RxCross1
              onClick={(e) => {
                setViewImage(null);
                e.stopPropagation();
              }}
              className="absolute top-5 right-10 mobileS:right-5 mobileM:text-xl mobileM:right-5 mobileS:text-xl text-black text-4xl cursor-pointer hover:text-red transition-all duration-200"
            />
            <div className="">
              <img
                src={image}
                alt="Profile phot"
                className="h-[600px] cursor-pointer mobileS:w-[270px] mobileM:max-w-[320px] "
                onClick={(e) => {
                  setViewImage(null);
                  e.stopPropagation();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewImageModal;
