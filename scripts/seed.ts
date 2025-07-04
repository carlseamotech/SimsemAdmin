import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { Role } from "../src/models/role";
import { Permission } from "../src/models/permission";

// Initialize Firebase Admin SDK
const serviceAccount = require("../service-account-key.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = getFirestore();

const superAdminEmail = "superadmin@simsem.com";
const superAdminPassword = "password";

const roles = [
  { name: Role.SuperAdmin, permissions: ["manage-teams", "manage-billing", "manage-settings"] },
  { name: Role.Admin, permissions: ["manage-teams"] },
  { name: Role.Editor, permissions: [] },
];

const permissions: Permission[] = [
  { objectId: "manage-teams", name: "Manage Teams", description: "Invite, edit, and delete team members" },
  { objectId: "manage-billing", name: "Manage Billing", description: "Manage billing and subscription settings" },
  { objectId: "manage-settings", name: "Manage Settings", description: "Manage application settings" },
];

const seed = async () => {
  try {
    // Create super admin user
    const userRecord = await admin.auth().createUser({
      email: superAdminEmail,
      password: superAdminPassword,
      emailVerified: true,
    });

    // Create team member document for super admin
    await db.collection("team").doc(userRecord.uid).set({
      email: superAdminEmail,
      role: Role.SuperAdmin,
      status: "active",
    });

    // Seed roles and permissions
    const batch = db.batch();

    roles.forEach(role => {
      const roleRef = db.collection("roles").doc(role.name);
      batch.set(roleRef, { name: role.name, permissions: role.permissions });
    });

    permissions.forEach(permission => {
      const permissionRef = db.collection("permissions").doc(permission.objectId);
      batch.set(permissionRef, permission);
    });

    await batch.commit();

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seed();
