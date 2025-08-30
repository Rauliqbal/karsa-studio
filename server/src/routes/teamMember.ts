import { Hono } from "hono";
import { authorization } from "../middlewares/authorization.js";
import {
  createTeamMember,
  getTeamMember,
  getTeamMemberById,
} from "../controllers/teamMember.controller.js";

const teamMemberRoute = new Hono();

teamMemberRoute.post("/", authorization, createTeamMember);
teamMemberRoute.get("/", getTeamMember);
teamMemberRoute.get("/:id", getTeamMemberById);

export default teamMemberRoute;
