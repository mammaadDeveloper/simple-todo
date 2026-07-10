# Docker

Run the backend and serve the frontend `dist` via `nginx` using Docker Compose.

Build (and run) both services:

```sh
docker compose up --build
```

Notes:
- The backend Dockerfile expects a built `dist` directory. Build the backend before `docker compose build` with:

```sh
npx nx build backend
```

- The frontend service serves the local `apps/frontend/dist` directory. Build the frontend locally before `docker compose up` with:

```sh
npx nx build @simple-todo/frontend
```

Adjust these commands if you use a different package manager (bun, pnpm, etc.).
