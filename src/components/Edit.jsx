import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { topics } from "../data";
import "./css/Blog.css";

const posts = JSON.parse(localStorage.getItem("posts"));

const EditPage = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const topicRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const params = useParams();
  const [Post, setPost] = useState(
    posts.filter((post) => post.post_id === parseInt(params.post_id))[0]
  );

  const resetRefs = () => {
    titleRef.current.value = "";
    subtitleRef.current.value = "";
    topicRef.current.value = "";
    textRef.current.value = "";
    imageRef.current.value = "";
  };

  useEffect(() => {
    titleRef.current.value = Post.title;
    subtitleRef.current.value = Post.subtitle;
    topicRef.current.value = Post.topic;
    textRef.current.value = Post.text;
  }, []);

  const navigate = useNavigate();
  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedPost = {
      title: titleRef.current.value,
      subtitle: subtitleRef.current.value,
      topic: topicRef.current.value,
      text: textRef.current.value,
    };

    var Posts = JSON.parse(localStorage.getItem("posts"));
    Posts = Posts.map((post) => {
      if (post.post_id === Post.post_id) {
        // setPost({ ...post, ...updatedPost });
        return { ...post, ...updatedPost };
      }
      return post;
    });
    localStorage.setItem("posts", JSON.stringify(Posts));

    var versions = JSON.parse(localStorage.getItem("versions"));
    var version = versions.filter(
      (version) => version.post_id === Post.post_id
    );
    version = version[versions.length - 1];
    version = {
      ...version,
      ...updatedPost,
      version: version.version + 1,
      action: "Updated",
      action_timestamp: new Date(),
    };
    versions.push(version);
    localStorage.setItem("versions", JSON.stringify(versions));

    resetRefs();
    navigate("/");
  };

  return (
    <div className="addblog-container">
      <h1 className="addblog-heading">Update Blog</h1>
      <form onSubmit={handleUpdate}>
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
            required
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

export default EditPage;
