import React from "react";
import "./css/BlogPost.css";

const BlogPost = ({ blog }) => {
  const { title, subtitle, topic, text, imageURL } = blog;

  console.log(imageURL);

  return (
    <div className="blog-post-container">
      <div className="blog-post-left">
        <div className="blog-post-content-container">
          <p className="blog-post-title">{title}</p>
          <div className="blog-post-text-container">
            <p className="blog-post-text">
              {subtitle} -- {text}
            </p>
          </div>
        </div>
        <div className="blog-post-bookmark-container">
          <span>{topic}</span>
          <button type="button" className="btn btn-success">
            Bookmark
          </button>
        </div>
      </div>
      <div className="blog-post-right">
        <div className="blog-post-image-container">
          {imageURL && (
            <img
              className="blog-post-image"
              src={imageURL}
              alt="image not found"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
