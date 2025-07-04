# Gemini Context: `src/services/teams`

This directory handles API communication for the "Teams" feature. The primary responsibility of this service is to manage team member invitations.

## Files and Endpoints

-   **`index.ts`**: The main service file for team-related actions.

    -   **Invite Team Member**:
        -   **Endpoint**: `POST /api/teams/invite`
        -   **Description**: This service calls a local API route (`/api/teams/invite`) which then handles the logic for sending an invitation email to a new team member. This is an exception to the direct Parse Server communication pattern, as it involves server-side logic for sending emails.
