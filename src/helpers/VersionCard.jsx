import React from "react";
import "./css/VersionCard.css";

const VersionCard = ({ Version }) => {
  const {
    post_id,
    user_id,
    title,
    subtitle,
    text,
    topic,
    imageURL,
    version,
    action, //enum: Added, Updated, Deleted
    action_timestamp,
  } = Version;

  const formattedDate = new Date(action_timestamp).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="version-card-container">
      <div className="version-card-left">
        <div className="version-card-content-container">
          <p className="version-card-title">{title}</p>
          <div className="version-card-text-container">
            <p className="version-card-text">
              {subtitle} — {text}
            </p>
          </div>
        </div>
        <div className="version-card-bottom-container">
          <span>{topic}</span>
          <div className="version-card-interactions-container">
            <span className="version-card-interaction">
              Version {version} — {action} on {formattedDate}
            </span>
          </div>
        </div>
      </div>
      <div className="version-card-right">
        <div className="version-card-image-container">
          {/* {imageURL && (
        <img
          className="version-card-image"
          src={imageURL}
          alt="image not found"
        />
      )} */}
        </div>
      </div>
    </div>
  );
};

export default VersionCard;
