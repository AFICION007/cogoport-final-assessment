import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import BlogPost from "../helpers/BlogPost";
import topics from "../topics";
import "./css/HomePage.css";

// import blogs from "../homepageBlogs";

const HomePage = () => {
  // const [posts, setPosts] = useState([...blogs]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/posts");
        if (!response.ok) {
          throw new Error("Network was not able to send response");
        }
        const jsonData = await response.json();
        if (isMounted) {
          setPosts(jsonData); // Update the state only if the component is still mounted
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

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

  const filteredPosts = posts.filter(
    ({
      title,
      topic,
      text,
      user_name: author,
      post_date,
      number_likes,
      number_comm,
    }) => {
      const isMatchingSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.toLowerCase().includes(searchQuery.toLowerCase());

      const isMatchingFilter =
        (!filters.fromDate ||
          new Date(post_date) >= new Date(filters.fromDate)) &&
        (!filters.toDate || new Date(post_date) <= new Date(filters.toDate)) &&
        (!filters.topic || filters.topic === topic) &&
        (!filters.likesFrom || number_likes >= filters.likesFrom) &&
        (!filters.likesTo || number_likes <= filters.likesTo) &&
        (!filters.commentsFrom || number_comm >= filters.commentsFrom) &&
        (!filters.commentsTo || number_comm <= filters.commentsTo);

      return isMatchingSearch && isMatchingFilter;
    }
  );

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
          <Link className="blog-router-link" to="/register">
            <div className="user-actions">Register</div>
          </Link>
          <Link className="blog-router-link" to="/login">
            <div className="user-actions">Sign In</div>
          </Link>
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
        {filteredPosts.map((blog, index) => {
          return (
            <Link
              className="blog-router-link"
              to="/blog-page"
              state={{ blog: blog }}
              key={index}
            >
              <BlogPost blog={blog} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
