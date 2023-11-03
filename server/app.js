// This code sets up a Node.js application using the Express framework to create a web server. 
// The application also connects to a MongoDB database and includes routes for handling user and b
// log-related operations. Here's a description of the code:

// 1. Importing Dependencies:
//    - The code imports several Node.js modules and packages using ES6 `import` statements. 
//      These include `express` for creating the web server, `mongoose` for interacting with MongoDB, 
//      `dotenv` for managing environment variables, `blogRouter` and `router` for defining routes, 
//      and `cors` for enabling Cross-Origin Resource Sharing.

// 2. Configuration:
//    - `dotenv.config()` is used to load environment variables from a .env file, allowing 
//      configuration settings to be stored securely.

// 3. Express Application Setup:
//    - An Express application instance is created and stored in the `app` variable.

// 4. Middleware:
//    - The code sets up middleware for the Express application. It uses `cors()` to enable 
//      cross-origin resource sharing, allowing the application to respond to requests from different domains. 
//      It also uses `express.json()` to parse incoming JSON data and `express.urlencoded()` to parse URL-encoded data.

// 5. Routing:
//    - The code defines two sets of routes:
//      - `/api/user`: This route is handled by the `router` imported from "user-routes.js".
//      - `/api/blog`: This route is handled by the `blogRouter` imported from "blog-routes.js".

// 6. Port Configuration:
//    - The `PORT` variable is set to the value of the environment variable `process.env.PORT` if available. 
//    If not, it defaults to port 8000.

// 7. Database Connection:
//    - The code connects to a MongoDB database using Mongoose. The `mongoose.connect()` 
//      method is called with the MongoDB connection string as an argument. In this case, the connection string 
//      specifies the host as "DESKTOP-LT74OGR" and the port as 27017. This code assumes a MongoDB server is running on that host and port.
//    - If the database connection is successful, the server is started using `app.listen(PORT)`.
//    - A success message is printed to the console indicating that the application has connected to the 
//      database and is listening on the specified port.
//    - If an error occurs during the database connection, the error is caught and logged to the console.

// In summary, this code sets up a Node.js application using Express, configures routes for handling user 
// and blog-related operations, connects to a MongoDB database, and listens for incoming requests on a 
// specified port, with CORS support enabled for cross-origin requests.



import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", router);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 8000;

mongoose
  .connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT))
  .then(() =>
    console.log(`Connected To Database and listening at PORT ${PORT}`)
  )
  .catch((err) => console.log(err));
