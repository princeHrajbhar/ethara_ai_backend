import { Router } from "express";

import { protect } from "../../../middlewares/auth.middleware.js";

import { validate } from "../../../middlewares/validate.middleware.js";

import {
  createTask,
  deleteTask,
  getProjectTasks,
  getSingleTask,
  updateTask,
  updateTaskStatus,
} from "../controllers/task.controller.js";

import {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
} from "../validators/task.validation.js";

const router = Router();

router.post(
  "/",
  protect,
  validate(createTaskSchema),
  createTask
);

router.get(
  "/project/:projectId",
  protect,
  getProjectTasks
);

router.get(
  "/:taskId",
  protect,
  getSingleTask
);

router.patch(
  "/:taskId",
  protect,
  validate(updateTaskSchema),
  updateTask
);

router.delete(
  "/:taskId",
  protect,
  deleteTask
);

router.patch(
  "/:taskId/status",
  protect,
  validate(updateTaskStatusSchema),
  updateTaskStatus
);

export default router;