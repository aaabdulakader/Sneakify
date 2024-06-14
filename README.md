
Sneakify

Sneakify is a modern e-commerce web application designed for sneaker enthusiasts. It offers a full-featured online store experience with features such as browsing products, adding items to a cart, managing user profiles, and handling secure checkouts.

Table of Contents

Project Overview
Demo
Features
Technologies Used
Project Structure
Deployment Tools
Contributors


Project Overview

Sneakify provides a comprehensive online shopping platform for sneakers. Users can browse through a curated collection of sneakers, filter by categories, sizes, and colors, add items to their cart, and proceed to checkout securely. Admins can manage products and orders through an intuitive dashboard.

![Sneakify Banner](https://sneakify-14bef41e043b.herokuapp.com/favicon2.png)


## Demo

[Live Demo] (https://sneakify-14bef41e043b.herokuapp.com)

Features

Product Browsing: Explore a wide range of sneakers with filtering options.
Shopping Cart: Add, remove, and adjust quantities of products in the cart.
User Authentication: Register, log in, and manage profiles securely.
Order Management: Complete and review orders through a secure checkout process.

Technologies Used

Frontend

React: Utilized for building the user interface with components and hooks.
React Router: Manages navigation and routing within the application.
CSS Modules: Applies scoped styling to components, ensuring modular and maintainable CSS.
Axios: Facilitates communication between the frontend and backend APIs.

Backend

Node.js: Executes JavaScript on the server, providing the runtime environment.
Express: Implements RESTful APIs and handles routing and middleware.
MongoDB: Stores and manages product and user data.
Mongoose: Simplifies interactions with MongoDB through schemas and models.
JWT: Secures authentication and authorization using JSON Web Tokens.

Payment

Stripe: Manages secure payments and transactions.

Development Tools

Postman: Used for testing and documenting APIs.
ESLint: Ensures code quality and adherence to coding standards.
Prettier: Enforces consistent code formatting.

Project Structure

sneakify/
├── client/               # React frontend
│   ├── public/
│   └── src/
│       ├── components/   # Reusable components
│       ├── pages/        # Main pages
│       ├── App.js        # Main App component
│       ├── index.js      # Entry point
│       └── ...           # More configuration and utilities

├── server/               # Node.js backend
│   ├── controllers/      # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── data/             # JSON Data files
│   ├── config/           # Configuration files
│   └── server.js         # Server entry point
├── .gitignore
└── README.md

Deployment Tools

Hosting

Heroku: Hosts both the frontend and backend of the application, managing deployments and scaling through a platform-as-a-service (PaaS) model.

Database Hosting

MongoDB Atlas: Provides a cloud-based MongoDB instance for storing and managing product and user data.


Contributors

Abdulkader Abdi - Project Maintainer

