// This code defines a React functional component for the header of a web application. 
// Here's a description of what it does:

// 1. Imports:
//    - It imports various components and hooks from React, Material-UI (MUI), and React-Redux. 
//      These components and hooks are used to build the header and manage its behavior.

// 2. Function `Header`:
//    - This is a React functional component that represents the application's header.
//    - It uses the `useState` hook to manage the `value` state, which is used for controlling the active tab.
//    - The `useDispatch` and `useSelector` hooks are used to interact with the Redux store. The `dispatch` 
//      function is used to dispatch actions, and `useSelector` is used to access the state stored in the Redux store.

// 3. Header Layout:
//    - The header is contained within an `<AppBar>` component from MUI, which provides a stylized top bar.
//    - The header has a background style defined with a linear gradient using MUI's styling system (`sx` property).

// 4. Inside the Header:
//    - A `<Toolbar>` component contains the content of the header.
//    - A `<Typography>` component with a link to the home page ("/") is used as the application title, "My Blog."

// 5. Conditional Rendering:
//    - Depending on the user's authentication status (`isLoggedIn`), different components and buttons are 
//      displayed in the header.
//    - If the user is logged in, a set of `<Tab>` components is displayed, providing navigation links to 
//      "All Blogs," "My Blogs," and "Create Blogs."
//    - If the user is not logged in, "Sign In" and "Sign Up" buttons are displayed, both linking to the 
//      authentication page.
//    - If the user is logged in, a "Log Out" button is displayed, which dispatches a logout action when clicked.

// 6. Routing:
//    - The `LinkComponent` property is used to specify that the tabs and buttons should use the `<Link>` 
//      component from `react-router-dom` for navigation. This ensures that the application's routing system 
//      is used to navigate between different pages.

// In summary, this component creates a dynamic header for a web application. It adjusts its content and 
// appearance based on the user's authentication status and uses Material-UI components for styling. It also 
// handles navigation by utilizing the `Link` component for routing.



import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#040720",
      }}
    >
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          variant="h4"
          style={{ textDecoration: "none", color: 'white'}}
        >
          BlogApp
        </Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"}>
            <Tabs
              textColor="green"
              value={value}
              onChange={(event, val) => setValue(val)}
            >
              <Tab LinkComponent={Link} to="/" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs " />
              <Tab LinkComponent={Link} to="/blogs/add" label="Create Blogs " />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
              >
                Sign In
              </Button>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
              >
                Sign Up
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
            >
              Log Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
