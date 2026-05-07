import { Task } from "../models/task.model.js";

import { ApiError } from "../../../utils/ApiError.js";

import { Project } from "../../project/models/project.model.js";

import { ProjectRole } from "../../project/constants/project.constant.js";

export const createTaskService =
  async (
    payload: any,
    userId: string
  ) => {
    const project =
      await Project.findById(
        payload.projectId
      );

    if (!project) {
      throw new ApiError(
        404,
        "Project not found"
      );
    }

    const adminMember =
      project.members.find(
        (member) =>
          member.user.toString() ===
            userId &&
          member.role ===
            ProjectRole.PROJECT_ADMIN
      );

    const isGlobalAdmin = false;

    if (
      !adminMember &&
      !isGlobalAdmin
    ) {
      throw new ApiError(
        403,
        "Only project admin can assign tasks"
      );
    }

    const task = await Task.create({
      title: payload.title,

      description:
        payload.description,

      dueDate: payload.dueDate,

      priority: payload.priority,

      project: payload.projectId,

      assignedTo:
        payload.assignedTo,

      assignedBy: userId,

      tags: payload.tags || [],

      attachments:
        payload.attachments || [],
    });

    return task;
  };

export const getProjectTasksService =
  async (projectId: string) => {
    const tasks = await Task.find({
      project: projectId,

      isDeleted: false,
    })

      .populate(
        "assignedTo",
        "username email"
      )

      .populate(
        "assignedBy",
        "username email"
      )

      .sort({
        createdAt: -1,
      });

    return tasks;
  };

export const getSingleTaskService =
  async (taskId: string) => {
    const task =
      await Task.findById(taskId)

        .populate(
          "assignedTo",
          "username email"
        )

        .populate(
          "assignedBy",
          "username email"
        );

    if (!task) {
      throw new ApiError(
        404,
        "Task not found"
      );
    }

    return task;
  };

export const updateTaskService =
  async (
    taskId: string,
    payload: any
  ) => {
    const task =
      await Task.findByIdAndUpdate(
        taskId,
        payload,
        {
          new: true,
        }
      );

    return task;
  };

export const deleteTaskService =
  async (taskId: string) => {
    const task =
      await Task.findById(taskId);

    if (!task) {
      throw new ApiError(
        404,
        "Task not found"
      );
    }

    task.isDeleted = true;

    await task.save();

    return null;
  };

export const updateTaskStatusService =
  async (
    taskId: string,
    status: string,
    userId: string
  ) => {
    const task =
      await Task.findById(taskId);

    if (!task) {
      throw new ApiError(
        404,
        "Task not found"
      );
    }

    if (
      task.assignedTo.toString() !==
      userId
    ) {
      throw new ApiError(
        403,
        "Only assigned member can update task status"
      );
    }

    task.status = status as any;

    await task.save();

    return task;
  };