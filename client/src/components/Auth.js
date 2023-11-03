// This code represents a React component that handles user authentication. It includes UI elements for signing in 
// and signing up, interacts with a backend server, and uses Redux for state management. Here's a description of what 
// this code does:

// 1. Imports:
//    - The code begins by importing various dependencies such as React, useState, Material-UI components 
//      (Box, Button, TextField, Typography), Axios for making HTTP requests, Redux's `useDispatch`, and `useNavigate` 
//      from `react-router-dom`.

// 2. Component Definition:
//    - The `Auth` component is defined, which represents a user authentication form.

// 3. State Management:
//    - It uses the `useState` hook to manage component-level state.
//      - `inputs`: This state variable is an object containing the user's name, email, and password.
//      - `isSignup`: A boolean state variable that determines whether the user is signing up or signing in.

// 4. Event Handlers:
//    - `handleChange`: This function is called when the user types into the input fields, and it updates the 
//      `inputs` state accordingly.
//    - `handleSubmit`: This function handles form submission. Depending on whether the user is signing up or 
//      signing in, it sends a request to the server using Axios to create a new user account or sign in an existing user.
//    - It then stores the user's ID in local storage, dispatches a Redux action to signify successful sign-in, 
//      and navigates the user to a different route.

// 5. Rendering:
//    - Inside the `return` statement, a form is rendered with Material-UI components.
//    - The form includes input fields for name (if signing up), email, and password.
//    - The "Sign In" or "Sign Up" button is displayed, depending on the `isSignup` state.
//    - The "have an Account? Sign In" or "New User? Register Now" button allows users to switch 
//      between signing in and signing up.

// 6. Material-UI Styling:
//    - Material-UI components are used to structure and style the form. It includes elements for alignment, 
//      padding, margins, and a box shadow for visual appeal.

// 7. Usage of Redux and Routing:
//    - The `dispatch` function is used to dispatch actions to the Redux store. It dispatches an action to 
//      indicate successful sign-in.
//    - The `useNavigate` hook from `react-router-dom` is used to programmatically navigate to different 
//      routes after authentication.

// In summary, this code defines a React component that handles user authentication. It allows users to sign 
// in or sign up, communicates with a backend server, and uses Redux for state management. It also leverages 
// Material-UI for styling and user interface elements.


import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const sendRequest = async (type = "signin") => {
    const res = await axios
      .post(`${process.env.REACT_APP_API_KEY}/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => {
          dispatch(authActions.signin());
        })
        .then(() => {
          navigate("/");
        })
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => {
          dispatch(authActions.signin());
        })
        .then(() => {
          navigate("/");
        })
        .then((data) => console.log(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={10}
        >
          <Typography variant="h3" padding={3} textAlign="center">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              placeholder="Name"
              value={inputs.name}
              margin="normal"
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            type={"email"}
            value={inputs.email}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            type={"password"}
            value={inputs.password}
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            // sx={{ borderRadius: 3, marginTop: 3 }}
            color="primary"
          >
            {isSignup ? "Create Account" : "Sign In"}
          </Button>
          <br/>
          <Typography textAlign="center">
          
          {isSignup ? "have an Account? Sign In" : "New User?"}
          </Typography>          
          <Button
            onClick={() => setIsSignup(!isSignup)}
            variant="contained"
            // sx={{ borderRadius: 3, marginTop: 2 }}
            color="primary"
          >
            {isSignup ? "Sign In" : "Register Now"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
