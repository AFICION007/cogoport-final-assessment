import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import SideMenu from "../helpers/SideMenu";
import Recommended from "./Recommended";
import "./css/Blog.css";
import "./css/Persona.css";

var Users = JSON.parse(localStorage.getItem("users"));
var posts = JSON.parse(localStorage.getItem("posts"));
var Likes = JSON.parse(localStorage.getItem("likes")) || [];
var Bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
var Followers = JSON.parse(localStorage.getItem("followers")) || [];
const authUser = JSON.parse(localStorage.getItem("authUser"));

const Blog = () => {
  const params = useParams();

  const post = posts.filter(
    (post) => post.post_id === parseInt(params.post_id)
  )[0];
  const user = Users.filter((user) => post.user_id === user.user_id)[0];
  const [postUser, setPostUser] = useState({ ...post, ...user });

  const {
    post_id,
    user_id,
    title,
    subtitle,
    text,
    name,
    post_date_time,
    number_of_likes,
    number_of_comments,
    number_of_views,
  } = postUser;

  const formattedDate = new Date(post_date_time).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    return () => {
      posts = posts.map((post) => {
        if (post.post_id === post_id) {
          return { ...post, number_of_views: post.number_of_views + 1 };
        } else {
          return post;
        }
      });

      localStorage.setItem("posts", JSON.stringify(posts));
    };
  }, []);

  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    setFollowed(isFollowed(user_id, authUser));
    if (followed) {
      const followButton = document.getElementById("followButton");
      followButton.classList.remove("btn-outline-primary");
      followButton.classList.add("btn-primary");
      followButton.textContent = "Followed";
    }
  }, [followed]);

  const isFollowed = (user_id, authUser) => {
    const filteredFollowers = Followers.filter(
      (follow) =>
        follow.user_id === user_id && follow.user_follower_id === authUser
    );
    if (filteredFollowers.length !== 0) return true;
    return false;
  };

  const updateFollow = (followed) => {
    if (!followed) {
      Followers.push({ user_id, user_follower_id: authUser });
      Users = Users.map((user) =>
        user.user_id === user_id
          ? { ...user, number_of_followers: user.number_of_followers + 1 }
          : user
      );
    } else {
      Followers = Followers.filter(
        (follow) =>
          !(follow.user_id === user_id && follow.user_follower_id === authUser)
      );

      Users = Users.map((user) =>
        user.user_id === user_id
          ? { ...user, number_of_followers: user.number_of_followers - 1 }
          : user
      );
    }
    localStorage.setItem("followers", JSON.stringify(Followers));
    localStorage.setItem("users", JSON.stringify(Users));
  };

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
    updateFollow(followed);
    setFollowed((followed) => !followed);
  };

  const isLiked = (post_id, user_id) => {
    const filteredLikes = Likes.filter(
      (like) => like.post_id === post_id && like.user_liked_id === user_id
    );
    console.log(filteredLikes);
    if (filteredLikes.length !== 0) return true;
    return false;
  };

  const [likes, setLikes] = useState(number_of_likes);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    setLiked(isLiked(post_id, authUser));
    if (liked) {
      const likeButton = document.getElementById("likeButton");
      likeButton.classList.remove("btn-outline-danger");
      likeButton.classList.add("btn-danger");
      likeButton.textContent = "Liked";
    }
  }, [liked]);

  const updateLike = (liked) => {
    if (!liked) {
      Likes.push({ post_id, user_liked_id: authUser });

      posts = posts.map((post) =>
        post.post_id === post_id
          ? { ...post, number_of_likes: post.number_of_likes + 1 }
          : post
      );
    } else {
      Likes = Likes.filter(
        (like) => !(like.post_id === post_id && like.user_liked_id === authUser)
      );
      posts = posts.map((post) =>
        post.post_id === post_id
          ? { ...post, number_of_likes: post.number_of_likes - 1 }
          : post
      );
    }
    localStorage.setItem("likes", JSON.stringify(Likes));
    localStorage.setItem("posts", JSON.stringify(posts));
  };

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
    updateLike(liked);
    setLiked((liked) => !liked);
  };

  const isBookmarked = (post_id, user_id) => {
    const filteredBookmarks = Bookmarks.filter(
      (bookmark) =>
        bookmark.post_id === post_id && bookmark.user_bookmarked_id === user_id
    );
    if (filteredBookmarks.length !== 0) return true;
    return false;
  };

  const [bookmarked, setBookmarked] = useState(false);
  useEffect(() => {
    setBookmarked(isBookmarked(post_id, authUser));
    if (bookmarked) {
      const bookmarkButton = document.getElementById("bookmarkButton");
      bookmarkButton.classList.remove("btn-outline-warning");
      bookmarkButton.classList.add("btn-warning");
      bookmarkButton.textContent = "Bookmarked";
    }
  }, [bookmarked]);

  const updateBookmark = (bookmarked) => {
    if (!bookmarked) {
      Bookmarks.push({ post_id, user_bookmarked_id: authUser });
    } else {
      Bookmarks = Bookmarks.filter(
        (bookmark) =>
          !(
            bookmark.post_id === post_id &&
            bookmark.user_bookmarked_id === authUser
          )
      );
    }
    localStorage.setItem("bookmarks", JSON.stringify(Bookmarks));
  };

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
    updateBookmark(bookmarked);
    setBookmarked((bookmarked) => !bookmarked);
  };

  const navigate = useNavigate();
  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (isConfirmed) {
      localStorage.setItem(
        "posts",
        JSON.stringify(posts.filter((post) => post.post_id !== post_id))
      );

      var versions = JSON.parse(localStorage.getItem("versions"));
      var version = versions.filter((version) => version.post_id === post_id);
      version = version[version.length - 1];
      version = {
        ...version,
        action: "Deleted",
        action_timestamp: new Date(),
      };
      versions.push(version);
      localStorage.setItem("versions", JSON.stringify(versions));
      navigate("/");
    }
  };

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [numComments, setNumComments] = useState(number_of_comments);

  useEffect(() => {
    posts = posts.map((post) => {
      if (post.post_id === post_id) {
        return { ...post, number_of_comments: numComments };
      } else {
        return post;
      }
    });

    localStorage.setItem("posts", JSON.stringify(posts));
  }, [numComments]);

  return (
    <>
      <div className="blog-page-container">
        {menuIsOpen && (
          <SideMenu
            menuIsOpen={menuIsOpen}
            setMenuIsOpen={setMenuIsOpen}
            setNumComments={setNumComments}
            post_id={post_id}
          />
        )}
        <h1 className="blog-page-title">{title}</h1>
        <h3 className="blog-page-subtitle">{subtitle}</h3>
        <div className="blog-page-author-top">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link to={`/profile/${user_id}`} className="blog-router-link">
              <div className="blog-page-author-image-container"></div>
              <div className="blog-page-author-text-container">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>{name}</span>
                  {authUser !== user_id && (
                    <button
                      id="followButton"
                      className="btn btn-outline-primary btn-sm"
                      onClick={handleFollow}
                    >
                      Follow
                    </button>
                  )}
                </div>
                <span className="blog-page-published-date">
                  Published: {formattedDate}
                </span>
              </div>
            </Link>
          </div>
          {authUser === user_id ? (
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
                    to={`/edit/${post_id}`}
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
            <button
              type="button"
              className="btn btn-success"
              id="commentButton"
              onClick={() => setMenuIsOpen(!menuIsOpen)}
            >
              Comment
            </button>
            <span className="blog-page-number">{numComments}</span>
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
          {/* {imageURL && (
          <img
            className="blog-page-blog-image"
            src={imageURL}
            alt="image not found"
          />
        )} */}
        </div>
        <p className="blog-page-text">{text}</p>
      </div>
      <Recommended post_id={post_id} user_id={user_id} />
    </>
  );
};

export default Blog;
