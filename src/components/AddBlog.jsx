import React, { useRef } from "react";
import "./css/AddBlog.css";

const topics = [
  "Life",
  "Self Improvement",
  "Work",
  "Technology",
  "Software Development",
  "Media",
  "Society",
  "Culture",
  "World",
];

const AddBlog = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const topicRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("token", localStorage.getItem("authToken"));
    formData.append("title", titleRef.current.value);
    formData.append("subtitle", subtitleRef.current.value);
    formData.append("topic", topicRef.current.value);
    formData.append("text", textRef.current.value);
    formData.append("image", imageRef.current.files[0]);

    try {
      const response = await fetch("http://127.0.0.1:3001/add_post", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Post submitted successfully!");

        titleRef.current.value = "";
        subtitleRef.current.value = "";
        topicRef.current.value = "";
        textRef.current.value = "";
        imageRef.current.value = "";

        // send user to the rendered post
      } else {
        // There was an error in the request
        alert("Error submitting post. Please try again later.");
      }
    } catch (error) {
      alert("Error:", error);
    }
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

export default AddBlog;
