import { Hono } from "hono";
import { authorization } from "../middlewares/authorization.js";
import { createService, getService } from "../controllers/service.controller.js";

const serviceRoute = new Hono();

serviceRoute.post("/", authorization, createService);
serviceRoute.get('/',getService)

export default serviceRoute;
