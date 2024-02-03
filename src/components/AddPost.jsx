import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { topics } from "../data";
import "./css/AddPost.css";

var postsCount = 0;
var draftsCount = 0;

const authUser = JSON.parse(localStorage.getItem("authUser"));

const AddPost = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const topicRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const postContent = {
      post_id: postsCount,
      user_id: authUser,
      title: titleRef.current.value,
      subtitle: subtitleRef.current.value,
      text: textRef.current.value,
      topic: topicRef.current.value,
    };

    const post = {
      ...postContent,
      number_of_likes: 0,
      number_of_comments: 0,
      number_of_views: 0,
      post_date_time: new Date(),
    };

    const version = {
      ...postContent,
      version: 1,
      action: "Added",
      action_timestamp: new Date(),
    };

    var posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));

    var versions = JSON.parse(localStorage.getItem("versions")) || [];
    versions.push(version);
    localStorage.setItem("versions", JSON.stringify(versions));

    postsCount += 1;
    alert("Post submitted successfully!");
    console.log(posts);

    titleRef.current.value = "";
    subtitleRef.current.value = "";
    topicRef.current.value = "";
    textRef.current.value = "";
    imageRef.current.value = "";

    navigate("/");
  };

  const handleSaveDraft = () => {
    if (
      !titleRef.current.value &&
      !subtitleRef.current.value &&
      !textRef.current.value &&
      !topicRef.current.value
    ) {
      alert(
        "Please fill in any of the required fields before saving the draft."
      );
      return;
    }

    const draft = {
      draft_id: draftsCount, // or a unique draft ID
      user_id: authUser,
      title: titleRef.current.value,
      subtitle: subtitleRef.current.value,
      text: textRef.current.value,
      topic: topicRef.current.value,
    };

    var drafts = JSON.parse(localStorage.getItem("drafts")) || [];
    drafts.push(draft);
    localStorage.setItem("drafts", JSON.stringify(drafts));

    alert("Draft saved successfully!");

    titleRef.current.value = "";
    subtitleRef.current.value = "";
    topicRef.current.value = "";
    textRef.current.value = "";
    imageRef.current.value = "";
  };

  return (
    <div className="addblog-container">
      <h1 className="addblog-heading">Post Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            ref={titleRef}
            id="title"
            type="text"
            placeholder="Title"
            className="form-control form-control-lg"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="subtitle" className="form-label">
            Subtitle
          </label>
          <input
            ref={subtitleRef}
            id="subtitle"
            type="text"
            placeholder="Subtitle"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <textarea
            ref={textRef}
            id="text"
            style={{ height: "150px" }}
            type="text"
            placeholder="Tell your story"
            className="form-control"
            required
          ></textarea>
        </div>

        <div className="mb-3 col-3">
          <label htmlFor="topic" className="form-label">
            Topic
          </label>
          <select ref={topicRef} id="topic" className="form-control" required>
            <option value="">None</option>
            {topics.map((topic, index) => (
              <option value={topic} key={index}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Add Blog Image
          </label>
          <br />
          <input
            ref={imageRef}
            id="image"
            type="file"
            className="form-control-file"
          />
        </div>

        <div className="publish-button-container">
          <div className="col-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleSaveDraft}
            >
              Save Draft
            </button>
          </div>
          <div className="col-3">
            <button type="submit" className="btn btn-primary">
              Publish
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
