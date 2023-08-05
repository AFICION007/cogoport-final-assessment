import React from "react";
import "./css/PostCard.css";

const PostCard = ({ number, blog }) => {
  var {
    // id,
    title,
    user_name,
    post_date,
  } = blog;

  // date = new Date(post_date);
  // date = date.toLocaleString("en-GB", {
  //   day: "numeric",
  //   month: "short",
  //   year: "numeric",
  // });

  return (
    <div className="post-card-main-container">
      <div className="post-card-left"> {`0${number + 1}`}</div>
      <div className="post-card-right">
        <div className="post-card-right-top">
          <div className="post-card-right-top-image"></div>
          <span className="post-card-author">{user_name}</span>
        </div>
        <h3 className="post-card-post-heading">{title}</h3>
        <span className="post-card-date">{post_date}</span>
      </div>
    </div>
  );
};

export default PostCard;
