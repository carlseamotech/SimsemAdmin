# Gemini Context: `src/services`

This directory is dedicated to client-side API communication. It contains modules that directly interact with the backend API routes. Each function should encapsulate a single API endpoint call (`GET`, `POST`, `PUT`, `DELETE`).

## Directory Structure

-   **`api.ts`**: This file contains the central API client that is used to make all API requests. It is configured with the necessary headers and base URL for the API routes.
-   **`types.ts`**: This file contains the type definitions for the API client and other shared types.
-   **`{feature}/`**: Each feature has its own directory, which contains all the API services that are specific to that feature. For example, all services related to experiences are located in `src/services/experiences`.
-   **`auth.ts`**: This file contains the services for authentication, such as `signIn` and `signOut`.

## Conventions

-   **Service Naming**: Service files should be named using kebab-case (e.g., `custom-tour.ts`).
-   **Function Naming**: Functions should be named using camelCase and should clearly describe the action they perform (e.g., `getCustomTours`, `createCustomTour`).
-   **No Direct Firestore Access**: Services should **not** have direct access to Firestore. All data should be fetched by calling the API routes in the `/api` directory.
-   **DTOs**: Data Transfer Objects (DTOs) should be used to define the shape of the data that is sent to and received from the API. DTOs should be defined in the relevant service file and should have the `DTO` suffix (e.g., `CreateExperienceDTO`).
-   **Error Handling**: API calls should be wrapped in a `try...catch` block to handle any errors that may occur.
-   **Models**: The functions in this directory should return data that conforms to the models defined in the `src/models` directory.

## Authentication

The `authService` is responsible for making API calls to the `/api/auth` route for signing in. The `signOut` function directly calls the Firebase SDK's `signOut` method.
