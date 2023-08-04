import React, { useState, useEffect } from "react";
import BlogPost from "../helpers/BlogPost";
import "./css/HomePage.css";

const topics = ["JavaScript", "CSS", "React", "Node.js"];

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  // ([
  //   {
  //     title: "Getting Started with JavaScript",
  //     topic: "JavaScript",
  //     text: "JavaScript is a powerful scripting language...",
  //     author: "John Doe",
  //     postdate: "2023-08-04",
  //     number_of_likes: 10,
  //     number_of_comments: 5,
  //   },
  //   {
  //     title: "The Beauty of CSS Flexbox",
  //     topic: "CSS",
  //     text: "Flexbox is a layout model that allows...",
  //     author: "Jane Smith",
  //     postdate: "2023-08-03",
  //     number_of_likes: 20,
  //     number_of_comments: 8,
  //   },
  //   {
  //     title: "Using React Hooks",
  //     topic: "React",
  //     text: "React hooks are a great addition to React...",
  //     author: "Alice Johnson",
  //     postdate: "2023-08-23",
  //     number_of_likes: 5,
  //     number_of_comments: 2,
  //   },
  //   {
  //     title: "Learning Node.js",
  //     topic: "Node.js",
  //     text: "Node.js is a server-side JavaScript runtime...",
  //     author: "Robert Brown",
  //     postdate: "2023-09-13",
  //     number_of_likes: 15,
  //     number_of_comments: 3,
  //   },
  // ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const jsonData = await response.json();
        setPosts(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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
      author,
      postdate,
      number_of_likes,
      number_of_comments,
    }) => {
      const isMatchingSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.toLowerCase().includes(searchQuery.toLowerCase());

      const isMatchingFilter =
        (!filters.fromDate ||
          new Date(postdate) >= new Date(filters.fromDate)) &&
        (!filters.toDate || new Date(postdate) <= new Date(filters.toDate)) &&
        (!filters.topic || filters.topic === topic) &&
        (!filters.likesFrom || number_of_likes >= filters.likesFrom) &&
        (!filters.likesTo || number_of_likes <= filters.likesTo) &&
        (!filters.commentsFrom || number_of_comments >= filters.commentsFrom) &&
        (!filters.commentsTo || number_of_comments <= filters.commentsTo);

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
        {filteredPosts.map(({ title, topic, text }) => {
          return <BlogPost title={title} topic={topic} text={text} />;
        })}
      </div>
    </div>
  );
};

export default HomePage;
