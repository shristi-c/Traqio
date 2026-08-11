import { Router } from "express";
import { checkCloudinary } from "../controllers/cloudinaryController.js";

const router = Router();

router.get("/test", checkCloudinary);

export default router;