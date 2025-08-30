import type { Context } from "hono";
import { prisma } from "../utils/db.js";
import { saveFile } from "../utils/upload.js";
import path from "path";
import fs from "fs/promises";

// CREATE SERVICE
export const createService = async (c: Context) => {
  const body = await c.req.parseBody();
  let imageUrl = "";

  const existing = await prisma.service.findFirst({
    where: {
      title: body.title as string,
    },
  });
  if (existing) {
    return c.json({ success: false, message: "Service already exists" }, 400);
  }

  if (body.imageUrl instanceof File) {
    imageUrl = await saveFile(body.imageUrl);
  }

  const data = {
    title: body.title as string,
    description: body.description as string,
    imageUrl,
  };

  const service = await prisma.service.create({ data });
  return c.json(
    {
      success: true,
      message: "Create Successfully",
      data: service,
    },
    201
  );
};

// GET SERVICE
export const getService = async (c: Context) => {
  const service = await prisma.service.findMany();

  return c.json({
    success: true,
    message: "Get All Service",
    data: service,
  });
};

// GET SERVICE ID
export const getServiceId = async (c: Context) => {
  const { id } = c.req.param();

  const service = await prisma.service.findFirst({
    where: { id },
  });
  if (!service) return c.json({ success: false, message: "Not Found" });

  const serviceById = await prisma.service.findUnique({
    where: { id },
  });

  return c.json({
    success: true,
    message: "Get Service by ID Successfully",
    data: serviceById,
  });
};

// UPDATE SERVICE
export const updateService = async (c: Context) => {
  const { id } = c.req.param();
  const body = await c.req.parseBody();
  let imageUrl = "";

  const service = await prisma.service.findFirst({
    where: { id },
  });
  if (!service) {
    return c.json({
      success: false,
      message: "Not Found",
    });
  }

  const updateData: any = {};
  if (body.title) updateData.title = body.title;
  if (body.description) updateData.description = body.description;
  if (body.imageUrl && body.imageUrl instanceof File) {
    if (service.imageUrl) {
      const oldPath = path.join(process.cwd(), "public", service.imageUrl);

      try {
        await fs.unlink(oldPath);
      } catch (error) {
        console.warn("failed Delete Old Image");
      }
    }
    updateData.imageUrl = await saveFile(body.imageUrl);
  }

  const updated = await prisma.service.update({
    where: { id: service.id },
    data: updateData,
  });

  return c.json({
    success: true,
    message: "Update successfully",
    data: updated,
  });
};

//  DELETE SERVICE
export const deleteService = async (c: Context) => {
  const { id } = c.req.param();

  const service = await prisma.service.findFirst({ where: { id } });
  if (!service)
    return c.json({
      success: false,
      message: "Not Found",
    });

  if (service.imageUrl) {
    const imageFile = path.basename(service.imageUrl);
    const imagePath = path.join(process.cwd(), "public", "uploads", imageFile);
    try {
      await fs.unlink(imagePath);
    } catch (error) {
      console.warn("Image not found:", imagePath);
    }
  }

  await prisma.service.delete({ where: { id: service.id } });

  return c.json({
    success: true,
    message: "Delete Successfuly",
  });
};
