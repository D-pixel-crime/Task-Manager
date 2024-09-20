# Personal Task & Time Tracker (PT3) 🗂️⏳

A web application for managing tasks with a focus on tracking their progress and deadlines.

## Table of Contents 📚

- [Features](#features)
- [Technologies](#technologies)
- [Frontend](#frontend)
- [Backend](#backend)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features 🚀

- Create, update, and delete tasks
- View tasks organized by project
- Track task progress with visual indicators
- Responsive design for mobile and desktop

## Technologies 🛠️

- **Frontend:** React, TypeScript, Next.js, Material-UI
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Additional Libraries:** Axios, React Router, Lucide Icons

## Frontend 🖥️

The frontend is built using React and TypeScript, leveraging Material-UI for a clean and responsive design.

### Key Components

- **MainContainer:** A layout component that wraps the main application interface.
- **Sidebar:** Navigation menu for accessing different parts of the application.
- **Task Management:** Create, update, and view tasks using forms and data visualization.

### Running the Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/D-pixel-crime/Task-Manager.git
   cd frontend
   ```
2. Create a `.env` file with for backend url:
   ```plaintext
   VITE_BACKEND_URI = <your-backend-url>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Backend ⚙️

The backend is built using Node.js and Express, with MongoDB as the database for storing task data.

### Key Features

- RESTful API for task management
- CORS enabled for frontend-backend communication
- Middleware for request logging and error handling

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a `.env` file with your MongoDB URI:
   ```plaintext
   MONGO_URI=<your-mongodb-uri>
   FRONTEND_URI=<your-frontend-url>
   ```
3. Install dependencies:

   ```bash
   npm install
   ```

   (OR)
   Build & Spin up the Docker image:

   ```bash
   docker build -t task-manager .
   docker run -p -d 3000:3000 task-manager
   ```

4. Start the server(If not using docker):
   ```bash
   node index.js
   ```

## API Endpoints 📡

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| GET    | `/`                | Check if the backend is active |
| GET    | `/task/:id`        | Get individual task by ID      |
| GET    | `/progress`        | Get progress statistics        |
| POST   | `/search`          | Search for tasks               |
| POST   | `/create-task`     | Create a new task              |
| POST   | `/delete-tasks`    | Delete multiple tasks          |
| DELETE | `/delete/:id`      | Delete an individual task      |
| POST   | `/update-task/:id` | Update an individual task      |
| PATCH  | `/update-tasks`    | Update multiple tasks          |
