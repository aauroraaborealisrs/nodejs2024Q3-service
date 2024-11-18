# Home Library Service

## Description

Home Library Service is a REST API for managing a personal music library. You can create, read, update, and delete information about users, artists, tracks, and albums, and also add them to your favorites.

## Prerequisites

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/)
- Git - [Download & Install Git](https://git-scm.com/downloads)
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop/)

## Installation (Local)

Clone the repository and install the dependencies:


```bash
git clone https://github.com/aauroraaborealisrs/nodejs2024Q3-service.git
cd nodejs2024Q3-service
git checkout typeorm
npm install
```

## Running the Application Locally

To start the service, use the following command:

```bash
npm run start
```

The service will start on port `4000` by default. You can change the port in the `.env` file.

OpenAPI documentation will be available at:

```
http://localhost:4000/doc/
```

## Running the Application with Docker

You can run the application using Docker Compose for an easy setup of both the service and the database.

### Important Notes for Running with Docker

1. **Ensure the PostgreSQL port is not occupied**:
   - Check if the port `5432` (or the one specified in your `.env` file) is already in use. Use the following command to check:

     ```bash
     netstat -ano | findstr :5432
     ```

   - If the port is occupied, stop the service using it or update the `.env` file and `docker-compose.yml` to use a different port (e.g., `5433`).

2. **Start Docker Desktop**:
   - Make sure Docker is installed and running on your computer. If Docker is not started, the services will fail to run. Open Docker Desktop and confirm it is running before executing `docker-compose` commands.


### Step 1: Build and Run with Docker Compose

Ensure Docker is installed and running, then execute:

```bash
docker-compose up
```

### Step 2: Access the Application

The service will be available at:

- **API**: `http://localhost:4000`
- **Swagger Documentation**: `http://localhost:4000/doc`

### Docker Compose Configuration

The `docker-compose.yml` file configures two services:

- **App**: The NestJS application container
- **Database**: A PostgreSQL database container

### Pulling the Docker Image

You can pull the prebuilt Docker image directly from DockerHub:

```bash
docker pull aauroraaborealis/nest-api:latest
```

The image is available at [DockerHub](https://hub.docker.com/r/aauroraaborealis/nest-api).

### Stopping Services

To stop the services, use:

```bash
docker-compose down
```

## API Endpoints

### Users (/user)

- `GET /user` — Get all users
- `GET /user/:id` — Get a user by ID
- `POST /user` — Create a new user
- `PUT /user/:id` — Update user's password
- `DELETE /user/:id` — Delete a user

### Tracks (/track)

- `GET /track` — Get all tracks
- `GET /track/:id` — Get a track by ID
- `POST /track` — Create a new track
- `PUT /track/:id` — Update track information
- `DELETE /track/:id` — Delete a track

### Albums (/album)

- `GET /album` — Get all albums
- `GET /album/:id` — Get an album by ID
- `POST /album` — Create a new album
- `PUT /album/:id` — Update album information
- `DELETE /album/:id` — Delete an album

### Artists (/artist)

- `GET /artist` — Get all artists
- `GET /artist/:id` — Get an artist by ID
- `POST /artist` — Create a new artist
- `PUT /artist/:id` — Update artist information
- `DELETE /artist/:id` — Delete an artist

### Favorites (/favs)

- `GET /favs` — Get all favorites (artists, albums, tracks)
- `POST /favs/track/:id` — Add a track to favorites
- `DELETE /favs/track/:id` — Remove a track from favorites
- `POST /favs/album/:id` — Add an album to favorites
- `DELETE /favs/album/:id` — Remove an album from favorites
- `POST /favs/artist/:id` — Add an artist to favorites
- `DELETE /favs/artist/:id` — Remove an artist from favorites

## Validation

All incoming requests are validated. If there are errors, the server responds with appropriate status codes:

- `400 Bad Request` — Invalid input data
- `401 Unauthorized` — Missing or invalid authorization token
- `403 Forbidden` — Incorrect password
- `404 Not Found` — Entity not found
- `422 Unprocessable Entity` — Cannot add a non-existent entity to favorites

## Testing

To run all tests without authorization:

```bash
npm run test
```

To run a specific test suite:

```bash
npm run test -- <path to suite>
```

## Linting and Formatting

Run the linter and auto-formatter:

```bash
npm run lint
npm run format
```

## Notes

For more information, refer to the OpenAPI documentation or visit [Swagger](https://swagger.io/).
