// This code defines a React component named `BlogDetail`, which is responsible for displaying and updating the 
// details of a blog. Here's a description of what the code does:

// 1. Imports:
//    - The code imports several dependencies, including Axios for making HTTP requests, React, and 
//      various components and hooks from Material-UI (MUI). It also imports React Router's `useNavigate` and 
//      `useParams` for handling routing.

// 2. Component Setup:
//    - The `BlogDetail` component is defined as a functional component.
//    - It uses the `useNavigate` hook to get access to the navigation function, `navigate`, which allows 
//      for programmatic navigation to different routes.
//    - It defines two pieces of state using the `useState` hook:
//      - `blog`: This state variable holds the details of the blog.
//      - `inputs`: This state variable is an object that holds the form input values (e.g., title, content, image) 
//        for updating the blog.

// 3. Event Handlers:
//    - `handleChange`: This function is used to update the `inputs` state when form input fields change. 
//      It dynamically updates the `inputs` object with the field name and value.
//    - `handleSubmit`: This function is called when the form is submitted. It prevents the default form 
//      submission behavior, sends a request to update the blog using the `sendRequest` function, and then navigates to the "/myBlogs" route upon success.

// 4. Data Fetching:
//    - `fetchDetails`: This async function uses Axios to make an HTTP GET request to fetch the details 
//      of the blog with a specific ID. It is called within the `useEffect` hook when the `id` 
//      (from the URL parameters) changes.

// 5. Lifecycle Management:
//    - The `useEffect` hook is used to trigger the fetching of blog details when the component 
//      mounts and the `id` changes. It also initializes the `inputs` state with the fetched blog's details.

// 6. Form Rendering:
//    - The component renders a form inside a `Box` element from Material-UI.
//    - The form includes input fields for the blog's title, content, and image URL. These 
//      input values are bound to the `inputs` state.
//    - There is a submit button that triggers the `handleSubmit` function when clicked.

// 7. Conditional Rendering:
//    - The form is only rendered when the `inputs` state is truthy, which implies that the 
//      blog details have been fetched and populated in the `inputs` state.

// Overall, this component is designed to display and edit the details of a blog. It fetches the 
// initial data, allows the user to make updates, and then sends those updates to the server when the form 
// is submitted. Upon successful submission, it navigates to a different route.



import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";

const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
function BlogDetail() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const fetchDetails = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_API_KEY}/blog/${id}`)
      .catch((err) => console.log(err));

    const data = res.data;
    return data;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest()
      .then((data) => console.log(data))  
      .then(() => navigate("/myBlogs"));
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data);
      setInputs({
        title: data.blog.title,
        content: data.blog.content,
        image: data.blog.image,
      });
    });
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(`${process.env.REACT_APP_API_KEY}/blog/update/${id}`, {
        title: inputs.title,
        content: inputs.content,
        image: inputs.image,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  return (
    <div>
      {inputs && (
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
      )}
    </div>
  );
}

export default BlogDetail;
