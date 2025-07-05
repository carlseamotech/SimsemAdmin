# Gemini Context: `src/models`

This directory contains the type definitions for the core business entities of the application. These models define the shape of the data as it is used within the application's components and business logic.

## Conventions

-   **Model Naming**: Model files should be named using kebab-case (e.g., `experience.ts`).
-   **Interface Naming**: Interfaces should be named using PascalCase (e.g., `Experience`, `Host`).
-   **Properties**: Interface properties should be named using camelCase.
-   **Relationships**: Relationships between models should be defined using a foreign key (e.g., `guideId` in the `Experience` model).
-   **Enums**: Enums should be used to define a set of named constants (e.g., `ExperienceType`).

## Authentication and Authorization

-   **`User`**: This model represents a Firebase user.
-   **`TeamMember`**: This model represents a team member and includes their role for RBAC.
-   **`Role`**: This enum defines the possible roles for a team member (e.g., `SuperAdmin`, `Admin`, `Editor`).

## Key Models

-   **`ProposedTour`**: This model represents a tour or other experience offered in the application. It corresponds to the `ProposedTour` class in the Parse Server backend. In the UI and display layers, this is referred to as an "Experience."
