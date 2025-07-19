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
- **Dependencies:** Manage dependencies using `package.json`.

## 6. Naming Conventions

-   **`ProposedTour` vs. `Experience`**:
    -   **`ProposedTour`**: This name is used in the backend, API, and data modeling layers (`/models`, `/services`, `/dtos`).
    -   **`Experience`**: This name is used in the UI and display layers (`/app`, `/components`, `/hooks`).

## 7. Testing

- **Linting and Type-Checking:** `npm run lint` and `npx tsc --noEmit`
- **Framework:** Playwright is used for end-to-end (E2E) testing to ensure that all forms and user flows function as expected.
- **Test Location:** All Playwright test files are located in the `playwright/tests` directory. Each test file should be named with the `.spec.ts` extension (e.g., `login.spec.ts`).
- **Running Tests:** To run the entire test suite, use the command `npm run test`. Make sure the development server is running before executing the tests.
- **Authentication Testing:** The `AuthContext` has been designed to be test-friendly by allowing for dependency injection. When writing tests that require authentication, a mock `authService` can be provided to the `AuthProvider` to control the user's authentication state.

## 9. List Query Standard

- **Pagination and Counting:** All list queries should support pagination and counting. The following parameters should be included in the API request:
    - `limit`: The number of items to return per page.
    - `skip`: The number of items to skip for pagination.
    - `count`: Set to `1` to include the total count of items in the response.
- **Response Format:** The response for a list query should have the following format:
    ```json
    {
      "results": [...],
      "count": 123
    }
    ```
- **Hooks:** The SWR hooks that consume these services should return the `results` and `count` values, along with pagination state and handlers (e.g., `page`, `limit`, `setPage`, `setLimit`).
