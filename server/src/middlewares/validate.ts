import type { MiddlewareHandler } from "hono";
import type { ZodSchema } from "zod";

export const validate = (schema: ZodSchema): MiddlewareHandler => {
  return async (c,next) => {
    const body = await c.req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return c.json({error: parsed.error.flatten()}, 400)
    }
    c.set('validatedData', parsed.data)
    await next()
  }
}