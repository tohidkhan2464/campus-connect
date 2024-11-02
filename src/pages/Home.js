/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static-bundles.visme.co/visme-embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    // Relative div
    <div className=" w-screen max-h-screen flex items-center justify-center">
      <div className="relative flex items-center justify-center max-w-[70vw] w-11/12 h-[calc(100%-1rem)]">
        <div className="z-10 w-11/12">
          {/* Nav bar */}

          {/* main content */}
          <div className="flex flex-col my-96 items-center justify-center">
            {/* tagline */}
            <p className="text-4xl text-center font-semibold ">
              Campus Connect - Bridging Students and Professors to Foster a
              Vibrant and Collaborative{" "}
              <span className="  text-richblue-200 mobile:text-2xl">
                {/* text-transparent bg-clip-text bg-gradient-to-t from-[#c471ed] to-[#f64f59] */}
                Academic Community
              </span>
            </p>

            {/* login sign up button */}
            {token === null ? (
              <div className="flex flex-row gap-x-6 mt-10 items-center mx-auto justify-center z-0">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-white font-semibold  text-secondary-900 w-full py-2 px-4 transition-all duration-200 ease-linear 
                hover:text-secondary-100 hover:bg-secondary-900 rounded-lg border-[2px] border-black hover:border-white"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-white font-semibold  text-secondary-900 w-full py-2 whitespace-nowrap px-4 transition-all duration-200 ease-linear 
                hover:text-secondary-100 hover:bg-secondary-900 rounded-lg  border-[2px] border-black hover:border-white"
                >
                  SIGN UP
                </button>
              </div>
            ) : (
              user && (
                <div className="flex flex-row gap-x-6 mt-10 items-center mx-auto justify-center z-0">
                  <button
                    onClick={() => navigate("/create")}
                    className="bg-white font-semibold  text-secondary-900 w-full py-2 px-4 transition-all duration-200 ease-linear 
                hover:text-secondary-100 hover:bg-secondary-900 whitespace-nowrap rounded-lg border-[2px] border-black hover:border-white"
                  >
                    Create Post
                  </button>
                  <button
                    onClick={() => navigate("/messages")}
                    className="bg-white font-semibold  text-secondary-900 w-full py-2 whitespace-nowrap px-4 transition-all duration-200 ease-linear 
                hover:text-secondary-100 hover:bg-secondary-900 rounded-lg  border-[2px] border-black hover:border-white"
                  >
                    New Chat
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* Effexts div absolute */}
        <div className=" absolute top-40 z-0 bg-gradient-to-r from-primary-700 via-primary-500 to-cyan-300  h-[550px] w-[600px] rounded-full blur-[90px]"></div>
        <div className=" absolute top-40 -left-32 z-0 bg-gradient-to-r from-primary-900 to-primary-500  h-[550px] w-[600px] rounded-full blur-[90px]"></div>
        <div className=" absolute top-40 -right-32 z-0 bg-gradient-to-r to-cyan-100 from-cyan-300  h-[550px] w-[600px] rounded-full blur-[90px]"></div>
      </div>
    </div>
  );
};

export default Home;
