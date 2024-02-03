import { useState } from "react";
import { useParams } from "react-router-dom";
import BlogCard from "../helpers/BlogCard";
import VersionCard from "../helpers/VersionCard";
import "./css/Profile.css";
import { join } from "./Home";

const Posts = JSON.parse(localStorage.getItem("posts")) || [];
const Users = JSON.parse(localStorage.getItem("users")) || [];
const Bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
const Drafts = JSON.parse(localStorage.getItem("drafts")) || [];
const Versions = JSON.parse(localStorage.getItem("versions")) || [];

const authUser = JSON.parse(localStorage.getItem("authUser"));

const Profile = () => {
  const params = useParams();
  console.log(params);

  const user = Users.filter(
    (user) => user.user_id === parseInt(params.user_id)
  )[0];
  const profilePosts = Posts.filter(
    (post) => post.user_id === parseInt(params.user_id)
  );
  const bookmarks = Bookmarks.filter(
    (bookmark) => bookmark.user_bookmarked_id === parseInt(params.user_id)
  );
  const bookmarkedPosts = join(bookmarks, Posts, "post_id", "post_id");
  const drafts = Drafts.filter(
    (draft) => draft.user_id === parseInt(params.user_id)
  );
  const versions = Versions.filter(
    (version) => version.user_id === parseInt(params.user_id)
  );

  const [displayPosts, setDisplayPosts] = useState(profilePosts);
  const [isVersions, setIsVersions] = useState(false);
  const handleDisplayClick = (event) => {
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

    if (titleClicked.textContent.includes("Bookmarks")) {
      if (isVersions) setIsVersions(false);
      setDisplayPosts(bookmarkedPosts);
    } else if (titleClicked.textContent.includes("My Posts")) {
      if (isVersions) setIsVersions(false);
      setDisplayPosts(profilePosts);
    } else if (titleClicked.textContent.includes("Drafts")) {
      if (isVersions) setIsVersions(false);
      setDisplayPosts(drafts);
    } else if (titleClicked.textContent.includes("Revision History")) {
      setDisplayPosts(versions);
      setIsVersions(true);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-right">
        <div className="profile-cover"></div>
        <div className="profile-author-div">
          <h1>{user.name}</h1>
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
                    onClick={handleDisplayClick}
                  >
                    {parseInt(params.user_id) === authUser
                      ? "My Posts"
                      : "Posts"}
                  </a>
                </li>
                {parseInt(params.user_id) === authUser && (
                  <>
                    <li className="nav-item" style={{ cursor: "pointer" }}>
                      <a className="nav-link" onClick={handleDisplayClick}>
                        Bookmarks
                      </a>
                    </li>
                    <li className="nav-item" style={{ cursor: "pointer" }}>
                      <a className="nav-link" onClick={handleDisplayClick}>
                        Revision History
                      </a>
                    </li>
                    <li className="nav-item" style={{ cursor: "pointer" }}>
                      <a className="nav-link" onClick={handleDisplayClick}>
                        Drafts
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <div className="profile-posts">
          {displayPosts.map((post, index) => {
            if (isVersions) {
              return <VersionCard Version={post} key={index} />;
            }
            return <BlogCard post={post} key={index} />;
          })}
        </div>
      </div>
      <div className="profile-left">
        <div className="profile-author-image">
          <img src="" alt="" />
        </div>
        <span className="little-author-name">{user.name}</span>
        {parseInt(params.user_id) === authUser ? (
          <button className="btn btn-primary">Add Post</button>
        ) : (
          <button className="btn btn-primary mb-3">Follow</button>
        )}
      </div>
    </div>
  );
};

export default Profile;
