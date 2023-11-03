// This code defines a set of functions for handling user-related operations in a Node.js application using Express 
// and a MongoDB database. Here's a description of each function:

// 1. `getAllUser`:
//    - This function is an Express route handler for retrieving all users.
//    - It uses an `async` function that fetches user data from the database using the `User` model's `find` method.
//    - If an error occurs during the database query, it's logged to the console.
//    - If no users are found, it returns a 404 status code and a JSON response with a "No User Found" message.
//    - If users are found, it returns a 200 status code and a JSON response containing the retrieved user data.

// 2. `signUp`:
//    - This function handles user registration.
//    - It extracts the `name`, `email`, and `password` from the request body.
//    - It checks if a user with the same email already exists by querying the database using the `User` model's `findOne` method.
//    - If an existing user is found, it returns a 400 status code and a JSON response with a "User Already exists! Login Instead" message.
//    - If the user doesn't already exist, it hashes the password using `bcrypt.hashSync` for security and creates a new `User` document.
//    - The new user is saved to the database using `await user.save()`.
//    - If an error occurs during the registration process, it's logged to the console.
//    - If the registration is successful, it returns a 201 status code and a JSON response containing the newly created user.

// 3. `signIn`:
//    - This function handles user login.
//    - It extracts the `email` and `password` from the request body.
//    - It checks if a user with the provided email exists in the database by querying using `User.findOne`.
//    - If no user is found, it returns a 404 status code and a JSON response with a "User Not Found! Register First" message.
//    - If a user is found, it compares the provided password with the stored, hashed password using `bcrypt.compareSync`.
//    - If the password is incorrect, it returns a 400 status code and a JSON response with an "Incorrect Password!" message.
//    - If the password is correct, it returns a 200 status code and a JSON response with a "Login Successful!!!" message and the user's data.

// In summary, these functions are responsible for user management, including retrieving all users, user registration, 
// and user login. They interact with a MongoDB database and provide appropriate responses based on the success or failure 
// of these operations. Error handling is in place to log errors to the console when necessary.


import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No User Found" });
  }
  return res.status(200).json({ users });
};

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already exists! Login Instead" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }

  return res.status(201).json({ user });
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User Not Found! Register First" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password!" });
  }
  return res
    .status(200)
    .json({ message: "Login Successful!!!", user: existingUser });
};
