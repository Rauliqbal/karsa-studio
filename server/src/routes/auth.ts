import { Hono } from "hono";
import { validate } from "../middlewares/validate.js";
import { login, register, getUser, updateUser } from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../schemas/adminSchema.js";
import { authorization } from "../middlewares/authorization.js";

const app = new Hono();

app.post("/register", validate(registerSchema), register);
app.post("/login", validate(loginSchema), login);
app.get("/user", authorization, getUser);
app.put('/user/:id', authorization, updateUser)

export default app;
