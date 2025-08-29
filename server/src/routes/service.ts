import { Hono } from "hono";
import { authorization } from "../middlewares/authorization.js";
import {
  createService,
  getService,
  getServiceId,
  updateService,
} from "../controllers/service.controller.js";

const serviceRoute = new Hono();

serviceRoute.post("/", authorization, createService);
serviceRoute.get("/", getService);
serviceRoute.get("/:id", getServiceId);
serviceRoute.put("/:id", authorization, updateService);

export default serviceRoute;
