import { Router } from "express";
import { createTask, getTasks, getUserTasks, updateTaskStatus } from "../controllers/taskControllers";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:taskId/status", updateTaskStatus);
router.get('/user/:userId', getUserTasks);

export default router;

/* Patch is used for updating*/