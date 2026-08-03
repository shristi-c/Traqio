import ApiResponse from "../utils/ApiResponse.js";

const uploadResume = (req, res) => {
  if (!req.file) {
    return res.status(400).json(
      new ApiResponse(
        400,
        false,
        "No file uploaded"
      )
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      true,
      "Resume uploaded successfully",
      {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
      }
    )
  );
};

export { uploadResume };