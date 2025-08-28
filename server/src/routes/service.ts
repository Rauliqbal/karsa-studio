import { Hono } from "hono";
import { authorization } from "../middlewares/authorization.js";
import { createService } from "../controllers/service.controller.js";

const serviceRoute = new Hono();

serviceRoute.post("/service", authorization, createService);

export default serviceRoute;
