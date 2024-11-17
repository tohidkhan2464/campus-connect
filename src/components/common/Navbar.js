/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/operations/authAPI";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const Navlinks = [
    {
      title: "HOME",
      path: "/home",
    },
    {
      title: "CONTACT US",
      path: "/contact-us",
    },
    {
      title: "ABOUT US",
      path: "/about-us",
    },
  ];

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="fixed top-0 flex items-center justify-center w-screen bg-white border-b-2 border-b-secondary-600 z-50">
      <div className="flex flex-col items-center max-w-[70vw] w-11/12 mobileS:max-w-[100vw] ">
        <div className="w-11/12 mobileS:w-full">
          <div className="relative flex flex-row gap-x-2 items-center justify-between py-2">
            <div onClick={() => navigate("/")} className="cursor-pointer z-20 flex items-center justify-center">
              <img
                src={logo}
                className="h-[40px] mobileS:h-[30px] cursor-pointer"
                alt="Campus connect logo"
              />
            </div>
            <div className="absolute top-4 left-0 bg-gradient-to-t from-[#c471ed] to-[#f64f59] h-[40px] w-[90px] blur-lg  rounded-full z-10"></div>
            <div className="flex flex-row gap-x-4 items-center z-20 mobileS:hidden">
              {Navlinks.map((item, index) => (
                <React.Fragment key={index}>
                  <Link to={item.path}>
                    <p
                      className={` ${
                        matchRoute(item?.path)
                          ? "text-rose-400 underline font-semibold"
                          : "text-secondary-900"
                      } cursor-pointer transition-all duration-300 `}
                    >
                      {item.title}
                    </p>
                  </Link>
                </React.Fragment>
              ))}
            </div>
            {token === null ? (
              <div className="flex flex-row gap-x-2 items-center justify-center z-20">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-white font-semibold  text-secondary-900 w-full py-2 px-4 mobileS:py-1 mobileS:px-2 transition-all duration-200 ease-linear 
                hover:text-secondary-100 hover:bg-secondary-900 rounded-lg border-[2px] border-black hover:border-white"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-white font-semibold  text-secondary-900 w-full py-2 whitespace-nowrap mobileS:py-1 mobileS:px-2 px-4 transition-all duration-200 ease-linear 
                hover:text-secondary-100 hover:bg-secondary-900 rounded-lg  border-[2px] border-black hover:border-white"
                >
                  SIGN UP
                </button>
              </div>
            ) : (
              user && (
                <div className="relative flex flex-row gap-x-2 items-center justify-center z-20">
                  <Link to={"/my-profile"} className="h-full w-full z-20">
                    <img
                      src={user?.profileImage}
                      alt="Profile Image"
                      className="h-10 w-10 rounded-full mobileS:h-8 mobileS:w-8 "
                    />
                  </Link>

                  <button
                    onClick={() => dispatch(logout(navigate))}
                    className="bg-white font-semibold  text-secondary-900 w-full py-2 mobileS:py-1 mobileS:px-2 px-4 transition-all duration-200 ease-linear 
                hover:text-secondary-100 hover:bg-secondary-900 rounded-lg border-[2px] border-black hover:border-white z-20"
                  >
                    LOGOUT
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
