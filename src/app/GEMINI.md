# Gemini Context: `src/app`

This directory contains all the pages and routes for the application, following the Next.js App Router conventions.

## Directory Structure

-   **`layout.tsx`**: This file defines the root layout for the application. It includes the `Sidebar` and a `main` element that wraps the page content.
-   **`page.tsx`**: This file is the entry point for the home page.
-   **`globals.css`**: This file contains the global CSS styles for the application.
-   **`{feature}/`**: Each feature has its own directory, which contains the page or pages for that feature. For example, the hosts page is located at `src/app/hosts/page.tsx`.

## Conventions

-   **Page Naming**: Page files should be named `page.tsx`.
-   **Route Naming**: Routes should be named using kebab-case (e.g., `/hosts`, `/experiences`).
-   **Dynamic Routes**: Dynamic routes should be created using the `[id]` syntax. For example, the route for a single host is `/hosts/[id]`.
-   **Data Fetching**: Data fetching should be done in the page component using the custom hooks from the `src/hooks` directory.
-   **State Management**: Page-level state should be managed using the `useState` and `useReducer` hooks. For global state, use the `useContext` hook or a state management library like `zustand`.
