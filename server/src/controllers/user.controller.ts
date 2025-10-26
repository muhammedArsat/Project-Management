import { NextFunction, Request, Response } from "express";
import prisma from "../configs/postgres.config";
import { HttpError } from "../types/httpErrors";
import { query } from "winston";

//@route localhost:3000/api/v1/users GET
//@desc find all users for admin monitoring
//@access PROTECTED
export const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortBy = req.query.sortBy as string;
    const orderBy = req.query.orderBy as string;
    const search = req.query.search as string;
    const skip = (page - 1) * limit;
    const validFields = ["name", "email", "role", "createdAt"];
    // if (!validFields.includes(sortBy)) {
    //   throw new HttpError("Invalid sort order", 400);
    // }
    const where = search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {};
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: "asc",
        },
      }),
      prisma.user.count({ where }),
    ]);
    if (!users) {
      const error = new HttpError("No users found", 404);
      throw error;
    }
    // console.log(users);

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
      currPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (err) {
    next(err);
  }
};

//@route localhost:3000/api/v1/users/search
//@desc searching users based on user's input
//@access PROTECTED
export const searchUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, id } = req.body;
    const where: any = {};

    if (name) {
      where.name = {
        contains: name as string,
        mode: "insensitive",
      };
    }

    if (id) {
      where.id = id as string;
    }

    const users = await prisma.user.findMany({
      where: where,
    });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (err) {
    next(err);
  }
};
