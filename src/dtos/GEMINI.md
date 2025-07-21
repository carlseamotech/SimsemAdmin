# Gemini Context: `src/dtos`

This directory contains the Data Transfer Objects (DTOs) that are used to define the shape of the data that is sent to and received from the API. All DTOs in this project are defined using `zod` schemas to ensure type safety and validation.

## Conventions

-   **File Naming**: DTO files should be named using kebab-case (e.g., `create-experience.dto.ts`).
-   **Schema Naming**: Zod schema variables should be named using camelCase and should have the `Schema` suffix (e.g., `createExperienceSchema`).
-   **Type Naming**: The inferred TypeScript type from a Zod schema should be named using PascalCase and should have the `DTO` suffix (e.g., `CreateExperienceDTO`).
-   **Property Naming**: DTO properties should be named using camelCase.

## Structure

The `src/dtos` directory is organized by feature, with each feature having its own subdirectory.

-   **`experiences/`**: Contains DTOs related to all types of experiences (Custom Tours, Getaway Tours, etc.).
-   **`hosts/`**: Contains DTOs for managing hosts.
-   **`profile/`**: Contains DTOs for user profile updates.
-   **`promo-code/`**: Contains DTOs for creating and managing promotional codes.
-   **`teams/`**: Contains DTOs for team management, such as inviting and accepting invitations.

## Best Practices

-   **Single Source of Truth**: Each DTO file should be the single source of truth for the data shape of a specific API endpoint.
-   **Validation**: Leverage `zod` for robust validation of data sent to the API. This helps prevent errors and ensures data integrity.
-   **Lean DTOs**: Keep DTOs focused on the data required for a specific API endpoint to avoid unnecessary data transfer.