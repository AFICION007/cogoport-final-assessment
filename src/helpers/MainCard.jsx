import React from "react";
import "./css/MainCard.css";

const users = JSON.parse(localStorage.getItem("users"));
const MainCard = ({ post }) => {
  const {
    user_id,
    title,
    subtitle,
    imageURL,
    number_of_likes,
    number_of_comments,
  } = post;

  const user = users.filter((user) => user.user_id === user_id)[0];

  return (
    <div className="main-card-container">
      <div className="main-card-image-container"></div>
      <div className="main-card-text-container">
        <div className="main-card-author-container">
          <div className="main-card-author-image"></div>
          <div className="main-card-author-name">{user.name}</div>
        </div>
        <div className="main-card-content-container">
          <h2 className="main-card-title">{title}</h2>
          <span className="main-card-subtitle">{subtitle}</span>
        </div>
        <div className="main-card-interactions-container">
          <div className="main-card-interactions">
            <span className="main-card-interaction">
              Likes {number_of_likes}
            </span>
            <span className="main-card-interaction">
              Comments {number_of_comments}
            </span>
          </div>
          {/* <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            style={{ display: "inline" }}
            // onClick={handleBookmark}
          >
            Bookmark
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default MainCard;
