// This code represents a React component that fetches and displays a user's blogs from a server and is 
// intended for use in a web application. Here's a description of what it does:

// 1. Imports:
//    - It imports the necessary modules and components for building a React application. These include React, 
//      `useEffect`, and `useState` from React, and `axios` for making HTTP requests. It also imports the `Blog` component from a local file.

// 2. Function Component `UserBlogs`:
//    - `UserBlogs` is a functional component responsible for displaying a user's blogs.
//    - It initializes a piece of state called `user` using the `useState` hook. This state variable will 
//      hold the user's data, and it's initially set to `undefined`.
//    - It retrieves the user's ID from the browser's local storage using `localStorage.getItem("userId")` 
//      and stores it in the `id` variable.

// 3. `sendRequest` Function:
//    - `sendRequest` is an asynchronous function that makes an HTTP GET request to the server to 
//      fetch the user's blogs.
//    - It uses the `axios` library to send the request to the URL `${process.env.REACT_APP_API_KEY}/blog/user/${id}` 
//      where `${id}` is the user's ID.
//    - It catches any errors that occur during the request and logs them to the console.
//    - If the request is successful, it extracts the data from the response and returns it.

// 4. `useEffect` Hook:
//    - The `useEffect` hook is used to control side effects in the component. In this case, it's set up 
//      to run once (due to the empty dependency array `[]`) when the component is mounted.
//    - Inside the `useEffect`, it calls the `sendRequest` function and, upon receiving the data, it sets the 
//      `user` state with the user's blog data.

// 5. Rendering:
//    - The component's return statement includes JSX to render the user's blogs. It first checks if `user` 
//      exists and contains a `blogs` array before mapping over the blogs to render each one.
//    - For each blog, it renders the `Blog` component and passes relevant data such as the blog's ID, 
//      user information, title, content, and image.

// This component is designed to fetch and display a user's blogs and should be used as part of a larger 
// application that uses React for rendering and Axios for making HTTP requests. The user's blogs are retrieved 
// from the server and displayed using the `Blog` component.



import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

function UserBlogs() {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_API_KEY}/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);


  return (
    <div>
      {" "}
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            content={blog.content}
            image={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
}

export default UserBlogs;
