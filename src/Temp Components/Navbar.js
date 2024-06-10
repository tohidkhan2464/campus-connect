import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.svg";
import { toast } from "react-hot-toast";

const Navbar = (props) => {
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn;

  return (
    <div className=" flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
      <Link to="/">
        <img src={logo} alt="logo" width={160} height={32} loading="lazy" />
      </Link>

      <nav>
        <ul className=" flex gap-x-6 text-xl text-richblack-100">
          <li className=" hover:text-white hover:underline">
            <Link to="/dashboard"> Home </Link>
          </li>

          <li className=" hover:text-white hover:underline">
            <Link to="/about"> About </Link>
          </li>

          <li className=" hover:text-white hover:underline">
            <Link to="/contact"> Contact </Link>
          </li>
        </ul>
      </nav>

      {/* Login - SigUp - LogOut - Dashboard */}

      <div className="flex items-center gap-x-4 ">
        {!isLoggedIn && (
          <Link to="/login">
            <button
              className=" bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 hover:text-white hover:bg-black
            hover:shadow-lg hover:shadow-slate-500 hover:-translate-y-1 transition-all duration-300 shadow shadow-white"
            >
              Log In
            </button>
          </Link>
        )}

        {!isLoggedIn && (
          <Link to="/signup">
            <button
              className=" bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 hover:text-white hover:bg-black
            hover:shadow-lg hover:shadow-slate-500 hover:-translate-y-1 transition-all duration-300 shadow shadow-white"
            >
              Sign up
            </button>
          </Link>
        )}

        {isLoggedIn && (
          <Link to="/">
            <button
              onClick={() => {
                setIsLoggedIn(false);
                toast.success("Logged Out");
              }}
              className=" bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 hover:text-white hover:bg-black
            hover:shadow-lg hover:shadow-slate-500 hover:-translate-y-1 transition-all duration-300 shadow shadow-white"
            >
              Log Out
            </button>
          </Link>
        )}

        {isLoggedIn && (
          <Link to="/createPost">
            <button
              className=" bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 hover:text-white hover:bg-black
            hover:shadow-lg hover:shadow-slate-500 hover:-translate-y-1 transition-all duration-300 shadow shadow-white"
            >
              Create Post
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
