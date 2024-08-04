# Event Management Application

### Deployed link : https://claw-assignment-event-management.vercel.app/
### Demo video : https://www.loom.com/share/6409cbdf2e0740488a23359844712fde

## Project Overview
This project is a web application designed to scehdule and manage events, by creating, updating, reading and deleting. Addition to it we can fetch the realtime weather details of a particular place of the event.

## Technologies and concepts Used :
- **Frontend:** React, React Bootstrap, React-router-dom, axios (for fetching)
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens), bcrypt
- **web:** HTML (jsx), CSS, JS

## Features
- **CRUD Operations:** Create, read, update, and delete events
- **Session Management:** Usage of JWT for user authentication and session managements

## Setup Instructions

### Backend
1. **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-directory>
    ```

2. **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Set up environment variables:**
    Create a `.env` file in the backend directory and add the following:
    ```env
    PORT=5000
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    WEATHER_API_KEY=<your-KEY>
    ```

5. **Run the backend server:**
    ```bash
    npm run server (with nodemon) / or node index.js
    ```

### Frontend
1. **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the frontend server:**
    ```bash
    npm start
    ```

### Usage
1. **Access the application:**
    Open your browser and navigate to `http://localhost:5173`.

2. **Login:**
    If you don't have an account, you need to register first. After registration, login to access the main features of the application.

3. **Add the Events:**
    Click on the "create event" button to open the modal dialog and fill in the event details.

4. **Edit an Event:**
    Click on the "Edit/Update" button on a Event card to open the modal dialog and update the Event details.

5. **Delete an Event:**
    Click on the "Delete" button on a Event card to delete an event
   

## Project Structure

### Backend
- **server.js:** Entry point of the backend application.
- **routes:** Contains route files for different entities.
- **controllers:** Contains controller files for handling business logic.
- **models:** Contains Mongoose schema definitions.
- **middleware:** Contains middleware functions, including JWT authentication.

### Frontend
- **src/components:** Contains React components.
- **src/pages:** Contains main pages of the applications
- **src/components:** Contains all the react components
- **src/App.js:** Entry point of the frontend application.

## Contributing
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch to your fork.
4. Create a pull request to the main repository.

