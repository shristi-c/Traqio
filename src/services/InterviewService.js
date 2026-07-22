import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/**
 * Add Interview
 */
export const addInterview = async (uid, interviewData) => {
  try {
    const interviewsRef = collection(
      db,
      "users",
      uid,
      "interviews"
    );

    const docRef = await addDoc(interviewsRef, {
      ...interviewData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding interview:", error);
    throw error;
  }
};

/**
 * Get All Interviews
 */
export const getInterviews = async (uid) => {
  try {
    const interviewsRef = collection(
      db,
      "users",
      uid,
      "interviews"
    );

    const q = query(
      interviewsRef,
      orderBy("interviewDate", "asc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching interviews:", error);
    throw error;
  }
};

/**
 * Get One Interview
 */
export const getInterviewById = async (
  uid,
  interviewId
) => {
  try {
    const interviewRef = doc(
      db,
      "users",
      uid,
      "interviews",
      interviewId
    );

    const snapshot = await getDoc(interviewRef);

    if (!snapshot.exists()) {
      throw new Error("Interview not found.");
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  } catch (error) {
    console.error("Error fetching interview:", error);
    throw error;
  }
};

/**
 * Update Interview
 */
export const updateInterview = async (
  uid,
  interviewId,
  interviewData
) => {
  try {
    const interviewRef = doc(
      db,
      "users",
      uid,
      "interviews",
      interviewId
    );

    await updateDoc(interviewRef, {
      ...interviewData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating interview:", error);
    throw error;
  }
};

/**
 * Delete Interview
 */
export const deleteInterview = async (
  uid,
  interviewId
) => {
  try {
    const interviewRef = doc(
      db,
      "users",
      uid,
      "interviews",
      interviewId
    );

    await deleteDoc(interviewRef);
  } catch (error) {
    console.error("Error deleting interview:", error);
    throw error;
  }
};
/**
 * Get Upcoming Interviews
 */
export const getUpcomingInterviews = async (uid) => {
  try {
    const interviews = await getInterviews(uid);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return interviews
      .filter((interview) => {
        if (!interview.interviewDate) return false;

        const interviewDate = new Date(interview.interviewDate);
        interviewDate.setHours(0, 0, 0, 0);

        return (
          interviewDate >= today &&
          interview.status === "Scheduled"
        );
      })
      .sort(
        (a, b) =>
          new Date(a.interviewDate) -
          new Date(b.interviewDate)
      )
      .slice(0, 5);
  } catch (error) {
    console.error("Error fetching upcoming interviews:", error);
    throw error;
  }
};