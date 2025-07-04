# Gemini Context: `src/hooks`

This directory contains custom React hooks for client-side data consumption. These hooks abstract the data fetching logic from the components, using `swr` to provide data, loading states, and error handling.

## Conventions

-   **Hook Naming**: Custom hooks should be prefixed with `use` (e.g., `useExperiences`).
-   **File Naming**: Hook files should be named using kebab-case (e.g., `use-experiences.ts`).
-   **Return Value**: Hooks should return an object containing the following properties:
    -   `data`: The data returned from the API.
    -   `isLoading`: A boolean that is `true` when the data is being fetched.
    -   `isError`: A boolean that is `true` when an error has occurred.
    -   Functions for mutating the data (e.g., `create`, `update`, `delete`).
-   **SWR Key**: The SWR key should be a unique string that identifies the data being fetched. It is recommended to use the API endpoint as the key.
-   **Data Mutation**: When mutating data, the local cache should be updated optimistically to provide a better user experience. The `mutate` function returned by `useSWR` should be used for this purpose.

## Authentication and Authorization

-   **`useAuth`**: This hook provides access to the `AuthContext` and should be used to get the current user's authentication state and role.
-   **`useTeam`**: This hook provides access to the team members data and should be used to manage team members.
