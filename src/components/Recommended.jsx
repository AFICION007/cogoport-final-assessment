import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainCard from "../helpers/MainCard";
import "./css/Recommended.css";

const Recommended = ({ post_id, user_id }) => {
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts"));
    const filteredPosts = posts.filter(
      (post) => post.user_id === user_id && post.post_id !== post_id
    );
    setRecommendedPosts(filteredPosts);
  }, [post_id, user_id]);

  return (
    <div className="recommended-container">
      <div className="recommended-heading-container">
        <span className="recommended-heading">
          More posts by a similar author
        </span>
      </div>
      <div className="recommended-grid">
        {recommendedPosts.map((post, index) => {
          return (
            <Link
              to={`/blog/${post.post_id}`}
              key={index}
              state={{ post: post }}
              className="blog-router-link"
            >
              <MainCard post={post} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Recommended;
