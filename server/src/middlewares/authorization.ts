import type { MiddlewareHandler } from "hono";
import type { Context } from "hono";
import { verifyToken } from "../utils/jwt.js";

export const authorization:MiddlewareHandler = async (c:Context, next) => {
  const header = c.req.header('Authorization')
  if(!header) {
    return c.json({error: 'Unauthorized'}, 401)
  }

  const token = header.split(' ')[0]

  try {
    const decoded = await verifyToken(token)
    c.set('user', decoded)
    await next()
  } catch (error) {
    return c.json({
      error: 'Invalid or expired token'
    },401)
  }
}