import React, { useState } from "react";
import "./Post.css";
import unlike from '../../assets/like.png'
import comment from '../../assets/comment.png'
import send from '../../assets/share.png'
import save from '../../assets/save.png'

const Post = ({ Username, caption, postImage, details="" }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return (
    <div className="post-container">
      <div className="user-info">
        <img
          src="https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg"
          alt="User Profile "
          width="40"
          height="40"
        />
        <span>{Username}</span>
        
      </div>

      <img
        className="post-image"
        src={postImage}
        alt="Post "
      />
      <div className="details">
        <p>{details}</p>
      </div>
      <div className="interaction-buttons">
        <div>
          <button onClick={handleLikeClick}>
            <img
              src={unlike}
              alt="like"
            />
          </button>
          <button>
            <img src={comment} alt="Comment" />
          </button>
          <button>
            <img src={send} alt="Share" />
          </button>
        </div>
        <div>
          <button className="save_btn">
            <img src={save} alt="Save" />
          </button>
        </div>
      </div>
      
      <div className="caption">
        <p>{caption}</p>
      </div>
    </div>
  );
};

export default Post;
