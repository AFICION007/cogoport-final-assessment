import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { join } from "./Home";
import PostCard from "../helpers/PostCard";

import "./css/Persona.css";

const Persona = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [postUsers, setPostUsers] = useState([]);

  useEffect(() => {
    setPosts(JSON.parse(localStorage.getItem("posts")) || []);
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
  }, []);

  useEffect(() => {
    setPostUsers(join(posts, users, "user_id", "user_id"));
  }, [posts, users]);

  return (
    <div className="persona-page-main-container">
      <h1 className="persona-page-heading">Top Posts</h1>
      <div className="persona-page-top-content">
        {postUsers.map((post, index) => (
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
        {postUsers.map((post, index) => (
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

export default Persona;
