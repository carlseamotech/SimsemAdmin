# Gemini Context: `src/components`

This directory contains all the React components used in the application. The components are organized by feature to ensure a clear and scalable structure.

## Directory Structure

-   **`ui/`**: This subdirectory contains the core UI components that are used throughout the application, such as buttons, inputs, and cards. These components are built using `shadcn/ui` and are considered the building blocks of the application's UI.
-   **`common/`**: This subdirectory contains components that are used across multiple features, such as the `Header` and `Sidebar`. These components are not specific to any single feature and are shared across the application.
-   **`{feature}/`**: Each feature has its own directory, which contains all the components that are specific to that feature. For example, all components related to experiences are located in `src/components/experiences`.
-   **`auth/`**: This subdirectory contains components related to authentication, such as the `AuthGuard` component.

## Conventions

-   **Component Naming**: Component files should be named using PascalCase (e.g., `MyComponent.tsx`).
-   **Props**: Component props should be defined in an interface with the `Props` suffix (e.g., `MyComponentProps`).
-   **Styling**: Components should be styled using Tailwind CSS. The `clsx` and `tailwind-merge` utilities should be used to merge class names.
-   **State Management**: For local component state, use the `useState` and `useReducer` hooks. For global state, use the `useContext` hook or a state management library like `zustand`.
-   **Data Fetching**: Data fetching should be handled by the custom hooks in the `src/hooks` directory. Components should not directly interact with the API.
-   **Authorization**: Components that require specific roles or permissions should use the `useAuth` hook to check the user's role and render content accordingly.

## Adding New UI Components

When adding new UI components from `shadcn/ui`, use the following command:

```bash
npx shadcn@latest add <component-name>
```
This ensures that the component is added with the correct styling and configuration, consistent with the rest of the project. Do not create these components manually.
