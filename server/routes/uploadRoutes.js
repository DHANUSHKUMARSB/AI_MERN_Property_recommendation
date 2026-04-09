import express from "express";
import multer from "multer";
import { uploadCSV } from "../controllers/uploadController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

router.post("/", upload.single("file"), uploadCSV);

export default router;
