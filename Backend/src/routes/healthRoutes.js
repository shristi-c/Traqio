import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Traqio Backend Running 🚀",
    timestamp: new Date(),
  });
});

export default router;