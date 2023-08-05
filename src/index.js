import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import BlogPage from "./components/BlogPage";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import EditPage from "./components/EditPage";
import AddBlog from "./components/AddBlog";
import PersonaPage from "./components/PersonaPage";
import SignInForm from "./components/SignInForm";
import RegisterForm from "./components/RegisterForm";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/home", element: <PersonaPage /> },
  { path: "/login", element: <SignInForm /> },
  { path: "/register", element: <RegisterForm /> },
  { path: "/blog-page", element: <BlogPage /> },
  { path: "/add-blog", element: <AddBlog /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/edit-page", element: <EditPage /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
// root.render(<PersonaPage />);
