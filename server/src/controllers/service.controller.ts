import type { Context } from "hono";
import { prisma } from "../utils/db.js";
import { saveFile } from "../utils/upload.js";

// Create Service
export const createService = async (c: Context) => {
  const body = await c.req.parseBody();
  let imageUrl = "";

    const existing = await prisma.service.findFirst({
    where: {
      title: body.title as string
    }
  });
  if (existing) {
    return c.json({ success: false,message: "Service already exists" }, 400);
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
