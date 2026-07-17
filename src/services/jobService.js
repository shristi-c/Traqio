import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/**
 * Add a new job application
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

/**
 * Fetch all applications
 */
export const getJobs = async (uid) => {
  try {
    const applicationsRef = collection(
      db,
      "users",
      uid,
      "applications"
    );

    const q = query(
      applicationsRef,
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

/**
 * Fetch a single application
 */
export const getJobById = async (uid, jobId) => {
  try {
    const jobRef = doc(
      db,
      "users",
      uid,
      "applications",
      jobId
    );

    const snapshot = await getDoc(jobRef);

    if (!snapshot.exists()) {
      throw new Error("Application not found.");
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  } catch (error) {
    console.error("Error fetching application:", error);
    throw error;
  }
};

/**
 * Update an application
 */
export const updateJob = async (
  uid,
  jobId,
  applicationData
) => {
  try {
    const jobRef = doc(
      db,
      "users",
      uid,
      "applications",
      jobId
    );

    await updateDoc(jobRef, {
      ...applicationData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating application:", error);
    throw error;
  }
};

/**
 * Delete an application
 */
export const deleteJob = async (uid, jobId) => {
  try {
    const jobRef = doc(
      db,
      "users",
      uid,
      "applications",
      jobId
    );

    await deleteDoc(jobRef);
  } catch (error) {
    console.error("Error deleting application:", error);
    throw error;
  }
};