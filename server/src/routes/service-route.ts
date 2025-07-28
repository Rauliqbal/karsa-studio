import { Hono } from "hono";
import { createService } from "../controllers/service-controller.js";
import { authorization } from "../middlewares/authorization.js";
import { validate } from "../middlewares/validate.js";
import { serviceSchema } from "../schemas/serviceSchema.js";


const app = new Hono

app.post('/service',authorization,validate(serviceSchema),createService)


export default app