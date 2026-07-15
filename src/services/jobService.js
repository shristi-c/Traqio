import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

/**
 * Add a new job application for a user.
 *
 * @param {string} uid - Authenticated user's UID
 * @param {Object} applicationData - Form data
 * @returns {Promise<string>} Newly created document ID
 */
export const addJob = async (uid, applicationData) => {
  

  try {
    const applicationsRef = collection(
      db,
      "users",
      uid,
      "applications"
    );

   

    const docRef = await addDoc(applicationsRef, {
      ...applicationData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    

    return docRef.id;
  } catch (error) {
    console.error("Error adding application:", error);
    throw error;
  }
};