import type { Context, Next } from "hono";
import { verifyToken } from "../utils/jwt.js";

export const authorization = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header("authorization");
    if (!authHeader) {
      return c.json({ success: false, message: "No token provided" }, 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = verifyToken(token);

    c.set("auth", decoded);

    await next();
  } catch (err) {
    return c.json({ success: false, message: "Invalid or expired token" }, 401);
  }
};
