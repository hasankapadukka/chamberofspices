# The Ceylon Chamber of Spices

This project is structured as a Monorepo containing both the React frontend and Express.js backend. 

## Project Architecture
- `/frontend` - React 19 + Vite + Tailwind CSS frontend application.
- `/backend` - Express.js backend server.

## Installation & Setup

**Prerequisites:** Node.js (v18+ recommended)

1. Clone the repository and install dependencies from the root:
   ```bash
   npm run install:all
   ```

2. Setup Environment Variables:
   - Navigate to `/backend`.
   - Copy `.env.example` to `.env` and set up your variables (like `GEMINI_API_KEY`).

3. Run the application:
   ```bash
   npm run dev
   ```
   *This command leverages `concurrently` to spin up both the Vite frontend server and Express backend server simultaneously using NPM workspaces.*

## Build for Production
To build the frontend application for production deployment, run:
```bash
npm run build --workspace=frontend
```
