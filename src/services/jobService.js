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

/**
 * Fetch analytics data
 */
export const getAnalyticsData = async (uid) => {
  try {
    const applications = await getJobs(uid);

    const totalApplications = applications.length;

    const interviews = applications.filter(
      (job) => job.status === "Interview"
    ).length;

    const offers = applications.filter(
      (job) => job.status === "Offer"
    ).length;

    const rejections = applications.filter(
      (job) => job.status === "Rejected"
    ).length;

    const responseRate =
      totalApplications === 0
        ? 0
        : Math.round(
            ((interviews + offers + rejections) /
              totalApplications) *
              100
          );

    /* -----------------------------
       Status Distribution
    ------------------------------*/

    const statusCounts = {};

    applications.forEach((job) => {
      const status = job.status || "Unknown";

      statusCounts[status] =
        (statusCounts[status] || 0) + 1;
    });

    const statusDistribution = Object.entries(
      statusCounts
    ).map(([name, value]) => ({
      name,
      value,
    }));

    /* -----------------------------
       Monthly Applications
    ------------------------------*/

    const monthlyCounts = {};

    applications.forEach((job) => {
      if (!job.appliedDate) return;

      const date = new Date(job.appliedDate);

      const month = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      monthlyCounts[month] =
        (monthlyCounts[month] || 0) + 1;
    });

    const monthlyApplications = Object.entries(monthlyCounts)
  .map(([month, applications]) => ({
    month,
    applications,
    date: new Date(month),
  }))
  .sort((a, b) => a.date - b.date)
  .map(({ month, applications }) => ({
    month,
    applications,
  }));

    return {
      totalApplications,
      interviews,
      offers,
      rejections,
      responseRate,
      statusDistribution,
      monthlyApplications,
    };
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw error;
  }
};