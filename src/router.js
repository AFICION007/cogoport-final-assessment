import { createBrowserRouter } from "react-router-dom";

import Persona from "./components/Persona";
import Register from "./components/Register";
import Login from "./components/Login";
import AddPost from "./components/AddPost";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Edit from "./components/Edit";
import Profile from "./components/Profile";

const router = createBrowserRouter([
  { path: "/", element: <Persona /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/addpost", element: <AddPost /> },
  { path: "/home", element: <Home /> },
  { path: "/blog/:post_id", element: <Blog /> },
  { path: "/edit/:post_id", element: <Edit /> },
  { path: "/profile/:user_id", element: <Profile /> },
]);

export default router;
