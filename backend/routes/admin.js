import express from "express";
import { getAdminData, putAdminData } from "../controllers/adminController.js";

const router = express.Router();

router.get("/data", getAdminData);
router.put("/data", putAdminData);

export default router;
