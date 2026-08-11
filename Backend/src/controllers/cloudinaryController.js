import ApiResponse from "../utils/ApiResponse.js";
import { testCloudinaryConnection } from "../services/cloudinaryService.js";

const checkCloudinary = async (req, res, next) => {
  try {
    const result = await testCloudinaryConnection();

    res.status(200).json(
      new ApiResponse(
        200,
        true,
        "Cloudinary connection successful",
        result
      )
    );
  } catch (error) {
    next(error);
  }
};

export { checkCloudinary };