// This code defines a Mongoose schema for a "Blog" and exports a Mongoose model based on that schema. 
// Here's a description of the code:

// 1. Importing Mongoose:
//    - The code imports the `mongoose` library, which is a popular Node.js package for working with MongoDB databases.

// 2. Schema Definition:
//    - A Mongoose schema is defined for a "Blog" using the `mongoose.Schema` constructor. The schema defines 
//      the structure of documents that will be stored in the MongoDB collection associated with this model.

// 3. Field Definitions:
//    - Within the `blogSchema`, several fields are defined:
//      - `title`: A string field that is required. It represents the title of the blog post.
//      - `content`: A string field that is required. It represents the content or text of the blog post.
//      - `image`: A string field that is required. It represents the URL or file path to an image associated 
//        with the blog post.
//      - `user`: An object ID field that references a "User" model (presumably defined elsewhere). 
//        This field is required and establishes a relationship between a blog post and the user who created it.

// 4. Exporting the Model:
//    - The code exports a Mongoose model named "Blog" using the `mongoose.model()` function. This model 
//      is created based on the "blogSchema" defined earlier. The "Blog" model can be used to interact with the 
//      MongoDB collection that stores blog documents. It allows for CRUD (Create, Read, Update, Delete) operations 
//      on blog posts in the database.

// In summary, this code defines a Mongoose schema for a "Blog" entity, specifying the fields and their 
// characteristics, and then exports a Mongoose model based on that schema. This model can be used to perform database 
// operations related to blog posts, such as creating, reading, updating, and deleting them in a MongoDB database.


import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Blog", blogSchema);
