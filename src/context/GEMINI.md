# Gemini Context: `src/context`

This directory contains the React contexts and providers that are used to share state across the application.

## Conventions

-   **Context Naming**: Context files should be named using kebab-case (e.g., `auth-context.tsx`).
-   **Provider Naming**: Provider components should be named using PascalCase and should have the `Provider` suffix (e.g., `AuthProvider`).
-   **Hook Naming**: Custom hooks for consuming contexts should be prefixed with `use` and should have the `Context` suffix (e.g., `useAuthContext`).
-   **Directory Structure**: Each context should have its own file that exports the context, provider, and consumer hook.

## Authentication

The `AuthContext` is responsible for managing the user's authentication state. It uses the `onAuthStateChanged` listener from the Firebase SDK to keep the user's state in sync with Firebase. The context also provides `signIn` and `signOut` functions that call the `authService`.

## Best Practices

-   **Keep Contexts Small**: Avoid creating a single, large context for the entire application. Instead, create smaller, more focused contexts for each feature or piece of state.
-   **Use `useMemo` and `useCallback`**: To prevent unnecessary re-renders, wrap the context value in a `useMemo` hook and any functions in a `useCallback` hook.
-   **Provide a Default Value**: Always provide a default value to the `createContext` function. This will prevent errors when a component tries to consume a context that has not been provided.
-   **Colocate Providers**: Place the provider as close as possible to the components that need to consume the context. This will prevent unnecessary re-renders of components that do not need the context.
