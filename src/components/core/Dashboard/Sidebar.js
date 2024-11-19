/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { NavbarLinks } from "../../../data/navbar-links";
import * as Icons from "react-icons/hi";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.profile);
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="fixed top-[60px] mobileS:hidden tablet:hidden mobileM:hidden mobileL:hidden left-0 max-h-[calc(100vh-3.5rem)] h-full">
      {/* For Desktop Mode */}
      <div className=" ml-10 laptop:ml-5 flex flex-col min-w-[155px] h-[100%] w-full py-10 border-r-2 ">
        <div className="flex flex-col gap-y-10">
          {NavbarLinks.map((link, index) => {
            let Icon = Icons[link.icon];
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <React.Fragment key={index}>
                {link.title === "Profile" ? (
                  <Link to={link.path} className="cursor-pointer ">
                    <div
                      className={`flex flex-row gap-x-2 text-xl  items-center ${
                        matchRoute(link?.path)
                          ? "text-secondary-100 underline font-bold"
                          : "text-secondary-900 "
                      }`}
                    >
                      <img
                        src={user?.profileImage}
                        alt="Profile Photo"
                        className="h-8 w-8 rounded-full"
                      />
                      <p>{link.title}</p>
                    </div>
                  </Link>
                ) : (
                  <Link to={link.path} className="cursor-pointer ">
                    <div
                      className={`flex flex-row gap-x-2 text-xl  items-center ${
                        matchRoute(link?.path)
                          ? "text-secondary-100  underline font-bold"
                          : "text-secondary-900 "
                      }`}
                    >
                      <Icon className="text-3xl" />
                      <p>{link.title}</p>
                    </div>
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
