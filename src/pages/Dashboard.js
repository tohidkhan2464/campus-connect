import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import FollowBar from "../components/core/Dashboard/FollowBar";
import Bottombar from "../components/core/Dashboard/Bottombar";

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-br from-blue to-red w-screen min-h-screen  flex items-center mx-auto overflow-x-hidden justify-center">
      <div className="relative min-h-[calc(100vh - 3.5rem)] h-full w-11/12 mobileS:w-full  mobileM:w-full">
        <Sidebar />
        <Bottombar />
        <FollowBar />
        <div className="min-h-[calc(100vh-3.5rem)] h-full overflow-auto w-full ">
          <div className="mx-auto w-full py-10 ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
