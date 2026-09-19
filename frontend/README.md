# Task Manager App

A full-stack task management application built with React, Node.js, Express, and MongoDB, containerized using Docker and Docker Compose.

## Overview

This project allows users to:

- Register and login
- Create, update, and delete tasks
- View task details in a dashboard
- Use a full-stack architecture with separate frontend, backend, and database services

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Containerization: Docker + Docker Compose
- Frontend production serving: Nginx

## Project Structure

```bash
.
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
└── README.md
```

## Services

The application runs as three Docker services:

- `frontend` - React app served via Nginx
- `backend` - Express API server
- `mongo` - MongoDB database

## Docker Setup

The application uses Docker Compose to manage the containers together.

### File used

- `docker-compose.yml`

### Main configuration

- Frontend exposed on: `http://localhost:3000`
- Backend exposed on: `http://localhost:5001`
- MongoDB runs internally in the Docker network and persists data using a named volume

## Run the Application

From the project root:

```bash
cd /Users/pratik/placement/Docker/task-manager
docker compose up --build -d
```

Then open:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5001`

## Stop the Application

```bash
docker compose down
```

## View Logs

```bash
docker compose logs -f
```

## Check Running Containers

```bash
docker compose ps
```

## Environment Variables

The backend uses a `.env` file in the `backend/` directory. Make sure it contains the required configuration for MongoDB connection and application port.

Example:

```env
PORT=5001
MONGO_URI=mongodb://mongo:27017/taskmanager
JWT_SECRET=your_secret_key
```

## Notes

This project was built to practice:

- Full-stack application development
- Docker containerization
- Multi-service orchestration with Docker Compose
- Environment configuration and debugging for container-based apps
- Nginx-based frontend serving in production

## Future Improvements

- Add task filters and sorting
- Add user profile management
- Add tests for frontend and backend
- Deploy to a cloud platform
- Explore Kubernetes orchestration

## License

This project is for learning and demonstration purposes.
