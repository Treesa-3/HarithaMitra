// routes/adminRoutes.js
import express from "express";
import { applyFinesToUsers } from "../utils/applyFines.js";

const router = express.Router();

router.get("/apply-fines", async (req, res) => {
  try {
    await applyFinesToUsers();
    res
      .status(200)
      .json({ status: true, message: "Fines applied successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
