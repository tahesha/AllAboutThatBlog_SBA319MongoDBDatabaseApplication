README.md

# Blog Application using Node.js, Express, and MongoDB

This is a simple blog application built with Node.js, Express, and MongoDB. It allows users to create, read, update, and delete blog posts, as well as search for posts based on keywords.

# Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

# Features

- CRUD Operations: Create, Read, Update, and Delete blog posts.
- Search: Search for blog posts by keywords.
- User-Friendly Interface: Simple and intuitive interface for managing blog posts.
- RESTful API: Exposes API endpoints for interacting with blog posts.

# Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB (Make sure it's running locally or accessible via URI)

# Getting Started

# Installation

1. Clone the repository:

   In bash: 
   git clone <repository-url>
   cd blog-application
   

2. Install dependencies:

   In bash:
   npm install
   

# Running the Application

1. Set up environment variables:
   
   Create a `.env` file in the root directory with the following variables:
   

   PORT=3000
   MONGODB_URI=<your-mongodb-uri>


   Replace `<your-mongodb-uri>` with your MongoDB connection URI.

2. Start the server:

   In bash:
   npm start
   

   This will start the server at `http://localhost:3000`.

# Usage

- Open your web browser and navigate to `http://localhost:3000` to access the blog application.
- Use the interface to create, edit, delete, and search blog posts.
- Use API endpoints for programmatic access to blog posts (see [API Routes](#api-routes) section).

# API Routes

# Posts

- `GET /posts`: Get all blog posts.
- `GET /posts/:id`: Get a specific blog post by ID.
- `POST /posts`: Create a new blog post.
- `PUT /posts/:id`: Update a blog post by ID.
- `DELETE /posts/:id`: Delete a blog post by ID.

# Search

- `GET /search?query=<keyword>`: Search blog posts by keyword.

# Technologies Used

- Node.js: JavaScript runtime environment.
- Express: Web framework for Node.js.
- MongoDB: NoSQL database for storing blog posts.
- Mongoose: MongoDB object modeling tool for Node.js.
- dotenv: Module for loading environment variables from a `.env` file.

# Contributing

Contributions are welcome! Feel free to fork the repository, create pull requests, and suggest improvements. Please follow the [Contributor Covenant](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) when contributing.

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.