import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
// import PostCard from "../helpers/PostCard";
// import posts from "../helpers/PostCard";
import "./css/BlogPage.css";
import "./css/PersonaPage.css";

const BlogPage = () => {
  const location = useLocation();
  const blog = location.state.blog;

  const {
    id,
    title,
    subtitle,
    text,
    user_name,
    post_date,
    number_likes,
    number_comm,
    imageURL,
    is_requested_user,
  } = blog;

  // const updateFollow = async (followed) => {
  //   const token = localStorage.getItem(authToken);
  //   if (!followed) {
  //     const response = await fetch("http://127.0.0.1:3001/add_follower", {
  //       method: "POST",
  //       body: {
  //         token,
  //         user_id: id,
  //       },
  //     });
  //     console.log(response.json());
  //   } else {
  //     const response = await fetch("http://127.0.0.1:3001/remove_follower", {
  //       method: "POST",
  //       body: {
  //         token,
  //         user_id: id,
  //       },
  //     });
  //     console.log(response.json());
  //   }
  // };

  const [followed, setFollowed] = useState(false);
  const handleFollow = () => {
    const followButton = document.getElementById("followButton");
    if (followed) {
      followButton.classList.remove("btn-primary");
      followButton.classList.add("btn-outline-primary");
      followButton.textContent = "Follow";
    } else {
      followButton.classList.remove("btn-outline-primary");
      followButton.classList.add("btn-primary");
      followButton.textContent = "Followed";
    }
    // updateFollow(followed);
    setFollowed(!followed);
  };

  const [likes, setLikes] = useState(parseInt(number_likes));
  const [liked, setLiked] = useState(false);

  // const updateLike = async (liked) => {
  //   const token = localStorage.getItem(authToken);
  //   if (!liked) {
  //     const response = await fetch("http://127.0.0.1:3001/add_likes", {
  //       method: "POST",
  //       body: {
  //         token,
  //         post_id: id,
  //       },
  //     });
  //   } else {
  //     const response = await fetch("http://127.0.0.1:3001/remove_likes", {
  //       method: "POST",
  //       body: {
  //         token,
  //         post_id: id,
  //       },
  //     });
  //   }
  // };

  const handleLike = () => {
    const likeButton = document.getElementById("likeButton");
    if (liked) {
      likeButton.classList.remove("btn-danger");
      likeButton.classList.add("btn-outline-danger");
      likeButton.textContent = "Like";
      setLikes(likes - 1);
    } else {
      likeButton.classList.remove("btn-outline-danger");
      likeButton.classList.add("btn-danger");
      likeButton.textContent = "Liked";
      setLikes(likes + 1);
    }
    // updateLike(liked);
    setLiked(!liked);
  };

  // const updateBookmark = async (liked) => {
  //   const token = localStorage.getItem(authToken);
  //   if (!liked) {
  //     const response = await fetch("http://127.0.0.1:3001/add_save_for_later", {
  //       method: "POST",
  //       body: {
  //         token,
  //         post_id: id,
  //       },
  //     });
  //     console.log(response.json());
  //   } else {
  //     const response = await fetch(
  //       "http://127.0.0.1:3001/remove_save_for_later",
  //       {
  //         method: "POST",
  //         body: {
  //           token,
  //           post_id: id,
  //         },
  //       }
  //     );
  //     console.log(response.json());
  //   }
  // };

  const [bookmarked, setBookmarked] = useState(false);
  const handleBookmark = () => {
    const bookmarkButton = document.getElementById("bookmarkButton");
    if (bookmarked) {
      bookmarkButton.classList.remove("btn-warning");
      bookmarkButton.classList.add("btn-outline-warning");
      bookmarkButton.textContent = "Bookmark";
    } else {
      bookmarkButton.classList.remove("btn-outline-warning");
      bookmarkButton.classList.add("btn-warning");
      bookmarkButton.textContent = "Bookmarked";
    }
    // updateBookmark(bookmarked);
    setBookmarked(!bookmarked);
  };

  const navigate = useNavigate();
  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (isConfirmed) {
      // const response = await fetch("http://127.0.0.1:30001/delete_post/", {
      //   method: "POST",
      //   body: {
      //     post_id: id,
      //     token: localStorage.getItem("authToken"),
      //   },
      // });
      // console.log(response.json());
      navigate("/profile");
    }
  };

  return (
    <div className="blog-page-container">
      <h1 className="blog-page-title">{title}</h1>
      <h3 className="blog-page-subtitle">{subtitle}</h3>
      <div className="blog-page-author-top">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="blog-page-author-image-container"></div>
          <div className="blog-page-author-text-container">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: "10px" }}>{user_name}</span>
              <button
                id="followButton"
                className="btn btn-outline-primary btn-sm"
                onClick={handleFollow}
              >
                Follow
              </button>
            </div>
            <span className="blog-page-published-date">
              Published: {post_date}
            </span>
          </div>
        </div>
        {is_requested_user ? (
          <div className="btn-group">
            <button type="button" className="btn btn-info">
              Actions
            </button>
            <button
              type="button"
              className="btn btn-info dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link
                  to="/edit-page"
                  state={{ blog }}
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                >
                  Edit Post
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  to="/profile"
                  className="dropdown-item"
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={handleDelete}
                >
                  Delete Blog
                </a>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
      <div className="blog-page-interactions-container">
        <div className="blog-page-like-comment-container">
          <button
            type="button"
            className="btn btn-outline-danger"
            id="likeButton"
            onClick={handleLike}
          >
            Like
          </button>
          <span className="blog-page-number">{likes}</span>
          <button type="button" className="btn btn-success" id="commentButton">
            Comment
          </button>
          <span className="blog-page-number">{number_comm}</span>
        </div>

        <button
          type="button"
          className="btn btn-outline-warning"
          id="bookmarkButton"
          onClick={handleBookmark}
        >
          Bookmark
        </button>
      </div>
      <div className="blog-page-blog-image-container">
        {imageURL && (
          <img
            className="blog-page-blog-image"
            src={imageURL}
            alt="image not found"
          />
        )}
      </div>
      <p className="blog-page-text">{text}</p>
      {/* <div className="persona-page-main-container">
        <h1 className="persona-page-heading">Top Posts</h1>
        <div className="persona-page-top-content">
          {posts.map((post, index) => (
            <Link
              className="blog-router-link"
              to="/blog-page"
              state={{ blog: post }}
              key={index}
            >
              <PostCard blog={post} number={index} />
            </Link>
          ))}
          {posts.map((post, index) => (
            <Link
              className="blog-router-link"
              to="/blog-page"
              state={{ blog: post }}
              key={index}
            >
              <PostCard blog={post} number={index + 3} />
            </Link>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default BlogPage;
