# Gemini Project Context: SimsemAdmin

This document provides a high-level overview of the SimsemAdmin project's architecture and conventions to ensure consistent and efficient development assistance.

## 1. Core Technologies

- **Framework:** Next.js 15+ (with App Router)
- **Language:** TypeScript
- **UI Library:** React 19
- **Styling:** Tailwind CSS with `clsx` and `tailwind-merge`.
- **UI Components:** Shadcn/UI. See `src/components/GEMINI.md` for more details.
- **Authentication:** Token-based authentication with Parse Server.
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

## 3. API Integration & Authentication

- **Backend:** The application communicates with a Parse Server backend.
- **API Client:** A central API client is located at `src/services/api.ts`. It automatically includes the `X-Parse-Application-Id` and `X-Parse-REST-API-Key` headers.
- **Authentication Flow:**
    1.  User logs in via the `/parse/login` endpoint.
    2.  The `sessionToken` from the response is stored in `localStorage`.
    3.  The `api.ts` client reads this token and includes it in the `X-Parse-Session-Token` header for all subsequent authenticated requests.
- **File Uploads:** All file uploads must use the `uploadFile` service in `src/services/files.ts`. This service correctly handles sending the session token and sanitizes filenames.

## 4. Form Conventions

### Data Transformation: The "Parse/Stringify" Pattern

A critical convention in this project is handling complex data types that the backend stores as stringified JSON.

-   **Problem**: Fields like `tourPackages`, `thingsToKnow`, and `itinerary` are stored in the database as an array of strings (e.g., `["{\"title\":\"Day 1\",\"desc\":\"...\"}"]`), but `react-hook-form`'s `useFieldArray` requires an array of objects for dynamic fields.
-   **Solution**: 
    1.  **Parse for Display**: When loading data into a form (e.g., in a `useEffect` hook), parse the string array from the API into an object array before populating the form with `reset()`.
    2.  **Stringify for Save**: In the `onSubmit` handler, transform the form's object array back into a string array before sending the data to the API.

**Example:**
```typescript
// 1. Parse on load
useEffect(() => {
  if (tour) {
    const parsedData = {
      ...tour,
      tourPackages: (tour.tourPackages || []).map(p => 
        typeof p === 'string' ? JSON.parse(p) : p
      ),
    };
    reset(parsedData);
  }
}, [tour, reset]);

// 2. Stringify on submit
const onSubmit = async (data) => {
  const transformedData = {
    ...data,
    tourPackages: data.tourPackages?.map(pkg => JSON.stringify(pkg)),
  };
  await updateTour(tour.objectId, transformedData);
};
```

### Form Provider Requirement

Any component or modal that uses `react-hook-form`'s context-based features (`useFormField`, `useController`, `useFormContext`) **must** be wrapped in a `<FormProvider {...methods}>` component. This prevents the common "useFormContext is null" runtime error.

### Reusable Uploader Components

-   For single file uploads, use the `SingleImageUploader` component.
-   For multiple file uploads, use the `MultiImageUploader` component.
-   These components are already integrated with the `uploadFile` service and handle the necessary authentication.

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
- **Framework:** Playwright is used for end-to-end (E2E) testing.
- **Test Location:** `playwright/tests`
- **Running Tests:** `npm run test`