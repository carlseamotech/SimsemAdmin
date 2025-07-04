# Gemini Context: `src/app/api`

This directory contains the API routes for the application, which are used to handle backend-specific logic that cannot be exposed directly to the client.

## Conventions

-   **Route Naming**: API routes should be named using kebab-case (e.g., `/api/users/invite`).
-   **Directory Structure**: Each feature should have its own directory that contains all of the API routes for that feature.

## Scope

The `/api` directory is strictly limited to the following features:

-   **`auth/`**: Handles all authentication-related logic, such as signing in, signing out, and managing user sessions. This route will interact with Firebase Authentication.
-   **`teams/`**: Manages team-related functionalities, including inviting new members and creating user accounts.

All other external API interactions, particularly with the Parse Server backend (e.g., for experiences, hosts, promotions), should be handled directly in the `src/services` directory. Do not create new API routes in this directory for those purposes.

## Data Access

-   **Firestore**: API routes can directly access Firestore for read operations. This is useful for fetching data that is not available through the Parse Server API.
-   **Parse Server**: For all other API interactions, use the `src/services` directory to communicate with the Parse Server backend.
