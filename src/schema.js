import { useState } from "react";

const authUser = 0;

const [usersCount, setUsersCount] = useState(0);
const users = {
  user_id: usersCount,
  name: "",
  email: "",
  password: "",
  number_of_followers: 0,
};

const [postsCount, setPostsCount] = useState(0);
const posts = {
  post_id: postsCount,
  user_id: "",
  title: "",
  subtitle: "",
  text: "",
  topic: "",
  imageURL: "",
  number_of_likes: "",
  number_of_comments: "",
  number_of_views: "",
  post_date_time: "",
};

const versions = {
  post_id: "",
  user_id: "",
  title: "",
  subtitle: "",
  text: "",
  topic: "",
  imageURL: "",
  version: "",
  action: "", //enum: Added, Updated, Deleted
  action_timestamp: "",
};

const likes = {
  post_id: "",
  user_liked_id: "",
};

const bookmarks = {
  post_id: "",
  user_bookmarked_id: "",
  bookmark_timestamp: "",
};

const followers = {
  user_id: "",
  user_follower_id: "",
};

const comments = {
  post_id: "",
  user_commented_id: "",
  comment: "",
  comment_timestamp: "",
};

const drafts = {
  draft_id: "",
  user_id: "",
  title: "",
  subtitle: "",
  text: "",
  topic: "",
  imageURL: "",
};
