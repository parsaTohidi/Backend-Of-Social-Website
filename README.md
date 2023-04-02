# Backend of social website

## Prerequisites
- Node.js 
- npm
- Typescript
- Express.js
- Mongodb
- Jest
- Redis
- JWT

## Database Requirements
1. You need to create database (for example named `social-web`) in mongodb (which must be installed on you machine).
2. Create a user with `readWrite` role to this database 

## Getting Started
1. Clone the repository to your local machine
2. Navigate to the repository's root directory using terminal or command prompt
3. Run `npm install` to install required packages and dependencies
4. Create `.env` file and add some enviroment variables listed below.
5. Run `npm run build` to compile the TypeScript code
6. Run `npm start` to start the Express.js server
7. Server is now listening on `http://localhost:3000` by default, you can call routes by Postman.

**Note:** The enviroment variables you need to add to the `.env` file in order to run project:
>DBUser="YOUR_DATABSE_USERNAME_WITH_READWRITE_ACCESS"

>DBPassword="YOUR_DATABSE_USERNAME'S_PASSWORD_WITH_READWRITE_ACCESS"

>DBName="social-web"

>DBUrl="mongodb://localhost:27017"

>JWT_SECRET='mySecretKey'

**Note:** You might need to run the system in DEV mode. You can do this by running `npm run dev`.

## Testing the System
1. First create a file named `.test.env` and add below variables in it:
>DBUser="YOUR_DATABSE_USERNAME_WITH_READWRITE_ACCESS"

>DBPassword="YOUR_DATABSE_USERNAME'S_PASSWORD_WITH_READWRITE_ACCESS"

>DBName="social-web-test"

>DBUrl="mongodb://localhost:27017"

>JWT_SECRET='mySecretKeyTest'
2. Run `npm run test` to run the test suite
3. It will run the test cases for the server endpoints and services

> Test coverage: ~85%

## Endpoints
- `GET /healthcheck`: Health check endpoint to check if the server is up and running
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Login a user and return an authentication token.
- `GET /user/search`: Search users by combining `firstname`, `lastname`, `username`, `age`, `country`, `gender` query parameters.
- `POST /request/send`: Send a friend request to a user.
- `POST /request/cancel`: Cancel a friend request.
- `POST /request/respond`: Respond to a friend request.
- `POST /request/remove`: Remove a friend from user's friends list.
- `GET /request/list`: Get all friend requests for a user.

## Code Structure
- `./index.ts`: Express server and initializing mongodb and redis databases
- `./routes`: Route files whichi contains routers
- `./controllers`: Controllers and Services for the server endpoints
- `/models`: Database models and entities files
- `./middlewares`: Express routes middlewares like authentication and queryValidation
- `./lib`: Packages and databases and utils used in the project
- `./@types`: Global project Interfaces will be put here

## Architecture overview
> The architecture of this project follows a typical Model-View-Controller (MVC) pattern, where the Model represents the data and business logic, the View represents the presentation layer, and the Controller acts as an intermediary between the Model and the View.

> In this project, the data layer is managed by MongoDB, which is a NoSQL document database. The data model is defined using Mongoose, which is an object data modeling (ODM) library for Node.js and MongoDB.

> The presentation layer is implemented using RESTful APIs, which allow clients to communicate with the server using HTTP requests. The server is built using Node.js and Express.js, which is a web framework for Node.js.

> The controller layer is implemented using a set of middleware functions that handle the various API endpoints, validate the input data, authenticate users, and interact with the database to perform CRUD operations.

> In addition to the above, this project also utilizes Redis, which is an in-memory data store used for caching and session management, and JWT tokens for authentication.
