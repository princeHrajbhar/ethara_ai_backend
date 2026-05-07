import { asyncHandler } from "../../../utils/asyncHandler.js";

import { ApiResponse } from "../../../utils/ApiResponse.js";

import {
  createTaskService,
  deleteTaskService,
  getProjectTasksService,
  getSingleTaskService,
  updateTaskService,
  updateTaskStatusService,
} from "../services/task.service.js";

export const createTask =
  asyncHandler(async (req, res) => {
    const user = req.user as any;

    const task =
      await createTaskService(
        req.body,
        user.id
      );

    res
      .status(201)
      .json(
        new ApiResponse(
          "Task created successfully",
          task
        )
      );
  });

export const getProjectTasks =
  asyncHandler(async (req, res) => {
    const tasks =
      await getProjectTasksService(
        req.params.projectId as string
      );

    res.json(
      new ApiResponse(
        "Tasks fetched successfully",
        tasks
      )
    );
  });

export const getSingleTask =
  asyncHandler(async (req, res) => {
    const task =
      await getSingleTaskService(
        req.params.taskId as string
      );

    res.json(
      new ApiResponse(
        "Task fetched successfully",
        task
      )
    );
  });

export const updateTask =
  asyncHandler(async (req, res) => {
    const task =
      await updateTaskService(
        req.params.taskId as string,
        req.body
      );

    res.json(
      new ApiResponse(
        "Task updated successfully",
        task
      )
    );
  });

export const deleteTask =
  asyncHandler(async (req, res) => {
    await deleteTaskService(
      req.params.taskId as string
    );

    res.json(
      new ApiResponse(
        "Task deleted successfully"
      )
    );
  });

export const updateTaskStatus =
  asyncHandler(async (req, res) => {
    const user = req.user as any;

    const task =
      await updateTaskStatusService(
        req.params.taskId as string,

        req.body.status,

        user.id
      );

    res.json(
      new ApiResponse(
        "Task status updated successfully",
        task
      )
    );
  });