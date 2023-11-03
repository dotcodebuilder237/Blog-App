// This code defines a Mongoose schema for a User in a MongoDB database. It specifies the structure of user 
// documents and their validation rules. Here's a description of the code:

// 1. Importing Mongoose:
//    - The code imports the Mongoose library, which is a popular ODM (Object-Document Mapping) tool for 
//      working with MongoDB in Node.js.

// 2. Defining a User Schema:
//    - The `Schema` class from Mongoose is used to define a schema for the User model. This schema specifies 
//      the structure and constraints for user documents in the MongoDB collection.

// 3. User Schema Fields:
//    - The schema defines the following fields for a user:
//      - `name`: A user's name, which is a string and is required (must be provided).
//      - `email`: A user's email address, which is a string, required, and unique (no two users can have the 
//         same email address).
//      - `password`: A user's password, which is a string, required, and must have a minimum length of 6 characters.
//      - `blogs`: An array of references to `Blog` documents. This establishes a relationship between users and 
//        their associated blog posts.

// 4. Exporting the User Model:
//    - The code exports the Mongoose model for the User. The `mongoose.model` function is used to create a 
//      model named "User" based on the `userSchema` defined earlier. This model can be used to perform CRUD 
//      (Create, Read, Update, Delete) operations on user documents in the MongoDB collection.

// In summary, this code defines a Mongoose schema for a User, specifying the structure and constraints for 
// user documents. It establishes a relationship between users and their associated blog posts using an array 
// of references. The User model is then exported for use in other parts of the application to interact with the 
// MongoDB database.


import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
      required: true,
    }
  ],
});

export default mongoose.model("User", userSchema);
