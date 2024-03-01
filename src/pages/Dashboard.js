import React from "react";
import Post from "./Post/Post";
import Footer from "../components/footer";
import hackitupnews from "../assets/hackitupnews.jpg";
import newshirimh from "../assets/newshirimh.jpg";
import timetableece from "../assets/btechece3rdyr.png";
import btechcivil3rdyr from "../assets/btechcivil3rdyr.png";
import post from "../assets/post.png";
import broadcast from "../assets/broadcast2.jpg";
import post1 from "../assets/post2.jpg"

const Dashboard = () => {
  function filter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const posts = document.querySelectorAll(".card");

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");

        posts.forEach((post) => {
          post.style.display = "none";
          if (filter === "all" || post.classList.contains(filter)) {
            post.style.display = "block";
          }
        });
      });
    });
  }

  return (
    <div className="flex relative  flex-col justify-center items-center gap-y-12 w-11/12 max-w-[1160px] py-6 mx-auto gap-x-12 text-white text-xl h-full">
      <div className=" fixed top-[50%] translate-y-[-50%] left-10 text-white">
        <nav>
          <div class="flex flex-col justify-center space-y-4">
            <button class="filter-btn" onClick={filter} data-filter="all">
              All
            </button>
            <button class="filter-btn" onClick={filter} data-filter="post">
              Posts
            </button>
            <button class="filter-btn" onClick={filter} data-filter="event">
              Events
            </button>
            <button class="filter-btn" onClick={filter} data-filter="time">
              Time Table
            </button>
            <button class="filter-btn" onClick={filter} data-filter="news">
              College News
            </button>
            <button class="filter-btn" onClick={filter} data-filter="broadcast">
              College Broadcasts
            </button>
          </div>
        </nav>
      </div>

      

      <div className="card event">
        <Post Username="tohid" caption="#event" postImage={hackitupnews} />
      </div>
      <div className="card broadcast">
        <Post Username="ganesh" caption="#broadcast" postImage={broadcast} details="Today's Data Science Lab is cancelled for AI 2nd Year"/>
      </div>
      <div className="card news">
        <Post Username="aditi" caption="#news" postImage={newshirimh} />
      </div>
      <div className="card event">
        <Post Username="urvi" caption="#event" postImage={post1} />
      </div>
      <div className="card time">
        <Post
          Username="aditi"
          caption="#Time_Table_Ece"
          postImage={btechcivil3rdyr}
        />
      </div>
      <div className="card time">
        <Post
          Username="aditi"
          caption="#Time_Table_Ece"
          postImage={timetableece}
        />
      </div>
      <div className="card post">
        <Post Username="ganesh" caption="#post" postImage={post} />
      </div>

      <Footer />
      <div></div>
    </div>
  );
};

export default Dashboard;
