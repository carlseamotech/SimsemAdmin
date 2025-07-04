# Gemini Context: `src/services/hosts`

This directory contains the services for managing "Local Host" data. These services interact with the Parse Server backend to handle host information, payment details, and account status.

## Files and Endpoints

-   **`index.ts`**: The primary service file for all Local Host-related actions.

    -   **Get All Local Hosts**:
        -   **Endpoint**: `GET /classes/ServiceProvider`
        -   **Description**: Retrieves a list of all local hosts. Can be filtered by verification status and country.

    -   **Get Local Host Info**:
        -   **Endpoint**: `GET /classes/ServiceProvider/:objectId`
        -   **Description**: Fetches detailed information for a single local host.

    -   **Update Local Host Info**:
        -   **Endpoint**: `PUT /classes/ServiceProvider/:objectId`
        -   **Description**: Updates a local host's profile information, such as their city, bio, and languages.

    -   **Update Local Host Payment**:
        -   **Endpoint**: `PUT /classes/ServiceProviderPayment/:objectId`
        -   **Description**: Updates the payment details (e.g., IBAN, bank information) for a local host.

    -   **Delete Local Host**:
        -   **Endpoint**: `POST /functions/deleteUser`
        -   **Description**: Deletes a user account (service provider) from the system by calling a custom cloud function.
        -   **Payload**: Requires the user's `phone` and `userType` (`service_provider`).
