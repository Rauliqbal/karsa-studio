import path from "path"
import { v4 as uuidv4 } from "uuid"
import fs from "fs/promises"
import type { Context } from "hono"
import { prisma } from "../utils/db.js"

// CREATE
export const createService = async (c: Context) => {
  const body = await c.req.parseBody()
  const iconFile = body.iconUrl as File
  const title = body.title as string
  const description = body.description as string

  if (!iconFile || !(iconFile instanceof File)) {
    return c.json({
      success: false,
      message: "Icon file is required",
    }, 400)
  }

  const ext = path.extname(iconFile.name)
  const filename = `icon-${uuidv4()}${ext}`
  const uploadDir = './public/uploads/'
    const filepath = path.join(uploadDir, filename)
    
  const buffer = await iconFile.arrayBuffer()
  await fs.writeFile(filepath, Buffer.from(buffer))

  const service = await prisma.service.create({
    data: {
      title,
      description,
      iconUrl: `/uploads/${filename}`
    }
  })

  return c.json({
    success: true,
    message: "Service created successfully",
    data: service
  })
}

// READ
export const getServices = async (c: Context) => {
  const services = await prisma.service.findMany()
  return c.json({
    success: true,
    data: services
  })
}