import cloudinary from "../config/cloudinary.js";
import fs from "fs/promises";
import { db } from "../config/firebaseAdmin.js";
import { FieldValue } from "firebase-admin/firestore";

const processResumeUpload = async (file, uid) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "traqio/resumes",
      resource_type: "raw",
    });

    const resumeData = {
  originalName: file.originalname,
  filename: file.filename,
  size: file.size,
  mimetype: file.mimetype,
  url: result.secure_url,
  publicId: result.public_id,
  uploadedAt: FieldValue.serverTimestamp(),
};

await db
  .collection("users")
  .doc(uid)
  .collection("resumes")
  .add(resumeData);

 return resumeData;
 
  } finally {
    try {
      await fs.unlink(file.path);
    } catch (error) {
      console.error("Failed to delete temporary resume:", error.message);
    }
  }
};

export { processResumeUpload };