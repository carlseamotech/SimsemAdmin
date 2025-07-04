# Gemini Context: `src/app/(dashboard)/teams`

This directory contains the feature for managing the admin team.

## 1. Feature Overview

The team management feature allows existing admins to invite new members to the team via email. The invited person receives an invitation link, which they can use to accept the invitation and create their account. This feature will also include Role-Based Access Control (RBAC) to manage permissions for different team members.

## 2. Roles and Permissions

-   **Super Admin:** Can invite, edit, and delete any team member. Has full access to all features.
-   **Admin:** Can invite new members. Can edit and delete members with the "Editor" role.
-   **Editor:** Can manage content (experiences, hosts, etc.) but cannot manage team members.

## 3. Pages

-   **/teams**: The main page for viewing and managing team members. This page will be protected and only accessible to authenticated admins.
-   **/accept-invite**: A public page where an invited user can create their account. This page will use a unique token from the URL query parameters (e.g., `/accept-invite?token=...`) to verify the invitation. Upon successful verification, the user will be prompted to set their password to complete the account creation process.

## 4. Directory Structure

-   **`page.tsx`**: The main page for viewing and managing team members.
-   **`components/`**:
    -   **`team-table.tsx`**: Displays the list of team members, their status (e.g., pending, active), and role.
    -   **`invite-dialog.tsx`**: A dialog for inviting new team members by email.
-   **`services/`**:
    -   **`index.ts`**: Contains the logic for sending invitations, accepting invitations, and fetching team members.
-   **`models/`**:
    -   **`team.ts`**: Defines the data structure for a team member, including their role.

## 5. Invitation Flow

1.  **Invite:** An admin enters the email of a new member in the `InviteDialog`.
2.  **Email:** The system sends an email to the provided address using an SMTP server. The email contains a unique link to the accept invitation page (e.g., `/accept-invite?token=...`).
3.  **Accept:** The new member clicks the link, which takes them to the `accept-invite` page.
4.  **Create Account:** The new member sets their password and submits the form. The system validates the token, creates the new admin user in Firebase, and marks the invitation as accepted.

## 6. Key Technologies

-   **Firebase Authentication:** For user creation and management.
-   **SMTP:** For sending email invitations. Credentials will be stored in environment variables.
-   **React Hook Form & Zod:** For form validation in the invite and accept-invite forms.
-   **SWR:** For data fetching and state management of the team members list.
