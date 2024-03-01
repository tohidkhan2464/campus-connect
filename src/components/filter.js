import React from "react";

const Filter = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const posts = document.querySelectorAll(".post");

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
  });

  return (
    <div className=" fixed top-[50%] translate-y-[-50%] left-10 text-white">
      <nav>
        <div class="flex flex-col justify-center space-y-4">
          <button class="filter-btn" data-filter="all">
            All
          </button>
          <button class="filter-btn" data-filter="post">
            Posts
          </button>
          <button class="filter-btn" data-filter="event">
            Events
          </button>
          <button class="filter-btn" data-filter="time">
            Time Table
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Filter;
