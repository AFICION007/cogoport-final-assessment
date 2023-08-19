import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostCard from "../helpers/PostCard";

import "./css/PersonaPage.css";

const PersonaPage = () => {
  const [topPosts, setTopPosts] = useState([]);
  const [recomPosts, setRecomPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchTopData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/posts");
        if (!response.ok) {
          throw new Error("Network was not able to send response");
        }
        const jsonData = await response.json();
        if (isMounted) {
          setTopPosts(jsonData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchRecomData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/posts");
        if (!response.ok) {
          throw new Error("Network was not able to send response");
        }
        const jsonData = await response.json();
        if (isMounted) setRecomPosts(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTopData();
    fetchRecomData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="persona-page-main-container">
      <h1 className="persona-page-heading">Top Posts</h1>
      <div className="persona-page-top-content">
        {topPosts.map((post, index) => (
          <Link
            className="blog-router-link"
            to="/blog-page"
            state={{ blog: post }}
            key={index}
          >
            <PostCard blog={post} number={index} />
          </Link>
        ))}
      </div>
      <h1 className="persona-page-heading">Recommended posts</h1>
      <div className="persona-page-top-content">
        {recomPosts.map((post, index) => (
          <Link
            className="blog-router-link"
            to="/blog-page"
            state={{ blog: post }}
            key={index}
          >
            <PostCard blog={post} number={index} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PersonaPage;
