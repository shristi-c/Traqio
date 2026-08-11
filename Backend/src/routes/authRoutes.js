import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import { authTest } from "../controllers/authController.js";

const router = Router();

router.get("/test", authMiddleware, authTest);

export default router;