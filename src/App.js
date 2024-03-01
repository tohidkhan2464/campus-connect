import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from './components/PrivateRoute';
import AboutPage from "./pages/About";
import ContactPage from "./pages/contact";
import Post from "./pages/Post/Post";
import Otp from './pages/otp';
import CreatePost from "./components/createPost";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <div className="w-screen bg-richblack-900 flex flex-col items-center justify-center">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>

        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/about" element={<AboutPage  />} />
        <Route path="/contact" element={<ContactPage  />} />
        
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/post" element={<Post  />} />
        
        {/* <Route path="/verify" element={<Otp/>}/> */}
        <Route path="/createPost" element={<CreatePost/>}/>
        {/* <Route path="/singlePost" element={<PostUpload/>}/> */}
        <Route path="/dashboard" element={
          // <PrivateRoute isLoggedIn={isLoggedIn}>
            <Dashboard />
          // </PrivateRoute>
        } />

      </Routes>

    </div>
  )
}

export default App

