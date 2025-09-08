# TrackMyGroceries

## Overview
TrackMyGroceries is a full-stack application built using the MERN stack (MongoDB, Express, React, Node.js) that allows users to manage their grocery items efficiently. The application provides features for uploading bills, parsing items, and tracking pantry inventory.

## Project Structure
The project is organized into two main directories: `backend` and `frontend`.

### Backend
The backend is built with Express and Mongoose, providing a RESTful API for the frontend to interact with.

- **src/**: Contains the main application code.
  - **app.ts**: Initializes the Express application.
  - **controllers/**: Contains the logic for handling requests.
  - **models/**: Defines Mongoose schemas for the database.
  - **routes/**: Sets up the API routes.
  - **types/**: Type definitions for TypeScript.
- **package.json**: Lists dependencies and scripts for the backend.
- **tsconfig.json**: TypeScript configuration for the backend.
- **Dockerfile**: Defines the Docker image for the backend service.

### Frontend
The frontend is built with React and Vite, providing a responsive user interface.

- **src/**: Contains the main application code.
  - **main.tsx**: Entry point for the React application.
  - **App.tsx**: Main application component.
  - **components/**: Contains reusable components.
  - **types/**: Type definitions for TypeScript.
- **package.json**: Lists dependencies and scripts for the frontend.
- **tsconfig.json**: TypeScript configuration for the frontend.
- **vite.config.ts**: Configuration for Vite.
- **Dockerfile**: Defines the Docker image for the frontend service.

## Getting Started

### Prerequisites
- Docker and Docker Compose installed on your machine.

### Running the Application
1. Clone the repository:
   ```
   git clone <repository-url>
   cd TrackMyGroceries
   ```

2. Build and run the application using Docker Compose:
   ```
   docker-compose up --build
   ```

3. Access the application:
   - Backend API: `http://localhost:5000`
   - Frontend: `http://localhost:3000`

### Environment Variables
Create a `.env` file in the `backend` directory based on the `.env.example` file to configure your MongoDB connection and server port.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License.