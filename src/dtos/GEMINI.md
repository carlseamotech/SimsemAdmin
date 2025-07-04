# Gemini Context: `src/dtos`

This directory contains the Data Transfer Objects (DTOs) that are used to define the shape of the data that is sent to and received from the API.

## Conventions

-   **DTO Naming**: DTO files should be named using kebab-case (e.g., `create-experience-dto.ts`).
-   **Interface Naming**: DTO interfaces should be named using PascalCase and should have the `DTO` suffix (e.g., `CreateExperienceDTO`).
-   **Property Naming**: DTO properties should be named using camelCase.
-   **Read-Only Properties**: For data that is only read from the API, use the `readonly` modifier to prevent accidental mutations.

## Authentication and Authorization

-   **`SignInDTO`**: Defines the shape of the data for the sign-in API endpoint.
-   **`InviteTeamMemberDTO`**: Defines the shape of the data for inviting a new team member.
-   **`AcceptInviteDTO`**: Defines the shape of the data for accepting a team invitation.

## Best Practices

-   **Be Specific**: Create a new DTO for each API endpoint. This will ensure that the data is clearly defined and that there are no conflicts between different endpoints.
-   **Use `zod` for Validation**: For data that is sent to the API, use `zod` to create a schema that can be used to validate the data before it is sent. This will help to prevent errors and ensure that the data is in the correct format.
-   **Keep DTOs Lean**: DTOs should only contain the data that is necessary for the API endpoint. Avoid including any extra data that is not needed.
