import React, { useEffect } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import { Route, Routes } from "react-router-dom";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Home from "./pages/Home";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyDash from "./components/core/Dashboard/MyDash";
import Navbar from "./components/common/Navbar";
import Messages from "./components/core/Dashboard/Messages";
import Notifications from "./components/core/Dashboard/Notifications";
import Post from "./components/core/Dashboard/PostDetails";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Search from "./components/core/Dashboard/Search";
import CreatePost from "./components/core/Dashboard/CreatePost";
import PostCard from "./pages/PostCard";
import Settings from "./components/core/Dashboard/MyProfile/Settings";
import EditProfile from "./components/core/Dashboard/MyProfile/EditProfile";

function App() {
  return (
    <div className=" min-h-screen h-full w-screen">
      <div className="flex flex-col mx-auto w-screen items-center min-h-screen relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <OpenRoute>
                <SignUp />
              </OpenRoute>
            }
          />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/settings" element={<Settings />} />
            {/* <Route path="/edit-profile" element={<EditProfile />} /> */}
            <Route path="/home" element={<MyDash />} />
            {/* <Route path="/messages" element={<Messages />} /> */}
            {/* <Route path="/notifications" element={<Notifications />} /> */}
            <Route path="/user-posts" element={<Post />} />
            <Route path="/view-post/:postId" element={<PostCard />} />
            <Route path="/create" element={<CreatePost />} />
            {/* <Route path="/search" element={<Search />} /> */}
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
