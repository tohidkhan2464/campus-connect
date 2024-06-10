import React from "react";
import { RxCross1 } from "react-icons/rx";

const ViewImageModal = ({ image, setViewImage }) => {
  return (
    <div>
      <div className="absolute h-screen w-screen mt-0 -top-[5.75rem] -left-16 z-[1000]">
        <div className="mt-16 w-full h-full flex items-center justify-center bg-primary-200 bg-opacity-40 backdrop-blur-lg">
          <div className="relative w-full h-full flex items-center justify-center">
            <RxCross1
              onClick={() => setViewImage(null)}
              className="absolute top-5 right-10 text-black text-4xl cursor-pointer hover:text-red transition-all duration-200"
            />
            <div className="">
              <img
                src={image}
                alt="Profile phot"
                className="h-[600px] cursor-pointer "
                onClick={() => setViewImage(null)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewImageModal;
