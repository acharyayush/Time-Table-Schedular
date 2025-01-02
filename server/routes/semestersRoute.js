import express from "express";
import { addSemesterWithFaculty, getSemestersByFaculty } from "../controllers/semestersController.js";
const router = express.Router();
router.get("/:faculty/semesters", getSemestersByFaculty);
router.post("/semesters", addSemesterWithFaculty);
export default router;