import React, { useState, useEffect, useRef } from "react";
import Comment from "./Comment";
import { join } from "../components/Home";
import "./css/SideMenu.css";

// const comments = [
//   {
//     commenter: "GT",
//     date: "1st August",
//     comment:
//       "This post describes EVERY company and corporation this old Gen-Xer has ever worked for (in Media and Finance and even 'The Arts'). Just because it is a 'new generation' or 'new technology' or 'new media' -- pretty much every company ends up being the same, and every generation ends up figuring it out in turn. I could have (and everyone my age could have) written this same post, word-for-word 25 years ago. I've been laid-off or had my job mysteriously eliminated in the reorg a dozen times.... Welcome to late-stage capitalism",
//   },
//   {
//     commenter: "Mike Hickman",
//     date: "23rd July",
//     comment:
//       "Interesting post. I disagree with almost everything you say about Musk - I left Twitter the second he bought it, so you know where I am coming from - but you write in a compelling way and I like being challenged in my views. Good stuff. Thank you.",
//   },
// ];

const authUserId = JSON.parse(localStorage.getItem("authUser"));
const Users = JSON.parse(localStorage.getItem("users"));
const authUser = Users.filter((user) => user.user_id === authUserId)[0];

let Comments = JSON.parse(localStorage.getItem("comments")) || [];

const SideMenu = ({ menuIsOpen, setMenuIsOpen, setNumComments, post_id }) => {
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClick = (event) => {
      const sideMenu = menuRef.current;
      if (!(sideMenu === event.target || sideMenu.contains(event.target))) {
        setMenuIsOpen(false);
      }
    };

    if (menuIsOpen === true) {
      const timer = setTimeout(
        () => window.addEventListener("click", handleClick),
        10
      );

      return () => {
        clearTimeout(timer);
        window.removeEventListener("click", handleClick);
      };
    }
  }, [menuIsOpen]);

  const postComments = Comments.filter(
    (comment) => comment.post_id === post_id
  );
  const [commentsUsers, setCommentsUsers] = useState(
    postComments.length !== 0
      ? join(postComments, Users, "user_commented_id", "user_id")
      : []
  );

  useEffect(() => console.log(postComments), console.log(commentsUsers), [
    commentsUsers,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    var input = event.target.elements.commentBox;

    if (input.value !== "") {
      const newComment = {
        post_id: post_id,
        user_commented_id: authUserId,
        comment: input.value,
        comment_timestamp: new Date(),
      };

      setCommentsUsers((commentsUsers) => [
        ...commentsUsers,
        { ...newComment, ...authUser },
      ]);

      Comments.push(newComment);
      localStorage.setItem("comments", JSON.stringify(Comments));
      setNumComments((numComments) => numComments + 1);
    }

    input.value = "";
  };

  return (
    <div className="side-menu-overlay">
      <div className="side-menu-container" ref={menuRef}>
        <h2 className="side-menu-heading">Responses</h2>
        <div className="personal-comment-container">
          <div className="author-container">
            <div className="author-image"></div>
            <div className="author">{authUser.name}</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="text-box">
              <textarea
                id="commentBox"
                className="text-area"
                rows={3}
                placeholder="What are your thoughts?"
              ></textarea>
            </div>
            <div className="respond-container">
              <button
                type="button"
                onClick={(event) => {
                  const form = event.target.closest("form");
                  form.querySelector("#commentBox").value = "";
                  setMenuIsOpen((prevValue) => !prevValue);
                }}
                className="cancel-button"
              >
                Cancel
              </button>
              <button type="submit" className="respond-button">
                Respond
              </button>
            </div>
          </form>
        </div>
        <div className="comments">
          {commentsUsers &&
            commentsUsers.map((comment, index) => (
              <Comment Comment={comment} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
