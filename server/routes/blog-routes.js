// This code defines a set of routes related to blogs within an Express application. 
// Here's a description of the code:

// 1. Importing Dependencies:
//    - The code imports the necessary modules using ES6 `import` statements. It imports the `express` module 
//    for creating a router and several functions from the "blog-controller.js" file. These functions likely handle 
//    various CRUD (Create, Read, Update, Delete) operations for blogs, including getting all blogs, adding a new blog, 
//    updating a blog, getting a blog by its ID, deleting a blog, and getting user information by user ID.

// 2. Express Router Setup:
//    - The code creates a new Express router by calling `express.Router()`. This router is named `blogRouter` and 
//    will be used to define routes specific to blog-related operations.

// 3. Route Definitions:
//    - The code defines the following HTTP routes and associates them with the corresponding controller functions:
//      - `GET /`: This route calls the `getAllBlogs` function when a GET request is made to the root path ("/"). 
//      It is used to retrieve a list of all blogs.
//      - `POST /add`: When a POST request is made to "/add," the `addBlog` function is invoked. This route is 
//      typically used to add a new blog.
//      - `PUT /update/:id`: This route expects a PUT request with a blog ID parameter in the URL. It calls the 
//      `updateBlog` function to update a specific blog by its ID.
//      - `GET /:id`: This route is designed to retrieve a single blog by its ID. It calls the `getBlogById` 
//      function when a GET request is made with an ID parameter in the URL.
//      - `DELETE /:id`: When a DELETE request is made with an ID parameter in the URL, the `deleteBlog` function 
//      is called to delete a specific blog.
//      - `GET /user/:id`: This route likely retrieves user information based on a user ID and calls the 
//      `getUserById` function. The exact functionality would depend on the implementation of the `getUserById` function.

// 4. Export:
//    - The `blogRouter` object is exported as the default export from this module, allowing it to be used in 
//    other parts of the application.

// In summary, this code sets up a router specifically for handling blog-related routes in an Express application. 
// It defines routes for CRUD operations on blogs and delegates the actual logic to the controller functions.

import express from "express";
import {
  getAllBlogs,
  addBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
  getUserById,
} from "../controllers/blog-controller.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getUserById);

export default blogRouter;
