# Clinic Management System

This is a complete Clinic Management System with a FastAPI backend and a React frontend.

## Project Structure

- `backend/`: Contains the FastAPI application.
- `frontend/`: Contains the React application.

## Backend Setup (FastAPI)

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create a virtual environment:**
    ```bash
    python -m venv venv
    ```

3.  **Activate the virtual environment:**
    -   **Windows:**
        ```bash
        venv\Scripts\activate
        ```
    -   **macOS/Linux:**
        ```bash
        source venv/bin/activate
        ```

4.  **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

5.  **Run the application:**
    ```bash
    uvicorn app.main:app --reload
    ```
    The application will be available at `http://127.0.0.1:8000`.

## Frontend Setup (React)

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install the dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn
    ```

3.  **Run the application:**
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```
    The application will be available at `http://localhost:5173`.

## Proxy Setup

The frontend is configured to proxy API requests to the backend. In `frontend/vite.config.ts`, you can see the proxy configuration:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```

This configuration forwards any request starting with `/api` to the backend server running on `http://127.0.0.1:8000`.
