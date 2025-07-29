import { Router } from "express";

const router = Router();

// Example placeholder route
router.get("/", (req, res) => {
  res.json({ message: "User route working!" });
});

export default router;
