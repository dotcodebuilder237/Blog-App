// This code defines a set of routes for user-related operations within an Express application. 
// It uses a separate controller file to handle these routes. Here's a description of the code:

// 1. Importing Dependencies:
//    - The code imports the `express` module to create an instance of an Express Router and imports specific 
//      functions (`getAllUser`, `signUp`, and `signIn`) from a "user-controller.js" file to handle the route actions.

// 2. Express Router Setup:
//    - A new Express Router is created and assigned to the `router` variable. Routers allow you to group 
//      related routes and middleware together.

// 3. Route Definitions:
//    - Three routes are defined within this router:
//      - `GET /`: This route handles the HTTP GET request at the root path. It's associated with the `getAllUser` 
//        function, which is likely responsible for retrieving a list of all users.
//      - `POST /signup`: This route handles the HTTP POST request at the "/signup" path. It's associated with 
//        the `signUp` function, which is responsible for user registration or sign-up.
//      - `POST /signin`: This route handles the HTTP POST request at the "/signin" path. It's associated with 
//        the `signIn` function, which is likely responsible for user login or sign-in.

// 4. Exporting the Router:
//    - The `router` instance, which contains the defined routes, is exported as the default export of this module, 
//      making it available for use in other parts of the application.

// In summary, this code sets up an Express Router to handle user-related routes, including retrieving all users, 
// user registration, and user login. These routes are associated with corresponding controller functions defined in 
// the "user-controller.js" file, which handle the business logic for these operations.


import express from "express";
import { getAllUser, signUp, signIn } from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
