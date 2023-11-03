// This code is for the frontend of a React-based web application. Here's a description of what it does:

// 1. Imports:
//    - It imports the necessary modules and components for building the React application. Notable imports 
//      include React and ReactDOM for rendering, the main `App` component, and various libraries for routing 
//      and state management.

// 2. Setting Up the Root Element:
//    - It uses `ReactDOM.createRoot` to create a root element where the entire React application will be mounted. 
//      The root element is typically an HTML element with the ID of "root" in the DOM, and it is retrieved using 
//      `document.getElementById("root")`.

// 3. Rendering the Application:
//    - Inside the `root.render()` method, the application is rendered using JSX (JavaScript XML). 
//      Here's what's happening within the render function:
//      - `<React.StrictMode>`: This is a wrapper component provided by React that helps identify potential 
//        issues in the application during development. It doesn't render any visible UI but activates checks and warnings.
//      - `<BrowserRouter>`: This component is from the `react-router-dom` library and is used for client-side routing. 
//        It allows the application to handle routing and navigation, ensuring that the appropriate components are displayed based on the URL.
//      - `<Provider store={store}>`: This component is from a state management library (likely Redux). It wraps the 
//        application and provides access to the application's state through the `store` variable. It's used to connect 
//        the application to a centralized state management system.
//      - `<App />`: This is the main application component. It represents the root of the application's UI structure.

// By nesting these components within each other, the code sets up the application structure with routing 
// capabilities and state management provided by Redux. This allows the application to render the appropriate 
// components based on the URL and to manage its state efficiently. The entire application is mounted in the DOM 
// within the specified "root" element.


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
