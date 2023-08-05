import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import topics from "../topics";
import "./css/AddBlog.css";

const EditPage = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const topicRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const location = useLocation();
  const blog = location.state.blog;
  console.log(blog);

  useEffect(() => {
    titleRef.current.value = blog.title;
    subtitleRef.current.value = blog.subtitle;
    topicRef.current.value = blog.topic;
    textRef.current.value = blog.text;
  });

  const navigate = useNavigate();
  const handleUpdate = async () => {
    const updatedBlog = {
      title: titleRef.current.value,
      subtitle: subtitleRef.current.value,
      topic: topicRef.current.value,
      text: textRef.current.value,
    };

    const formData = new FormData();
    formData.append("token", localStorage.getItem("authToken"));
    formData.append("title", updatedBlog.title);
    formData.append("subtitle", updatedBlog.subtitle);
    formData.append("topic", updatedBlog.topic);
    formData.append("text", updatedBlog.text);
    if (imageRef.current) formData.append("image", imageRef.current.files[0]);
    formData.append("post_id", blog.id);

    // try {
    //   const response = await fetch("http://127.0.0.1:3001/add_post", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     alert("Post submitted successfully!");

    titleRef.current.value = "";
    subtitleRef.current.value = "";
    topicRef.current.value = "";
    textRef.current.value = "";
    imageRef.current.value = "";

    navigate("/blog-page", {
      state: {
        blog: {
          ...blog,
          title: updatedBlog.title,
          subtitle: updatedBlog.subtitle,
          topic: updatedBlog.topic,
          text: updatedBlog.text,
        },
      },
    });
    //   } else {
    //     // There was an error in the request
    //     alert("Error submitting post. Please try again later.");
    //   }
    // } catch (error) {
    //   alert("Error:", error);
    // }
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
