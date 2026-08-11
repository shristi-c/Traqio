import cloudinary from "../config/cloudinary.js";

const testCloudinaryConnection = async () => {
  const result = await cloudinary.api.ping();

  return result;
};

export { testCloudinaryConnection };