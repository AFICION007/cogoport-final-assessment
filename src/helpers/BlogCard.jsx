import React from "react";
import "./css/BlogCard.css";

const BlogCard = ({ post }) => {
  const {
    title,
    subtitle,
    text,
    topic,
    number_of_likes,
    number_of_comments,
    number_of_views,
  } = post;

  return (
    <div className="blog-card-container">
      <div className="blog-card-left">
        <div className="blog-card-content-container">
          <p className="blog-card-title">{title}</p>
          <div className="blog-card-text-container">
            <p className="blog-card-text">
              {subtitle} — {text}
            </p>
          </div>
        </div>
        <div className="blog-card-bottom-container">
          <span>{topic}</span>
          <div className="blog-card-interactions-container">
            <span className="blog-card-interaction">
              Likes: {number_of_likes}
            </span>
            <span className="blog-card-interaction">
              Comments: {number_of_comments}
            </span>
            <span className="blog-card-interaction">
              Views: {number_of_views}
            </span>
          </div>
        </div>
      </div>
      <div className="blog-card-right">
        <div className="blog-card-image-container">
          {/* {imageURL && (
            <img
              className="blog-card-image"
              src={imageURL}
              alt="image not found"
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
