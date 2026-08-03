import ApiResponse from "../utils/ApiResponse.js";
import { getHealthStatus } from "../services/healthService.js";

const healthCheck = (req, res) => {
  const data = getHealthStatus();

  res.status(200).json(
    new ApiResponse(
      200,
      true,
      data.message,
      {
        environment: data.environment,
        timestamp: data.timestamp,
      }
    )
  );
};

export { healthCheck };