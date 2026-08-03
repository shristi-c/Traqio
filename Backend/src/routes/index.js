import { Router } from "express";

import healthRoutes from "./healthRoutes.js";
import resumeRoutes from "./resumeRoutes.js";

const router = Router();

router.use("/v1/health", healthRoutes);
router.use("/v1/resume", resumeRoutes);

export default router;