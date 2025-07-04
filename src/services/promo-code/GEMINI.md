# Gemini Context: `src/services/promo-code`

This directory is responsible for managing all API communication related to "Promo Codes." The services here interact with the Parse Server backend to create, retrieve, and update promotional codes.

## Files and Endpoints

-   **`index.ts`**: The main service file for all promo code actions.

    -   **Get Promo Codes**:
        -   **Endpoint**: `GET /classes/PromoCode`
        -   **Description**: Retrieves a list of all promo codes. Can be filtered by code and status.

    -   **Create Promo Code**:
        -   **Endpoint**: `POST /classes/PromoCode`
        -   **Description**: Creates a new promotional code with details such as discount type, value, and expiry date.

    -   **Update Promo Code**:
        -   **Endpoint**: `PUT /classes/PromoCode/:objectId`
        -   **Description**: Updates an existing promo code, often used to change its status (e.g., from active to inactive).
