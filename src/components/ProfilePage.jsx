import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import BlogPost from "../helpers/BlogPost";
import posts from "../blogs";
import "./css/ProfilePage.css";

const ProfilePage = ({ user_id }) => {
  const [profilePosts, setProfilePosts] = useState([]);
  // const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    let isMounted = true; // Create a variable to track the component's mounted status

    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      const User_id = user_id;
      if (!User_id) {
        User_id = localStorage.getItem("user_id");
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:3001/posts/get?token=${token}&user_id=${User_id}`
        );
        if (!response.ok) {
          throw new Error("Network was not able to send response");
        }
        const data = await response.json();
        if (isMounted) {
          setProfilePosts(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `http://127.0.0.1:3001/posts/get?token=${token}&user_id=${user_id}`
      );
      if (!response.ok) {
        throw new Error("Network was not able to send response");
      }
      const data = await response.json();
      setProfilePosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  const handleDsiplayClick = (event) => {
    const displayTitles = document.querySelectorAll(".nav-link");
    displayTitles.forEach((title) => {
      title.classList.remove("active");
      title.style.border = "none";
      title.style.fontWeight = "400";
    });

    const titleClicked = event.target;
    titleClicked.classList.add("active");
    titleClicked.style.fontWeight = 700;
    titleClicked.style.borderBottom = "2px solid black";
  };

  return (
    <div className="profile-page-container">
      <div className="profile-page-right">
        <div className="profile-page-cover"></div>
        <div className="profile-page-author-div">
          <h1>My Name</h1>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item" style={{ cursor: "pointer" }}>
                  <a
                    className="nav-link active"
                    style={{
                      fontWeight: "700",
                      borderBottom: "2px solid black",
                    }}
                    // aria-current="page"
                    onClick={handleDsiplayClick}
                  >
                    Posts
                  </a>
                </li>
                <li className="nav-item" style={{ cursor: "pointer" }}>
                  <a className="nav-link" onClick={handleDsiplayClick}>
                    Bookmarks
                  </a>
                </li>
                <li className="nav-item" style={{ cursor: "pointer" }}>
                  <a className="nav-link" onClick={handleDsiplayClick}>
                    Revision History
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="profile-page-posts">
          {profilePosts.map((blog, index) => {
            return (
              <Link
                className="blog-router-link"
                to="/blog-page"
                state={{ blog: blog }}
                key={index}
              >
                <BlogPost blog={blog} />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="profile-page-left">
        <div className="profile-page-author-image">
          <img src="" alt="" />
        </div>
        <span className="little-author-name">My Name</span>
        {/* <button className="btn btn-primary mb-3">Follow</button> */}
        <Link to="/add-blog">
          <button className="btn btn-primary">Add Post</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
