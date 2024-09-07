import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";
import { config } from "dotenv";

// Load .env file
config();

// Get environment variables
const { FB_CLIENT_EMAIL, FB_PRIVATE_KEY, FB_PROJECT_ID } = process.env;

// Check that environment variables are properly loaded
if (!FB_CLIENT_EMAIL || !FB_PRIVATE_KEY || !FB_PROJECT_ID) {
    throw new Error('Missing Firebase Admin environment variables');
}

// Log environment variables to ensure they're loaded (no actual private key shown)
console.log("Firebase Admin environment variables:", {
    projectId: FB_PROJECT_ID,
    clientEmail: FB_CLIENT_EMAIL,
    privateKey: FB_PRIVATE_KEY ? "Private key loaded" : "Private key missing"
});

let app;

try {
    console.log("Initializing Firebase Admin...");

    if (!admin.apps || !Array.isArray(admin.apps) || admin.apps.length === 0) {
        app = admin.initializeApp({
            credential: admin.credential.cert({
                projectId: FB_PROJECT_ID,
                clientEmail: FB_CLIENT_EMAIL,
                privateKey: FB_PRIVATE_KEY.replace(/\\n/g, '\n') // Converts `\n` to newlines
            })
        });
        console.log("Firebase Admin initialized successfully.");
    } else {
        app = admin.app(); // Reuse the existing app
        console.log("Firebase Admin app already initialized.");
    }
} catch (error) {
    console.error('Firebase Admin initialization error:', error);
    throw error;
}

// Export Firebase Admin Auth instance
export const adminAuth = getAuth(app);