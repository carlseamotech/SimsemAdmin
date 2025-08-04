# Architectural Plan: Experience Library

This document outlines the architectural and implementation plan for the "Experience Library" feature.

## 1. High-Level Summary

The Experience Library is a centralized repository within the admin panel for creating, managing, and reusing common components of travel experiences. The library will initially support three types of items: "Tours," "Meals," and "Dishes." This feature will streamline the creation of new `ProposedTours` (Experiences) by allowing admins to select and assemble pre-defined library items.

The architecture consists of:
- A new `Library` class (table) in the Parse Server database to store the library items.
- A set of RESTful endpoints to perform CRUD operations on library items.
- A dedicated service layer in the frontend to interact with the API.
- A new set of SWR hooks for client-side state management and data fetching.
- A new section in the admin panel with a dedicated page for managing the library, including a data table, and forms for creating and editing library items.

---

## 2. API Documentation (API First)

The following defines the API contract for the `Library` resource, which will be managed via the Parse Server API.

**Base URL:** `/parse/classes/Library`

### Data Models (DTOs)

#### `LibraryItem`
This is the core object representing an item in the library.

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `objectId` | `string` | Unique identifier (auto-generated). | Yes |
| `name` | `string` | The name of the library item. | Yes |
| `type` | `string` | The type of item. Enum: `"TOUR"`, `"MEAL"`, `"DISH"`. | Yes |
| `status` | `string` | The status of the item. Enum: `"ACTIVE"`, `"ARCHIVED"`. | Yes |
| `details` | `object` | A JSON object containing type-specific fields. | No |
| `createdAt` | `string` | ISO 8601 timestamp (auto-generated). | Yes |
| `updatedAt` | `string` | ISO 8601 timestamp (auto-generated). | Yes |

#### `details` Object for `type: "TOUR"`

| Field | Type | Description |
| :--- | :--- | :--- |
| `duration` | `string` | e.g., "4 hours", "Full day". |
| `description` | `string` | A brief description of the tour. |
| `itinerary` | `array` | An array of itinerary steps (similar to `ProposedTour`). |

#### `details` Object for `type: "MEAL"`

| Field | Type | Description |
| :--- | :--- | :--- |
| `description` | `string` | A brief description of the meal. |
| `dishes` | `array` | An array of pointers/references to `Library` items of type `DISH`. |

#### `details` Object for `type: "DISH"`

| Field | Type | Description |
| :--- | :--- | :--- |
| `description` | `string` | A brief description of the dish. |
| `ingredients` | `array` | A list of ingredients. |

---

### API Endpoints

#### 1. Create Library Item
- **Method:** `POST`
- **Path:** `/parse/classes/Library`
- **Request Body:** `Omit<LibraryItem, 'objectId' | 'createdAt' | 'updatedAt'>`
- **Response (201 Created):**
  ```json
  {
    "objectId": "pQ8ZJ82A1p",
    "createdAt": "2025-08-04T10:30:00.000Z"
  }
  ```

#### 2. Get Library Items
- **Method:** `GET`
- **Path:** `/parse/classes/Library`
- **Query Parameters:**
  - `where={"name":{"$regex":"^.*name.*","$options":"i"},"type":"TOUR"}` (For searching by name and filtering by type)
  - `order=-updatedAt` (To sort by last modified)
  - `keys=objectId,name,type,details.duration,updatedAt` (To select specific fields for the list view)
- **Response (200 OK):**
  ```json
  {
    "results": [
      {
        "objectId": "pQ8ZJ82A1p",
        "name": "Historic City Walk",
        "type": "TOUR",
        "updatedAt": "2025-08-04T11:00:00.000Z",
        "details": {
          "duration": "3 hours"
        }
      }
    ]
  }
  ```

#### 3. Get Library Item by ID
- **Method:** `GET`
- **Path:** `/parse/classes/Library/{objectId}`
- **Response (200 OK):** `LibraryItem`

#### 4. Update Library Item
- **Method:** `PUT`
- **Path:** `/parse/classes/Library/{objectId}`
- **Request Body:** `Partial<Omit<LibraryItem, 'objectId' | 'createdAt' | 'updatedAt'>>`
- **Response (200 OK):**
  ```json
  {
    "updatedAt": "2025-08-04T12:00:00.000Z"
  }
  ```

#### 5. Delete Library Item
- **Method:** `DELETE`
- **Path:** `/parse/classes/Library/{objectId}`
- **Response (200 OK):** `{}`

---

## 3. Micro-Task Breakdown

### Phase 1: Database and Models
- [ ] **Task 1.1:** Define and create the `Library` class (schema) in the Parse Server dashboard with the fields specified in the API documentation.
- [ ] **Task 1.2:** Create a new model file `src/models/library.ts` to define the `LibraryItem` and related `details` types in TypeScript.
- [ ] **Task 1.3:** Create a new DTO file `src/dtos/library.ts` for request and response payloads.

### Phase 2: Backend Services (Frontend)
- [ ] **Task 2.1:** Create a new service file `src/services/library.ts`.
- [ ] **Task 2.2:** Implement `createLibraryItem(data: CreateLibraryItemDto)` function to call the `POST` endpoint.
- [ ] **Task 2.3:** Implement `getLibraryItems(params)` function to call the `GET` endpoint with support for search and filter query parameters.
- [ ] **Task 2.4:** Implement `getLibraryItemById(id: string)` function.
- [ ] **Task 2.5:** Implement `updateLibraryItem(id: string, data: UpdateLibraryItemDto)` function.
- [ ] **Task 2.6:** Implement `deleteLibraryItem(id: string)` function.

### Phase 3: Frontend Hooks (SWR)
- [ ] **Task 3.1:** Create a new hook file `src/hooks/use-library-items.ts`.
- [ ] **Task 3.2:** Implement the `useLibraryItems()` hook, which uses the `getLibraryItems` service. It should manage SWR state, caching, and expose methods for filtering and searching.
- [ ] **Task 3.3:** Create a new hook file `src/hooks/use-library-item.ts` to fetch a single item by ID using the `getLibraryItemById` service.

### Phase 4: Frontend UI Implementation
- [ ] **Task 4.1:** Add a new "Library" link to the main sidebar navigation component.
- [ ] **Task 4.2:** Create the main library page at `src/app/(dashboard)/library/page.tsx`. This page will contain the search/filter controls and the data table.
- [ ] **Task 4.3:** Create the library data table component in `src/components/features/library/library-table.tsx`.
    - It will use the `useLibraryItems` hook to get data.
    - It will use the `shadcn/ui` Table component.
    - Columns: Name, Type, Duration (for Tours), Last Modified.
    - Actions: Edit and Delete buttons for each row.
- [ ] **Task 4.4:** Create the "Create/Edit Library Item" form component in `src/components/features/library/library-form.tsx`.
    - This will be a modal or a separate page.
    - It will use `react-hook-form` and `zod` for validation.
    - The form fields will dynamically change based on the selected "Type" (Tour, Meal, Dish).
    - It will use the `createLibraryItem` and `updateLibraryItem` service functions on submit.
- [ ] **Task 4.5:** Implement the "Delete Library Item" confirmation dialog, which will be triggered from the data table and will call the `deleteLibraryItem` service function.
- [ ] **Task 4.6:** Integrate the form and table components into the main library page. The "Create New" button will open the form, and the "Edit" button will open the form pre-filled with data from `useLibraryItem`.
