### Detailed Plan of Action

**Goal:** Address all user feedback within the day, prioritizing critical bug fixes and then moving to feature enhancements.

---

### **Phase 1: Critical Bug Fixes (Highest Priority)**

#### **Task 1: Fix White Screen Error on Host Edit Page**
*   **Problem:** Navigating to a local guide's page results in a white screen with an error, blocking all editing.
*   **Analysis & Plan:**
    1.  **Identify Entry Point:** The error occurs on the dynamic route page for a single host. I will start by examining `src/app/(dashboard)/hosts/[id]/page.tsx`.
    2.  **Trace Data Flow:** I will investigate the data fetching process for a single host. This involves:
        *   The `useHosts` hook (`src/hooks/use-hosts.ts`) to see how the specific host's data is requested and managed.
        *   The `hosts` service (`src/services/hosts/index.ts`) to check the API call (`GET /classes/ServiceProvider/:objectId`).
    3.  **Inspect Rendering Logic:** I will review the `[id]/page.tsx` component and its children (e.g., `host-form.tsx`, `payment-section.tsx`) to find where the data is consumed. The error is likely caused by attempting to access a property on `null` or `undefined` data before it has loaded.
    4.  **Implement the Fix:**
        *   Add a loading state to the UI to prevent rendering components until the host data is available.
        *   Use optional chaining (`?.`) and provide default values where appropriate to make the rendering more resilient to missing data.
        *   Ensure any errors from the API call are caught and handled gracefully.

#### **Task 2: Fix "Unable to Edit Tour Details"**
*   **Problem:** The UI for editing tour details is not functioning correctly.
*   **Analysis & Plan:**
    1.  **Locate the UI:** This functionality is likely within the host details page (`src/app/(dashboard)/hosts/[id]/page.tsx`) or a related experience component.
    2.  **Examine Form State:** I will check the `isEditing` state in the `useHostForm` hook (`src/app/(dashboard)/hosts/components/host-form.tsx`) to ensure form fields are correctly enabled/disabled.
    3.  **Verify Save Logic:** I will inspect the `handleSave` function to confirm it's being called correctly on button click and that it's sending the correct data.
    4.  **Check Update Endpoint:** I will trace the `save` action to the relevant service in `src/services/experiences/` and verify the `PUT` request to `/classes/ProposedTour/:objectId` is correctly formatted.

---

### **Phase 2: Feature Implementation & Enhancement**

#### **Task 3: Display All Tour Types (User-Proposed & Admin-Proposed)**
*   **Problem:** The "Tour Experience List" only shows admin-proposed tours.
*   **Analysis & Plan:**
    1.  **Find the Data Fetching Logic:** I will go to `src/hooks/use-experiences.ts`.
    2.  **Modify the API Query:** I will find the `getExperiences` function call and trace it to the service layer (`src/services/experiences/`). I will then modify the API call to the `/classes/ProposedTour` endpoint to remove any filters that restrict the `type` to only admin-proposed tours.

#### **Task 4: Implement Search and Filtering**
*   **Problem:** Lack of search and filter capabilities for hosts and experiences.
*   **Analysis & Plan (for both Hosts and Experiences pages):**
    1.  **Add UI Controls:**
        *   On `src/app/(dashboard)/experiences/page.tsx`, I will add `Input` components for "Experience ID" and "Local host ID", and a `Select` for "Country".
        *   On `src/app/(dashboard)/hosts/page.tsx`, I will add `Input` components for "ID", "Name", and "Email", and a `Select` for "Country".
    2.  **Manage Filter State:** I will use `useState` in each page component to hold the current values of the search and filter inputs.
    3.  **Update Hooks:** I will update `useExperiences` and `useHosts` to accept these new filter values as arguments.
    4.  **Update Services:** I will pass the filter values from the hooks to the service functions. These values will be used to construct the `where` parameter in the Parse Server API calls, allowing the backend to perform the filtering.

#### **Task 5: Display Total Item Counts**
*   **Problem:** The total number of hosts and experiences is not displayed.
*   **Analysis & Plan:**
    1.  **Confirm Data Availability:** The project's `GEMINI.md` states that list query responses include a `count` property. I will confirm that the `useHosts` and `useExperiences` hooks return this value.
    2.  **Render the Count:** I will add a simple UI element (e.g., a `p` or `h3` tag) to the `hosts/page.tsx` and `experiences/page.tsx` files to display the `count` variable returned from their respective hooks.