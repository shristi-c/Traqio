import { getAuth } from "firebase-admin/auth";
import "../config/firebaseAdmin.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is required",
      });
    }

    // Expected format: Bearer <Firebase ID token>
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    // Extract the token
    const idToken = authHeader.split("Bearer ")[1];

    if (!idToken) {
      return res.status(401).json({
        success: false,
        message: "Firebase ID token is required",
      });
    }

    // Verify token using Firebase Admin
    const decodedToken = await getAuth().verifyIdToken(idToken);

    // Attach verified user information to request
    req.user = decodedToken;

    // Continue to the next middleware/controller
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
};

export default authMiddleware;