// This code is a React component responsible for rendering a list of blogs fetched from a backend server. 
// Here's a description of what it does:

// 1. Imports:
//    - The code imports the necessary modules and components for building the React application, including 
//      React itself, `useEffect` and `useState` from React for managing component state, `axios` for making 
//      HTTP requests, and a `Blog` component, presumably used to display individual blog items.

// 2. Functional Component `Blogs`:
//    - The `Blogs` component is defined as a functional component.

// 3. State Management:
//    - Inside the `Blogs` component, state is managed using the `useState` hook. The `blogs` state is initialized 
//      with `useState()`, which initially has no value (`undefined`).
   
// 4. `sendRequest` Function:
//    - This function is defined to make an asynchronous HTTP GET request to a specific URL, likely an API 
//      endpoint that provides a list of blogs.
//    - It uses the `axios` library to make the request.
//    - If an error occurs during the request, it's caught and logged to the console.

// 5. `useEffect` Hook:
//    - The `useEffect` hook is used to manage side effects in the component.
//    - It's set up to run only once when the component mounts (empty dependency array `[]`).
//    - Inside the `useEffect`, the `sendRequest` function is called, and when the response is received, it sets the 
//     `blogs` state with the data from the response.

// 6. Rendering:
//    - The component returns JSX to render the list of blogs.
//    - It first checks if the `blogs` state has data. If `blogs` is not `undefined` 
//      (i.e., data has been fetched and set in the state), it maps over the blogs using `.map()` 
//      and generates a `Blog` component for each blog item.
//    - The `Blog` component receives various props, including an ID, user information, title, content, 
//      and image for rendering each blog.
//    - The condition `{localStorage.getItem("userId") === blog.user._id}` is used to determine whether 
//      the currently logged-in user is the owner of the blog item. This condition is used to control the display 
//      of certain features or actions specific to the blog owner.

// 7. Export:
//    - The `Blogs` component is exported as the default export of this module, making it available for use 
//      in other parts of the application.

// In summary, this code defines a React component that fetches a list of blogs from a server using an 
// HTTP request, stores them in state, and renders the blogs using the `Blog` component. It also checks 
// whether the currently logged-in user is the owner of each blog and adjusts the rendering accordingly.


import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

function Blogs() {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_API_KEY}/blog`)
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
 
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            content={blog.content}
            image={blog.image}
            userName={blog.user.name}
          />
        ))}
    </div>
  );
}

export default Blogs;
