import React from "react";
import "./css/Comments.css";

const Comment = ({ Comment }) => {
  const { name, comment_timestamp, comment } = Comment;
  const formattedDate = new Date(comment_timestamp).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="comment-container">
      <div className="commenter-container">
        <div className="commenter-image"></div>
        <div className="name-container">
          <div className="commenter">{name}</div>
          <div className="comment-date">{formattedDate}</div>
        </div>
      </div>
      <div className="comment-text">{comment}</div>
    </div>
  );
};

export default Comment;
