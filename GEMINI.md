# Gemini Project Context: SimsemAdmin

This document provides a high-level overview of the SimsemAdmin project's architecture and conventions to ensure consistent and efficient development assistance.

## 1. Core Technologies

- **Framework:** Next.js 15+ (with App Router)
- **Language:** TypeScript
- **UI Library:** React 19
- **Styling:** Tailwind CSS with `clsx` and `tailwind-merge`.
- **UI Components:** Shadcn/UI. New components should be added using the `shadcn/ui` CLI. See `src/components/GEMINI.md` for more details.
- **Authentication:** Firebase Authentication
- **Client-Side Data Fetching:** `swr`
- **Forms:** React Hook Form (`react-hook-form`) with `zod` for schema validation.
- **Icons:** `lucide-react` and `react-icons`.

## 2. Overall Architecture

The project follows a feature-based architecture with a clear separation of concerns between data fetching logic and UI components. The application is divided into the following layers:

-   **`src/app` (Routing Layer)**: This layer is responsible for handling all routes, pages, and layouts, following the Next.js App Router conventions.
-   **`src/components` (UI Layer)**: This layer contains all of the React components that make up the application's UI. It is further divided into subdirectories for common components, UI components, and feature-specific components.
-   **`src/hooks` (State Management Layer)**: This layer contains custom React hooks that use `swr` to fetch data from the API and manage the state of that data.
-   **`src/services` (Data Access Layer)**: This layer is responsible for all communication with the backend API. It contains a central API client and a set of services that encapsulate the API endpoints for each feature.
-   **`src/models` (Data Modeling Layer)**: This layer contains the type definitions for the core business entities of the application.
-   **`src/dtos` (Data Transfer Objects)**: This layer contains the type definitions for the data that is sent to and received from the API.
-   **`src/context` (Contexts and Providers)**: This layer contains the React contexts and providers that are used to share state across the application.

For more detailed information on each layer, please refer to the `GEMINI.md` file in the corresponding directory.

## 3. API Integration

- **Backend:** The application communicates with a Parse Server backend, as detailed in `collections/admin-panel-collection.json`.
- **API Client:** A central API client is located at `src/services/api.ts`. This client handles the `fetch` logic, including adding the necessary `X-Parse-Application-Id` and `X-Parse-REST-API-Key` headers to every request.
- **Environment Variables:** API credentials and the base URL are managed through a `.env.local` file.
- **Data Transfer Objects (DTOs):** All data sent to or received from the API should be typed using DTOs. These DTOs should be defined in the `src/dtos` directory and should be named with the `DTO` suffix (e.g., `CreateExperienceDTO`).

## 4. State Management

- **Global State:** For global state that needs to be shared across the entire application, use React Context and Providers. This is ideal for state that does not change often, such as user authentication status or theme settings.
- **Feature-Specific State:** For state that is specific to a single feature, use custom hooks with `swr`. This is ideal for data that is fetched from the API and needs to be cached and revalidated.
- **Local State:** For state that is local to a single component, use the `useState` and `useReducer` hooks.

## 5. Development Workflow

- **Run Development Server:** `npm run dev`
- **Create Production Build:** `npm run build`
- **Linting:** `npm run lint`
- **Dependencies:** Manage dependencies using `package.json`.

## 6. Authentication and Authorization

- **Authentication:** We will use Firebase Authentication for user management. The sign-in process will be handled by a server-side API route (`/api/auth`) that validates credentials with Firebase. Client-side authentication state will be managed by the `AuthContext`.
- **Authorization:** We will implement Role-Based Access Control (RBAC) for the Teams feature. User roles will be stored in the `TeamMember` model and will be used to control access to specific actions and resources.

## 7. Naming Conventions

-   **`ProposedTour` vs. `Experience`**:
    -   **`ProposedTour`**: This name is used in the backend, API, and data modeling layers (`/models`, `/services`, `/dtos`).
    -   **`Experience`**: This name is used in the UI and display layers (`/app`, `/components`, `/hooks`).
