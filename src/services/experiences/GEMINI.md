# Gemini Context: `src/services/experiences`

This directory handles all API communication related to "Experiences," interacting with the Parse Server backend. The services here are responsible for creating, reading, updating, and deleting various types of tour and meal experiences.

## Files and Endpoints

-   **`custom-tour.ts`**: Manages Custom Tour experiences.
    -   **Endpoint**: `/classes/ProposedTour`
    -   **Methods**: `POST` (Create), `PUT` (Update), `DELETE` (Delete)
    -   **Note**: Payloads for this service must include `"type": "custom"`.

-   **`getaway-tour.ts`**: Manages Getaway Tour experiences.
    -   **Endpoint**: `/classes/ProposedTour`
    -   **Methods**: `POST` (Create), `PUT` (Update), `DELETE` (Delete)
    -   **Note**: Payloads for this service must include `"type": "getaway"`.

-   **`offered-tour.ts`**: Manages Offered Tour experiences that are approved and available to users.
    -   **Endpoint**: `/classes/ProposedTour`
    -   **Methods**: `POST` (Create), `PUT` (Update), `DELETE` (Delete)
    -   **Note**: Payloads for this service must include `"type": "offered"`.

-   **`meal.ts`**: Manages Dining experiences (Selected Meals).
    -   **Endpoint**: `/classes/SelectedMeal`
    -   **Methods**: `GET` (List/Details), `POST` (Create), `PUT` (Update), `DELETE` (Delete)

-   **`library.ts`**: Manages the library of reusable tour, meal, and dish components.
    -   **Library Tours**:
        -   **Endpoint**: `/classes/OfferedTour`
        -   **Methods**: `GET` (List/Details), `POST` (Create), `PUT` (Update)
    -   **Library Meals**:
        -   **Endpoint**: `/classes/OfferedMeal`
        -   **Methods**: `GET` (List/Details), `POST` (Create), `PUT` (Update)
    -   **Library Dishes**:
        -   **Endpoint**: `/classes/OfferedDish`
        -   **Methods**: `GET` (List/Details), `POST` (Create), `PUT` (Update)

## General Experience Endpoints

The services in this directory may also interact with the following general endpoints:

-   **Get All Tour Experiences**: `GET /classes/ProposedTour` (with filters for `type`, `isActive`, `isApproved`).
-   **Get Experience Details**: `GET /classes/ProposedTour/:objectId`
-   **Get Experience Features**: `GET /classes/TourFeature`
