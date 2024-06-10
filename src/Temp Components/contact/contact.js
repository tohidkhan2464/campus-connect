import React from "react";
import "./style.css";

function ContactUs() {
  function submitHandler() {

  }

  return (
    <div className=" h-screen w-screen bg-richblack-900">
      <div class="login-box">
        <h2>Contact Me</h2>
        <form onSubmit={submitHandler}>
          <div class="user-box">
            <input type="text" name="name" required />
            <label>Name</label>
          </div>

          <div class="user-box">
            <input type="email" name="email" required />
            <label>Email</label>
          </div>

          <div class="user-box">
            <input type="text" name="message" required />
            <label>Message</label>
          </div>

          <button type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Send
          </button>

        </form>
      </div>
    </div>
  );
}

export { ContactUs };
