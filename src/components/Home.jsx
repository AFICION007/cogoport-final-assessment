import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../helpers/BlogCard";
import { topics } from "../data";
import "./css/Home.css";

export const join = (posts, users, key1, key2) => {
  return posts.map((post) => {
    const user = users.filter((user) => post[key1] === user[key2])[0];
    return { ...post, ...user };
  });
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setPosts(JSON.parse(localStorage.getItem("posts")));
    setUsers(JSON.parse(localStorage.getItem("users")));
  }, []);

  const [postsUsers, setPostsUsers] = useState([]);
  useEffect(() => {
    setPostsUsers(join(posts, users, "user_id", "user_id"));
  }, [posts, users]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    topic: "",
    likesFrom: "",
    likesTo: "",
    commentsFrom: "",
    commentsTo: "",
  });

  const handleFilterBy = (event) => {
    event.preventDefault();
    const {
      filterFrom,
      filterTo,
      filterTopic,
      filterLikesFrom,
      filterLikesTo,
      filterCommentsFrom,
      filterCommentsTo,
    } = event.target.elements;

    setFilters({
      fromDate: filterFrom.value,
      toDate: filterTo.value,
      topic: filterTopic.value,
      likesFrom: filterLikesFrom.value,
      likesTo: filterLikesTo.value,
      commentsFrom: filterCommentsFrom.value,
      commentsTo: filterCommentsTo.value,
    });
  };

  const handleFilterReset = (event) => {
    event.preventDefault();
    setFilters({
      fromDate: "",
      toDate: "",
      topic: "",
      likesFrom: "",
      likesTo: "",
      commentsFrom: "",
      commentsTo: "",
    });

    const filterForm = event.target.closest("form");
    filterForm.reset();
  };

  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
    if (postsUsers.length !== 0) {
      setFilteredPosts(
        postsUsers.filter(
          ({
            title,
            subtitle,
            text,
            topic,
            name,
            post_date_time,
            number_of_likes,
            number_of_comments,
          }) => {
            const isMatchingSearch =
              title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
              text.toLowerCase().includes(searchQuery.toLowerCase()) ||
              topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
              name.toLowerCase().includes(searchQuery.toLowerCase());

            const isMatchingFilter =
              (!filters.fromDate ||
                new Date(post_date_time) >= new Date(filters.fromDate)) &&
              (!filters.toDate ||
                new Date(post_date_time) <= new Date(filters.toDate)) &&
              (!filters.topic || filters.topic === topic) &&
              (!filters.likesFrom || number_of_likes >= filters.likesFrom) &&
              (!filters.likesTo || number_of_likes <= filters.likesTo) &&
              (!filters.commentsFrom ||
                number_of_comments >= filters.commentsFrom) &&
              (!filters.commentsTo || number_of_comments <= filters.commentsTo);

            return isMatchingSearch && isMatchingFilter;
          }
        )
      );
    }
  }, [postsUsers, filters, searchQuery]);

  return (
    <div className="home-page">
      <div className="search-container">
        <form className="d-flex" onSubmit={(event) => event.preventDefault()}>
          <input
            id="searchInput"
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <button className="btn btn-outline-primary" type="submit">
            Search
          </button>
        </form>
        <div className="home-page-user-actions-container">
          <div className="user-actions">Register</div>
          <div className="user-actions">Sign In</div>
        </div>
      </div>
      <div className="filters-container">
        <div className="filters-heading-container">
          <span className="filters-heading">FILTERS</span>
        </div>
        <form onSubmit={handleFilterBy} className="filters-form">
          <div className="dates-container">
            <span className="filter-title">Date:</span>
            <div className="dates-form-container">
              <label className="form-label" htmlFor="filterFrom">
                From
              </label>
              <input
                className="form-control"
                type="date"
                id="filterFrom"
                name="filterFrom"
              />
              <label className="form-label" htmlFor="filterTo">
                To
              </label>
              <input
                className="form-control"
                type="date"
                id="filterTo"
                name="filterTo"
              />
            </div>
          </div>
          <div className="topics-container">
            <span className="filter-title">Topics:</span>
            <div style={{ height: "32px" }}></div>
            <select
              className="form-control"
              id="filterTopic"
              name="filterTopic"
            >
              <option value="">All</option>
              {topics.map((topic, index) => (
                <option value={topic} key={index}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
          <div className="interactions-container">
            <span className="filter-title">Likes range:</span>
            <div className="interactions-form-container">
              <label className="form-label" htmlFor="filterLikesFrom">
                from
              </label>
              <input
                className="form-control"
                id="filterLikesFrom"
                type="number"
              />

              <label className="form-label" htmlFor="filterLikesTo">
                to
              </label>
              <input
                className="form-control"
                id="filterLikesTo"
                type="number"
              />
            </div>
          </div>
          <div className="interactions-container">
            <span className="filter-title">Comments range:</span>
            <div className="interactions-form-container">
              <label className="form-label" htmlFor="filterCommentsFrom">
                from
              </label>
              <input
                className="form-control"
                id="filterCommentsFrom"
                type="number"
              />

              <label className="form-label" htmlFor="filterCommentsTo">
                to
              </label>
              <input
                className="form-control"
                id="filterCommentsTo"
                type="number"
              />
            </div>
          </div>
          <div className="buttons-container">
            <div style={{ height: "17.5px" }}></div>
            <button className="btn btn-warning btn-sm" type="submit">
              Submit filters
            </button>
            <div style={{ height: "7.5px" }}></div>
            <button
              className="btn btn-danger btn-sm"
              onClick={handleFilterReset}
            >
              Reset filters
            </button>
          </div>
        </form>
      </div>

      <div className="posts-container">
        {postsUsers &&
          filteredPosts.map((post, index) => {
            return (
              <Link
                to={`/blog/${post.post_id}`}
                state={{ post: post }}
                key={index}
                className="blog-router-link"
              >
                <BlogCard post={post} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
