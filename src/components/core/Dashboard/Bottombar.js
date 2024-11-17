import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as Icons from "react-icons/hi";
import { useSelector } from "react-redux";
import { NavbarLinks } from "../../../data/navbar-links";

const Bottombar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.profile);
  const [active, setActive] = useState(0);
  const handleClick = (index) => {
    setActive(index);
  };

  return (
    <div
      className={`bg-white max-h-[4.4rem] px-6 rounded-t-xl w-full fixed bottom-0 z-40 duration-500 translate-y-0 `}
    >
      <ul className="flex relative pb-1">
        {NavbarLinks.map((menu, i) => {
          let Icon = Icons[menu.icon];
          if (menu.type && user?.accountType !== menu.type) return null;
          if (menu.title === "Profile") return null;
          return (
            <li key={i} className="w-full mx-auto">
              <NavLink
                className="flex flex-col pt-2"
                to={menu.path}
                onClick={() => handleClick(i)}
              >
                <span
                  className={`cursor-pointer text-xl mx-auto duration-500 ${
                    location.pathname === menu.path &&
                    "-mt-6 text-white border-2 border-blue bg-blue rounded-full p-2 "
                  }`}
                >
                  <Icon />
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Bottombar;
