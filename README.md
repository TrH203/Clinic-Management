# Clinic Management System

This is a complete Clinic Management System with a FastAPI backend and a React frontend, fully containerized with Docker.

## Running with Docker (Recommended)

This is the easiest way to get the application running.

1.  **Prerequisites**: Make sure you have Docker and Docker Compose installed on your system.

2.  **Build and Run**:
    ```bash
    docker-compose up --build
    ```
    This command will build the Docker images for both the frontend and backend, and then start the containers.

3.  **Access the Application**:
    -   **Frontend**: Open your browser and navigate to `http://localhost`.
    -   **Backend API**: The API is available at `http://localhost:8000`.

## Manual Setup (Without Docker)

If you prefer to run the application without Docker, follow these steps.

### Backend Setup (FastAPI)

1.  **Navigate to the backend directory**: `cd backend`
2.  **Create and activate a virtual environment**.
3.  **Install dependencies**: `pip install -r requirements.txt`
4.  **Run the application**: `uvicorn app.main:app --reload`

### Frontend Setup (React)

1.  **Navigate to the frontend directory**: `cd frontend`
2.  **Install dependencies**: `yarn install` or `npm install`
3.  **Run the application**: `yarn dev` or `npm run dev`

### Proxy Setup

The frontend development server is configured to proxy API requests from `/api` to the backend. This is defined in `frontend/vite.config.ts`.
