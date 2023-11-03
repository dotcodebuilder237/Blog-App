// This code represents the main application component in a React-based web application. Here's a description of what this code does:

// 1. Imports:
//    - The code imports necessary components and libraries, including styles from "App.css," individual components like 
//      `Header`, `Auth`, `Blogs`, `UserBlogs`, `BlogDetail`, and `AddBlog`. It also imports modules and functions from 
//       various React libraries, such as `useEffect`, `Route`, `Routes`, `useDispatch`, and `useSelector` for state management, 
//       and actions from `authActions`.

// 2. Functional Component:
//    - The code defines a functional component named `App`, which represents the main structure of the web application.

// 3. State Management:
//    - The component uses the `useDispatch` and `useSelector` hooks from Redux for state management.
//    - It dispatches the `signin` action from `authActions` if a user's ID is found in `localStorage`. 
//      This action likely updates the application's state to indicate that a user is logged in.

// 4. Component Structure:
//    - The component returns JSX that defines the structure of the application:
//      - `<Header>`: This component represents the application's header. It is included at the top of 
//        the page and may contain navigation links or other header content.
//      - `<main>`: This section contains the main content of the application.
//      - `<Routes>`: This is a part of the `react-router-dom` library and is used for defining the application's 
//        routes and specifying which components to render based on the URL path.
//      - The routing logic within `<Routes>` is conditionally set based on the `isLoggedIn` state:
//        - If the user is not logged in (`!isLoggedIn`):
//          - The application renders an `<Auth>` component for authentication, and it also renders a `<Blogs>` component for displaying a list of blogs.
//        - If the user is logged in:
//          - The application renders a `<Blogs>` component for displaying a list of blogs, an `<AddBlog>` component for adding a 
//            new blog, a `<UserBlogs>` component for showing the user's own blogs, and a `<BlogDetail>` component for viewing a specific blog in detail.

// In summary, this code defines the main structure of a React application, handles routing based on user authentication 
// status, and dispatches a sign-in action if a user's ID is found in local storage. It uses React Router for managing 
// routes and Redux for state management, allowing the application to show different components based on the user's authentication status and URL path.


import "./App.css";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.signin());
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header>
        <Header />
      </Header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Blogs />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
