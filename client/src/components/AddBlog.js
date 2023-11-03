// This code defines a React component for adding a new blog post. Here's a description of what this code does:

// 1. **Imports**:
//    - The code imports necessary modules and components for building a React application. Notable imports include 
//      `useState` for managing component state, `useNavigate` from `react-router-dom` for handling navigation, 
//      `axios` for making HTTP requests, and various components from the Material-UI library.

// 2. **Styling Constants**:
//    - It defines a `labelStyle` constant to specify styles for labels in the form, including margins, 
//      font size, and font weight.

// 3. **Component Function**:
//    - The `AddBlog` function is a React component that represents the add blog form.
//    - It initializes a `navigate` function using `useNavigate` to enable navigation when the form is submitted.
//    - It sets up component-level state using the `useState` hook. The `inputs` state contains fields for the blog's 
//      title, content, and image, with initial empty values.

// 4. **`handleChange` Function**:
//    - This function handles input changes. When a user types in an input field, it updates the respective field in 
//      the `inputs` state. It uses the spread operator to merge the previous state with the new value.

// 5. **`sendRequest` Function**:
//    - This asynchronous function is responsible for making an HTTP POST request to add a new blog. It 
//      sends a request to "${process.env.REACT_APP_API_KEY}/blog/add" with the blog's title, content, image, 
//      and the user's ID (retrieved from the `localStorage`).
//    - If the request is successful, it returns the response data. If there's an error, it logs the error to the console.

// 6. **`handleSubmit` Function**:
//    - This function is called when the form is submitted. It prevents the default form submission behavior.
//    - It calls the `sendRequest` function to add the blog, and if the operation is successful, it logs 
//      the response data to the console and navigates to the home page ("/").

// 7. **Return JSX**:
//    - The component returns JSX to render the add blog form.
//    - The form includes a Material-UI `Box` component to style it, with a title, and three input fields 
//      for the blog's title, content, and image URL.
//    - A "Submit Blog" button is included at the bottom of the form.

// Overall, this component is used for adding new blog posts. Users can enter a title, content, and image URL, 
// and upon submission, the data is sent to a backend API for storage, and the user is redirected to the home 
// page. It provides a clean and organized form interface for creating new blog posts.



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";

const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const sendRequest = async (type = "signin") => {
    const res = await axios
      .post(`${process.env.REACT_APP_API_KEY}/blog/add`, {
        title: inputs.title,
        content: inputs.content,
        image: inputs.image,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={2}
          borderColor="secondary.main"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={5}
          display="flex"
          flexDirection={"column"}
          width={"70%"}
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color="blue"
            variant="h3"
            textAlign={"center"}
          >
            Create Blog
          </Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="normal"
            variant="outlined"
          />
          <InputLabel sx={labelStyle}>Content</InputLabel>
          <TextField
            name="content"
            onChange={handleChange}
            value={inputs.content}
            margin="normal"
            variant="outlined"
          />
          <InputLabel sx={labelStyle}>ImageURL</InputLabel>
          <TextField
            name="image"
            onChange={handleChange}
            value={inputs.image}
            margin="normal"
            variant="outlined"
          />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit Blog
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
