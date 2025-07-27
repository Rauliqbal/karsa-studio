import { Hono } from "hono";
import { createService } from "../controllers/service-controller.js";
import { authorization } from "../middlewares/authorization.js";


const app = new Hono

app.post('/service', authorization,createService)


export default app