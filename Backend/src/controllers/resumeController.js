import ApiResponse from "../utils/ApiResponse.js";
import { processResumeUpload } from "../services/resumeService.js";

const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json(
        new ApiResponse(
          400,
          false,
          "No file uploaded"
        )
      );
    }

   console.log("Authenticated User:", req.user);

const resume = await processResumeUpload(req.file, req.user.uid);

    return res.status(200).json(
      new ApiResponse(
        200,
        true,
        "Resume uploaded successfully",
        resume
      )
    );
  } catch (error) {
    next(error);
  }
};

export { uploadResume };