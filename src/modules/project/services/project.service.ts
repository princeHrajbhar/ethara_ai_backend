import { Project } from "../models/project.model.js";

import {
  ProjectRole,
  ProjectStatus,
} from "../constants/project.constant.js";

import { ApiError } from "../../../utils/ApiError.js";

import { buildProjectQuery } from "../utils/projectQueryBuilder.js";
import { User } from "../../user/user.model.js";

import { UserRole } from "../../user/user.interface.js";

export const createProjectService =
  async (
    payload: any,
    userId: string
  ) => {
    const existingProject =
      await Project.findOne({
        $or: [
          {
            slug: payload.slug,
          },

          {
            projectName:
              payload.projectName,
          },
        ],
      });

    if (existingProject) {
      throw new ApiError(
        400,
        "Project already exists"
      );
    }

    /**
     * CREATE PROJECT
     */

    const project =
      await Project.create({
        ...payload,

        owner: userId,

        members: [
          {
            user: userId,

            role:
              ProjectRole.PROJECT_ADMIN,
          },
        ],
      });

    /**
     * UPDATE USER ROLE
     */

    await User.findByIdAndUpdate(
      userId,
      {
        role: UserRole.ADMIN,
      }
    );

    return project;
  };

export const getAllProjectsService =
  async (query: any) => {
    const filter =
      buildProjectQuery(query);

    const page =
      Number(query.page) || 1;

    const limit =
      Number(query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const projects =
      await Project.find(filter)

        .populate(
          "owner",
          "username email"
        )

        .populate(
          "members.user",
          "username email"
        )

        .sort({
          createdAt: -1,
        })

        .skip(skip)

        .limit(limit);

    const total =
      await Project.countDocuments(
        filter
      );

    return {
      projects,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(
          total / limit
        ),
      },
    };
  };

export const getSingleProjectService =
  async (projectId: string) => {
    const project =
      await Project.findById(projectId)

        .populate(
          "owner",
          "username email"
        )

        .populate(
          "members.user",
          "username email"
        );

    if (!project) {
      throw new ApiError(
        404,
        "Project not found"
      );
    }

    return project;
  };

export const updateProjectService =
  async (
    projectId: string,
    payload: any
  ) => {
    const project =
      await Project.findByIdAndUpdate(
        projectId,
        payload,
        {
          new: true,
        }
      );

    return project;
  };

export const deleteProjectService =
  async (projectId: string) => {
    const project =
      await Project.findById(projectId);

    if (!project) {
      throw new ApiError(
        404,
        "Project not found"
      );
    }

    project.isDeleted = true;

    await project.save();

    return null;
  };

export const addProjectMemberService =
  async (
    projectId: string,
    payload: any
  ) => {
    const project =
      await Project.findById(projectId);

    if (!project) {
      throw new ApiError(
        404,
        "Project not found"
      );
    }

    const existingMember =
      project.members.find(
        (member) =>
          member.user.toString() ===
          payload.userId
      );

    if (existingMember) {
      throw new ApiError(
        400,
        "User already member"
      );
    }

    project.members.push({
      user: payload.userId,

      role:
        payload.role ||
        ProjectRole.PROJECT_MEMBER,

      joinedAt: new Date(),
    });

    await project.save();

    return project;
  };

  export const getProjectMembersService =
  async (projectId: string) => {
    const project =
      await Project.findById(projectId)

        .populate(
          "members.user",
          "username email role"
        )

        .select("members");

    if (!project) {
      throw new ApiError(
        404,
        "Project not found"
      );
    }

    return project.members;
  };

  export const updateProjectMemberRoleService =
  async (
    projectId: string,
    memberId: string,
    role: ProjectRole
  ) => {
    const project =
      await Project.findById(projectId);

    if (!project) {
      throw new ApiError(
        404,
        "Project not found"
      );
    }

    const member =
      project.members.find(
        (member) =>
          member.user.toString() ===
          memberId
      );

    if (!member) {
      throw new ApiError(
        404,
        "Member not found"
      );
    }

    member.role = role;

    await project.save();

    return project;
  };


  export const removeProjectMemberService =
  async (
    projectId: string,
    memberId: string
  ) => {
    const project =
      await Project.findById(projectId);

    if (!project) {
      throw new ApiError(
        404,
        "Project not found"
      );
    }

    const isOwner =
      project.owner.toString() ===
      memberId;

    if (isOwner) {
      throw new ApiError(
        400,
        "Owner cannot be removed"
      );
    }

    project.members =
      project.members.filter(
        (member) =>
          member.user.toString() !==
          memberId
      );

    await project.save();

    return project;
  };