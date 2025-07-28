import path from "path"
import { v4 as uuidv4 } from "uuid"
import fs from "fs/promises"
import type { Context } from "hono"
import { prisma } from "../utils/db.js"

export const createService = async (c: Context) => {
  const data = c.get("validatedData") as {
    title: string
    description: string
  }

  const iconFile = c.get("file") as File

  if (!iconFile) {
    return c.json({
      success: false,
      message: "Invalid icon file"
    }, 400)
  }

  const ext = path.extname(iconFile.name)
  const filename = `icon-${uuidv4()}${ext}`
  const uploadDir = './public/uploads'
  const filepath = path.join(uploadDir, filename)

  const buffer = await iconFile.arrayBuffer()
  await fs.writeFile(filepath, Buffer.from(buffer))

  const service = await prisma.service.create({
    data: {
      title: data.title,
      description: data.description,
      iconUrl: `/uploads/${filename}`
    }
  })

  return c.json({
    success: true,
    message: "Service created successfully",
    data: service
  })
}
