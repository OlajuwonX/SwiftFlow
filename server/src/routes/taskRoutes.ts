import { Router } from "express";
import { createTask, getTasks, updateTaskStatus } from "../controllers/taskControllers";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:taskId/status", updateTaskStatus);

export default router;

/* Patch is used for updating*/