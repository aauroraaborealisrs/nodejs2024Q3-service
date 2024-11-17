# Home Library Service

## Description

Home Library Service is a REST API for managing a personal music library. You can create, read, update, and delete information about users, artists, tracks, and albums, and also add them to your favorites.

## Features

- User management (CRUD operations)
- Management of tracks, albums, and artists
- Adding tracks, albums, and artists to favorites
- Validation of incoming requests
- Automatic cleanup of references when an entity is deleted
- In-memory data storage (to be replaced with a database in future tasks)

## Prerequisites

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/)
- Git - [Download & Install Git](https://git-scm.com/downloads)

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/aauroraaborealisrs/nodejs2024Q3-service.git
cd nodejs2024Q3-service
git checkout dev
npm install
```

## Running the Application

To start the service, use the following command:

```bash
npm run start
```

The service will start on port `4000` by default. You can change the port in the `.env` file.

OpenAPI documentation will be available at:

```
http://localhost:4000/doc/
```

## Environment Variables

Create a `.env` file and add the following variable:

```bash
PORT=4000
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

- Data is currently stored in-memory, so it will be reset on server restart.
- When an entity (artist, album, or track) is deleted, its ID is removed from favorites, and references in other entities are set to `null`.
- All user passwords are encrypted and not included in server responses.

For more information, refer to the OpenAPI documentation or visit [Swagger](https://swagger.io/).