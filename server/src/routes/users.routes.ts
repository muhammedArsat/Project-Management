import express from "express";
import { findAllUsers, searchUsers } from "../controllers/user.controller";
import {
  adminAndOwnerProtectedMiddleware,
  adminProtectedMiddleware,
  protectedMiddleware,
} from "../middlewares/protected.middleware";

const router = express.Router();

router.get("/", protectedMiddleware, adminProtectedMiddleware, findAllUsers);
router.get(
  "/search",
  protectedMiddleware,
  adminAndOwnerProtectedMiddleware,
  searchUsers
);

export default router;
