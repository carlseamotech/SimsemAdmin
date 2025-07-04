# Implementation Plan

This document outlines the plan to implement the API services and hooks based on the `admin-panel-collection.json`.

## 1. Project Setup

- **Install Dependencies:** Add the `swr` library for data fetching hooks.
  ```bash
  npm install swr
  ```

## 2. Folder Structure

Create the following directory structure to organize the services and hooks:

```
src/
├── services/
│   ├── api.ts
│   ├── experiences/
│   │   ├── custom-tour.ts
│   │   ├── getaway-tour.ts
│   │   ├── offered-tour.ts
│   │   ├── meal.ts
│   │   └── library.ts
│   ├── promo-code/
│   │   └── index.ts
│   └── hosts/
│       └── index.ts
└── hooks/
    ├── use-experiences.ts
    ├── use-promo-codes.ts
    └── use-hosts.ts
```

## 3. Environment Variables

- Create a `.env.local` file in the root of the project.
- Add the following environment variables from `collections/env-variables.json`:
  ```
  NEXT_PUBLIC_PARSE_APP_ID=your-app-id
  NEXT_PUBLIC_PARSE_API_KEY=your-api-key
  NEXT_PUBLIC_BASE_URL=your-base-url
  ```

## 4. API Service Implementation (`src/services`)

- **`src/services/api.ts`:** Create a centralized API client using `fetch` to handle requests to the Parse API. This client will include headers for `X-Parse-Application-Id` and `X-Parse-REST-API-Key`.

- **`src/services/experiences/`:** Implement server-side functions for each experience type (Custom Tour, Getaway Tour, Offered Tour, Meal, Library). Each file will contain functions for `GET`, `POST`, `PUT`, and `DELETE` requests as defined in the collection.

- **`src/services/promo-code/index.ts`:** Implement server-side functions for managing promo codes.

- **`src/services/hosts/index.ts`:** Implement server-side functions for managing hosts.

## 5. SWR Hooks Implementation (`src/hooks`)

- **`src/hooks/use-experiences.ts`:** Create SWR hooks to consume the experience services. These hooks will handle client-side data fetching, caching, and revalidation.
  - `useCustomTours`, `useGetawayTours`, `useOfferedTours`, `useMeals`, `useLibraryTours`, `useLibraryMeals`, `useLibraryDishes`

- **`src/hooks/use-promo-codes.ts`:** Create SWR hooks for promo code data.
  - `usePromoCodes`

- **`src/hooks/use-hosts.ts`:** Create SWR hooks for host data.
  - `useHosts`, `useHost`

## 6. Component Integration

- Update the existing components in `src/components/` to use the new SWR hooks for data fetching.
- Replace any mock data or direct `fetch` calls with the SWR hooks.
- Ensure that forms and tables are updated to work with the new data structure.

## 7. Testing

- Write unit tests for the API services to ensure they are correctly formatting requests and handling responses.
- Write integration tests for the components to verify that they are correctly fetching and displaying data from the API.
