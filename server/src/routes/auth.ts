import { Hono } from "hono";
import { validate } from "../middlewares/validate.js";
import { login, register } from "../controllers/auth-controller.js";
import { loginSchema, registerSchema } from "../schemas/adminSchema.js";

const app = new Hono()

app.post('/register', validate(registerSchema), register)
app.post('/login' , validate(loginSchema), login)

export default app