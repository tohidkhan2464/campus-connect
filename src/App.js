import React, { useEffect } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import { Route, Routes } from "react-router-dom";
import OpenRoute from "./components/Auth/OpenRoute";
import Home from "./pages/Home";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyDash from "./components/core/Dashboard/MyDash";
import Navbar from "./components/common/Navbar";
import Post from "./components/core/Dashboard/PostDetails";
import MyProfile from "./components/core/Dashboard/MyProfile";
import CreatePost from "./components/core/Dashboard/CreatePost";
import PostCard from "./pages/PostCard";
import Settings from "./components/core/Dashboard/MyProfile/Settings";
import EditProfile from "./components/core/Dashboard/MyProfile/EditProfile";
import OtherUserProfile from "./components/core/Dashboard/OtherUserProfile";
import { useSelector } from "react-redux";
import Activity from "./pages/Activity";
import Messages from "./pages/Messages";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "./lib/userStore";
import { auth,  } from "./lib/firebase";
import Search from "./pages/Search";
import SearchResults from "./pages/SearchResults";
import Broadcast from "./components/Broadcast/Broadcast";

function App() {
  const { user } = useSelector((state) => state.profile);

  const { fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, () => {
      fetchUserInfo(user?._id);
    });

    return () => {
      unsub();
    };
  }, [fetchUserInfo, user?._id]);

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
            <Route path="/my-profile/:userName" element={<EditProfile />} />
            <Route path="/home" element={<MyDash />} />
            <Route path="/profile/:userName" element={<OtherUserProfile />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/user-posts" element={<Post />} />
            <Route path="/view-post/:postId" element={<PostCard />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/:query" element={<SearchResults />} />
            {user?.accountType === "Lecturer" && (
              <>
                <Route path="/broadcast" element={<Broadcast />} />
              </>
            )}
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
