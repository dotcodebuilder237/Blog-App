# Short vistit to my Project

#### `client` - Holds the client application

- #### `public` - This holds all of our static files
- #### `src`
  - #### `components`
  - #### `store`
  - #### `App.js`
  - #### `index.js`
- #### `package.json`

#### `server` - Holds the server application

- #### `.env`
- #### `controllers`
- #### `models`
- #### `routes`
- #### `app.js`

#### `package.json`

#### `.gitignore`

#### `README` - This file!

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Create Environment variable i.e .env file and asign following variables.

REACT_APP_API_KEY=http://localhost:8000/api

## Learn More

### To Run The application we need to

install npm i and then run:
npm start
for both Client and Server codes

How the application works

## Client side code for the Application

Frontend | Components |

The shows components for adding new blog posts. Users can enter a title, content, and image URL,
and upon submission, the data is sent to a backend API for storage, and the user is redirected to the home
page. It provides a clean and organized form interface for creating new blog posts.
Handles user authentication and It also leverages
Material-UI for styling and user interface elements.
It also creates a dynamic header for a web application. It adjusts its content and
appearance based on the user's authentication status and uses Material-UI components for styling. It also
handles navigation by utilizing the `Link` component for routing.

## Server side code for the Application

Backend | Codes |

The code sets up a Node.js application using Express, configures routes for handling user
and blog-related operations, connects to a MongoDB database, and listens for incoming requests on a
specified port, with CORS support enabled for cross-origin requests.
It has functions that provide the basic CRUD (Create, Read, Update, Delete) operations for managing blog data and
user-related operations in a MongoDB database with Mongoose.
It establishes a relationship between users and their associated blog posts using an array
of references.
