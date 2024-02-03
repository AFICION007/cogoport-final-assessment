import React from "react";
import { topics } from "../data";
import "./css/Topics.css";

const Topics = () => {
  return (
    <div className="topics-container">
      <div className="topics-grid">
        {topics.map((topic, index) => (
          <span className="topics-topic" key={index}>
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Topics;
