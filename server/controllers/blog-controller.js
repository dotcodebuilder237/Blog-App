// The provided code comprises a series of functions that handle blog-related operations using Mongoose, 
// an Object Data Modeling library for MongoDB. Each function is an asynchronous Express route handler 
// that deals with various CRUD (Create, Read, Update, Delete) operations for managing blogs and related user 
// data in a MongoDB database. Here's an updated description for each function:

// 1. **`getAllBlogs`**:
//    - An asynchronous Express route handler that responds to HTTP GET requests.
//    - Retrieves all blogs by using `Blog.find().populate("user")`, populating each blog document's 
//    "user" field with additional user details.
//    - Sends a JSON response with a 200 status code if blogs are found.
//    - Responds with a 404 status code and a message if no blogs are found.

// 2. **`addBlog`**:
//    - Handles HTTP POST requests for creating a new blog.
//    - Extracts the blog's title, content, image, and user ID from the request body.
//    - Attempts to find the user associated with the provided user ID and checks if the user exists.
//    - Creates a new `Blog` document and associates it with the user. This process occurs without transactions.
//    - Responds with success (200 status code) and the created blog if the operation is successful.
//    - If any errors occur during the process, responds with a 500 status code and an error message.

// 3. **`updateBlog`**:
//    - Handles HTTP PUT requests to update an existing blog.
//    - Extracts the updated title, content, and image from the request body and the blog's ID from the URL parameters.
//    - Attempts to find the blog by its ID and updates its fields with the new values.
//    - Responds with a 200 status code and the updated blog if the update is successful.
//    - If the update fails, responds with a 500 status code and an error message.

// 4. **`getBlogById`**:
//    - Handles HTTP GET requests for retrieving a specific blog by its ID.
//    - Attempts to find the blog by its ID.
//    - Responds with a 200 status code and the retrieved blog if the blog is found.
//    - Responds with a 404 status code and a message if no blog is found.

// 5. **`deleteBlog`**:
//    - Handles HTTP DELETE requests for removing a specific blog by its ID.
//    - Attempts to find the blog by its ID and remove it using `findByIdAndRemove()`. 
//      It also removes the blog reference from the associated user's `blogs` array.
//    - Responds with a 200 status code and a success message if the deletion is successful.
//    - Responds with a 500 status code and an error message if the deletion fails.

// 6. **`getUserById`**:
//    - Handles HTTP GET requests for retrieving a user and their associated blogs by user ID.
//    - Attempts to find the user by their ID, populating their `blogs` field with associated blogs.
//    - Responds with a 200 status code and the user's details and associated blogs if the user is found.
//    - Responds with a 400 status code and a message if no user is found.

// These functions perform basic CRUD operations, managing blog data and user-related operations in a
// MongoDB database with Mongoose, without using transactions.


import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getAllBlogs = async (req, res, next) => {
  let blogs;

  try {
    blogs = await Blog.find().populate("user");
  } catch (error) {
    console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blog Found!" });
  }
  return res.status(200).json({ blogs });
};


export const addBlog = async (req, res, next) => {
  const { title, content, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to Find user by this Id" });
  }

  const blog = new Blog({
    title,
    content,
    image,
    user,
  });

  try {
    const savedBlog = await blog.save();

    existingUser.blogs.push(savedBlog);
    await existingUser.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ blog });
};


export const updateBlog = async (req, res, next) => {
  const { title, content, image } = req.body;

  const blogId = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      content,
      image,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update Blog" });
  }
  return res.status(200).json({ blog });
};

export const getBlogById = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "No blog found!" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(req.params.id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};

export const getUserById = async (req, res, next) => {
  let userBlogs;
  try {
    userBlogs = await User.findById(req.params.id).populate("blogs");
  } catch (error) {
    console.log(error);
  }
  if (!userBlogs) {
    return res.status(400).json({ message: "No blogs found!" });
  }
  return res.status(200).json({ user : userBlogs });
};
