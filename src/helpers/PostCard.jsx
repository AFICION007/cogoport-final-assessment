import React from "react";
import "./css/PostCard.css";

const PostCard = ({ number, blog }) => {
  var { title, name, post_date_time } = blog;

  var date = new Date(post_date_time);
  date = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="post-card-main-container">
      <div className="post-card-left"> {`0${number + 1}`}</div>
      <div className="post-card-right">
        <div className="post-card-right-top">
          <div className="post-card-right-top-image"></div>
          <span className="post-card-author">{name}</span>
        </div>
        <h3 className="post-card-post-heading">{title}</h3>
        <span className="post-card-date">{date}</span>
      </div>
    </div>
  );
};

export default PostCard;
