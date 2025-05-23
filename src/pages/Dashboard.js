import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import FollowBar from "../components/core/Dashboard/FollowBar";
import Bottombar from "../components/core/Dashboard/Bottombar";

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-br from-blue to-red w-screen min-h-screen  flex items-end mx-auto overflow-x-hidden justify-center">
      <div className="relative min-h-[calc(100vh - 3.5rem)] h-full tablet:w-full w-11/12 mobileS:w-full  mobileM:w-full mobileL:w-full">
        <Sidebar />
        <Bottombar />
        <FollowBar />
        <div className="min-h-[calc(100vh-3.5rem)] h-full overflow-auto w-full ">
          <div className="mx-auto w-full pt-10 ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
