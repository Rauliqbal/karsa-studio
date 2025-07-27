import type { Context } from "hono";
import { validate } from "../middlewares/validate.js";
import { prisma } from "../utils/db.js";

export const createService = async(c:Context) => {
  const data =  c.get('validatedData')

  const service = await prisma.service.create({
    data: {
      title: data.title,
      description: data.description,
      iconUrl: data.iconUrl
    }
  }) 

  return c.json({
    success:true,
    message: "Service created successfully",
    data: service
  })
}