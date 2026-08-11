import cloudinary from "../config/cloudinary.js";
import fs from "fs/promises";

const processResumeUpload = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "traqio/resumes",
      resource_type: "raw",
    });

    return {
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: result.secure_url,
      publicId: result.public_id,
    };
  } finally {
    try {
      await fs.unlink(file.path);
    } catch (error) {
      console.error("Failed to delete temporary resume:", error.message);
    }
  }
};

export { processResumeUpload };