import { Router } from "express";

import healthRoutes from "./healthRoutes.js";
import resumeRoutes from "./resumeRoutes.js";
import cloudinaryRoutes from "./cloudinaryRoutes.js";
import authRoutes from "./authRoutes.js";

const router = Router();

router.use("/v1/health", healthRoutes);
router.use("/v1/resume", resumeRoutes);
router.use("/v1/cloudinary", cloudinaryRoutes);
router.use("/v1/auth", authRoutes);

export default router;