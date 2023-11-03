// This code defines a React component called `Blog` that represents a blog post or article. 
// Here's a description of what this component does:

// 1. Imports:
//    - It imports various modules and components used in the `Blog` component. These include React for 
//      building the component, several Material-UI components for styling and layout, icons, the `useNavigate` 
//      hook from `react-router-dom` for handling navigation, and Axios for making HTTP requests.

// 2. Component Definition:
//    - The `Blog` component is a functional component that takes several props: `title`, `content`, `image`, 
//    `userName`, `isUser`, and `id`. These props are used to customize and display the content of a blog post.

// 3. Navigation:
//    - The `useNavigate` hook is used to obtain the navigation function `navigate`, which allows for 
//      programmatically navigating to different routes within the application.
//    - When the "Edit" button is clicked, the `handleEdit` function is called, which navigates the user 
//      to a specific blog post's editing page using the `id` prop.

// 4. Delete Request:
//    - The `deleteRequest` function is an asynchronous function that sends an HTTP DELETE request to a 
//      specified URL to delete a blog post. It uses the Axios library for making the request.
//    - If the deletion request is successful, the function returns the data from the response.
//    - If there is an error, it is caught and logged to the console.

// 5. Handling Deletion:
//    - The `handleDelete` function is called when the "Delete" button is clicked. It initiates the 
//      deletion of the blog post by calling `deleteRequest()`. After successful deletion, it navigates the 
//      user back to the home page ("/").

// 6. Rendering:
//    - The `return` statement renders the blog post as a Material-UI `Card` component, with various 
//      sections for the title, content, user information, and buttons.
//    - The appearance of the card is customized using styles defined within the `sx` prop.
//    - If the `isUser` prop is `true`, the component displays "Edit" and "Delete" buttons using 
//      Material-UI `IconButton` components.
//    - The user's avatar is displayed using an `Avatar` component.
//    - The content of the blog post, including the title and text, is rendered inside the card.

// This `Blog` component is designed to display a blog post, allowing users to edit or delete their 
// own posts if they have the appropriate permissions. It integrates with routing for navigation and handles 
// HTTP requests for deleting a blog post.



import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Avatar,
  CardContent,
  CardHeader,
  Typography,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import {
  DeleteForeverOutlined,
  ModeEditOutlineOutlined,
} from "@mui/icons-material";
import axios from "axios";

const Blog = ({ title, content, image, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = (event) => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`${process.env.REACT_APP_API_KEY}/blog/${id}`)
      .catch((err) => console.log(err));

    const data = res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest().then(() => navigate("/"));
  };

  return (
    <div>
      <Card
        sx={{
          width: "50%",
          margin: "auto",
          marginTop: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": { boxShadow: "10px 10px 20px #ccc" },
        }}
      >
        {isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineOutlined color="info" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverOutlined color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName && userName.charAt(0)}
            </Avatar>
          }
          title={title}
          subheader=""
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b> {": "}
            {content}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
