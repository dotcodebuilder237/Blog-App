// This code is responsible for setting up Redux state management for a React application using the Redux Toolkit. 
// Here's a description of what it does:

// 1. Imports:
//    - It imports necessary modules and functions from the `@reduxjs/toolkit` library for setting up Redux, including 
//      `configureStore` and `createSlice`.

// 2. Creating a Redux Slice:
//    - It defines a Redux slice using the `createSlice` function. This slice is intended for managing 
//      authentication-related state.
//      - `name`: The slice is given the name "auth".
//      - `initialState`: The initial state of the slice is defined with an object containing a single property, 
//        `isLoggedIn`, which is initially set to `false`.
//      - `reducers`: This object contains functions that specify how the state can be updated.
//        - `signin(state)`: This function updates the `isLoggedIn` property in the state to `true`.
//        - `logout(state)`: This function removes an item from the browser's local storage and sets `isLoggedIn` 
//          to `false`.

// 3. Exporting Redux Actions:
//    - The `authActions` object is created, containing the actions generated by the `createSlice` function. In this 
//      case, it includes the `signin` and `logout` actions, which can be dispatched to update the state.

// 4. Creating the Redux Store:
//    - The Redux store is created using the `configureStore` function. It takes an object with a `reducer` property.
//    - The `reducer` is set to the `authSlice.reducer`, which is the reducer generated by the `createSlice` function. 
//      This reducer manages the state updates based on the defined actions.

// By following this code structure, the application can use Redux to manage the authentication state. The `signin` 
// and `logout` actions allow components to change the `isLoggedIn` state property in the Redux store, and these changes 
// will trigger updates in components connected to the Redux store. This centralizes the authentication state management 
// and allows for efficient state updates throughout the application.


import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSclice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    signin(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId");
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSclice.actions;

export const store = configureStore({
  reducer: authSclice.reducer,
});
