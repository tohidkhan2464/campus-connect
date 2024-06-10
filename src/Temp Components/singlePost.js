import React from "react";
import Post from "./Post/Post";
import Footer from "../components/footer";
import hackitupnews from "../assets/hackitupnews.jpg";

const Dashboard = () => {
  return (
    <div className="flex relative  flex-col justify-center items-center gap-y-12 w-11/12 max-w-[1160px] py-6 mx-auto gap-x-12 text-white text-xl h-full">
      <div className="card event">
        <Post Username="tohid" caption="#event" postImage={hackitupnews} />
      </div>

      <Footer />
      <div></div>
    </div>
  );
};

export default Dashboard;
