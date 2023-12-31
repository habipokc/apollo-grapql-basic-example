﻿# apollo-grapql-basic-example

This project sets up a GraphQL server using Apollo Server and Express. It provides basic CRUD operations for user data stored in a JSON file (data.json).

Features
Query Users: Retrieve a list of users or a specific user by ID.
Add User: Add a new user to the dataset.
Update User: Update an existing user by ID.
Delete User: Delete a user by ID.
Getting Started
Clone or download the project.
Install dependencies with npm install.
Run the server using npm start.
Open http://localhost:4000/graphql in your browser to use GraphQL Playground.
Data Structure
User data is stored in data.json with fields: id, user, age, city, and number.

GraphQL Schema
User: Represents a user with fields id, user, age, city, and number.
Query: Supports users (retrieve all users) and user (retrieve a user by ID).
Mutation: Supports addUser, updateUser, and deleteUser operations.
Usage Examples
Query All Users
Query User by ID
Add User
Update User
Delete User
