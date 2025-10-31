# Welfare Board Portal

Public repo: https://github.com/swciitg/Welfare_Board_Portal

Live site: https://swc.iitg.ac.in/welfare-board/

A full-stack portal for the Students' Welfare Board (SWB) at IIT Guwahati. The project includes a React frontend and an Express/Node backend with MongoDB. AdminJS is used as an admin panel for managing site content such as contacts, counselors, events, and resources.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Features](#features)
- [Quick Start (Development)](#quick-start-development)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Populating Initial Data](#populating-initial-data)
  - [Admin Panel](#admin-panel)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Testing & Linting](#testing--linting)
- [Deployments (Docker)](#deployments-docker)
- [Contributing](#contributing)
  - [Hacktoberfest Guidance](#hacktoberfest-guidance)
- [License](#license)
- [Contact / Support](#contact--support)

---

## Project Overview

Welfare Board Portal is a web application used by the Students' Welfare Board at IIT Guwahati to display resources, contacts, counsellors, events, and other student welfare information. Admins manage content through AdminJS.

This repository contains two main directories:

- `frontend/` - React app (Create React App) with TailwindCSS for styling.
- `backend/` - Express.js + MongoDB backend with AdminJS for content management.

---

## Architecture

- Frontend: React, TailwindCSS, react-router, axios
- Backend: Node.js, Express, Mongoose (MongoDB), AdminJS
- Admin Panel: AdminJS (mounted at `/welfare-board/api/admin` by default)
- Database: MongoDB (connection configured via environment variables)

---

## Features

- Dynamic Contacts & Counselors managed via AdminJS
- Resources page with PDF assets and modern icons
- Events listing and details
- Image + file uploads
- Responsive UI for mobile, tablet, and desktop
- AdminJS for CRUD operations on content

---

## Quick Start (Development)

### Prerequisites

- Node.js (>=16)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. Open a terminal and start in the `backend` folder:

```bash
cd backend
npm install
```

2. Create a `.env` file in `backend/` (see [Environment Variables](#environment-variables)).

3. Start the backend (development):

```bash
npm start
```

- The backend serves API routes and mounts AdminJS at `/welfare-board/api/admin`.

### Frontend Setup

1. In a new terminal, go to the `frontend` folder and install deps:

```bash
cd frontend
npm install
```

2. Start the frontend (development):

```bash
npm start
```

- The frontend runs on `http://localhost:3000` by default and proxies API calls to the backend (when configured).

### Populating Initial Data

Backend contains scripts to populate initial contacts and counselors:

```bash
cd backend
# Populate contacts
node populateContacts.js
# Populate counselors
node populateCounselors.js
```

**Important:** ensure `MONGODB_URI` (or `MONGODB_URI` env var used by your project) is set in `.env` before running scripts.

### Admin Panel

- URL (local): `http://localhost:8000/welfare-board/api/admin`
- Use the admin email/password set in `.env`.

The Admin panel exposes resources: Contacts, Counselors, Events, Facilities, Team Members, Club Info, Homepage data, etc.

---

## Environment Variables

Create a `.env` file in `backend/` with the following variables (example):

```
PORT=8000
MONGO_URI=mongodb://localhost:27017/welfare_board
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=strongpassword
COOKIE_NAME=adminjs
COOKIE_PASSWORD=a-secure-cookie-password
```

For production, store secrets securely (Vault / environment configuration in your hosting provider).

---

## API Endpoints

Some key endpoints (mounted under `/welfare-board/api` or as configured):

- `GET /welfare-board/api/home` - Homepage data
- `GET /welfare-board/api/contacts` - List contacts
- `GET /welfare-board/api/counselors` - List active counselors
- `GET /welfare-board/api/club/:name` - Club data
- `GET /welfare-board/api/event:id` - Event details
- `POST /welfare-board/api/upload` - File upload (protected routes may apply)

(Refer to `backend/controllers` for full list of available routes and response shapes.)

---

## Testing & Linting

- Frontend uses `react-scripts test` for unit tests (if any)
- Linting: follow project ESLint / Prettier configuration if present

---

## Deployments (Docker)

This repo contains `docker-compose` files and Dockerfiles for `frontend/` and `backend/`. You can run containers using:

```bash
# from repo root
docker-compose up --build
```

Adjust environment variables and Docker networking as required.

---

## Contributing

Thanks for your interest in contributing! We welcome contributions from students, maintainers, and participants during events like Hacktoberfest.

Please follow these steps:

1. Fork the repository
2. Create a feature branch from `main`:

```bash
git checkout -b feat/your-feature-name
```

3. Make changes, run tests, and ensure linting/formatting
4. Commit with clear messages (see `CONTRIBUTING` below for examples)
5. Push to your fork and open a Pull Request against `main`

### Contribution Guidelines

- Keep PRs focused and small
- Provide a clear description of the change and screenshot (if UI)
- Add tests where applicable
- Follow the existing code style

### Hacktoberfest Guidance

If you plan to contribute for Hacktoberfest, please: 
- Choose issues labelled `hacktoberfest` or `good-first-issue`
- Make meaningful contributions (fixes, features, docs)
- Avoid trivial or spammy PRs

---

## Suggested Commit Messages

- `feat: add counselors admin resource and api`
- `fix: correct admin route mounting and env variable usage`
- `docs: add README and contrib guidelines`

---

## License

Specify license (e.g., MIT) here.

---

## Contact / Support

If you need help, open an issue on the repo or contact the maintainers via the project website.

---

_Last updated: October 31, 2025_
