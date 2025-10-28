# Welfare Board Portal

Full stack application with React frontend and Node.js backend.

## 📁 Project Structure

This project uses **npm workspaces** to manage the monorepo:

```
Welfare_Board_Portal/
├── frontend/          # React application
├── backend/           # Node.js/Express API
└── package.json       # Root workspace configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

Install all dependencies for both frontend and backend:

```bash
npm install
```

This will install dependencies for all workspaces at once.

### Development

Run both frontend and backend concurrently:

```bash
npm run dev
```

Or run them separately:

```bash
# Run only frontend
npm run dev:frontend

# Run only backend
npm run dev:backend
```

## 📜 Available Scripts

### Root Level Scripts

- `npm run dev` - Run both frontend and backend in development mode
- `npm run dev:frontend` - Run only the frontend
- `npm run dev:backend` - Run only the backend
- `npm run build:frontend` - Build the frontend for production
- `npm run test` - Run tests in all workspaces
- `npm run clean` - Remove node_modules and build folders
- `npm install` - Install all dependencies for all workspaces

### Working with Specific Workspaces

To run commands in a specific workspace:

```bash
# Add a dependency to frontend
npm install <package-name> --workspace=frontend

# Add a dev dependency to backend
npm install <package-name> --save-dev --workspace=backend

# Run a script in a specific workspace
npm run <script-name> --workspace=frontend
npm run <script-name> --workspace=backend
```

## 🔒 Dependency Management

This project uses a **single `package-lock.json`** at the root level. This is the recommended approach for npm workspaces because:

- ✅ All workspace dependencies are managed centrally
- ✅ Prevents version conflicts between workspaces
- ✅ Simplifies dependency updates
- ✅ Ensures consistent installs across the team

**Note:** The `package-lock.json` files in individual workspaces are intentionally excluded from git.

## 🔧 Workspace Management

### Frontend (React)

```bash
cd frontend
npm run start    # Development server
npm run build    # Production build
npm run test     # Run tests
```

### Backend (Node.js/Express)

```bash
cd backend
npm run start    # Start server with nodemon
```

## 📝 Environment Variables

Create `.env` files in the respective directories:

- `frontend/.env` - Frontend environment variables
- `backend/.env` - Backend environment variables (database, ports, etc.)

## 🤝 Contributing

1. Make sure to run `npm install` from the root after pulling changes
2. Use the provided scripts to manage both applications
3. Keep workspace dependencies isolated to their respective directories

## 📚 Documentation

Additional documentation can be found in:

- `backend/docs/` - Backend API documentation and architecture

## 🛠️ Tech Stack

### Frontend

- React 18
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- AdminJS

---

For more information about npm workspaces, visit: https://docs.npmjs.com/cli/using-npm/workspaces
