import type { Context } from "hono";
import { prisma } from "../utils/db.js";
import { saveFile } from "../utils/upload.js";

// Create Company Profile
export const createCompanyProfile = async (c: Context) => {
  const existing = await prisma.companyProfile.findFirst();
  if (existing) {
    return c.json({ message: "Profile already exists" }, 400);
  }

  const body = await c.req.parseBody();

  let logoUrl = "";
  let coverImageUrl = "";

  if (body.logoUrl instanceof File) {
    logoUrl = await saveFile(body.logoUrl);
  }
  if (body.coverImageUrl instanceof File) {
    coverImageUrl = await saveFile(body.coverImageUrl);
  }

  const data = {
    name: body.name as string,
    description: body.description as string,
    foundedYear: Number(body.foundedYear),
    address: body.address as string,
    email: body.email as string,
    phone: body.phone as string,
    vision: body.vision as string,
    mission: body.mission as string,
    logoUrl,
    coverImageUrl,
  };

  const profile = await prisma.companyProfile.create({ data });
  return c.json(
    {
      success: true,
      message: "Create successfully",
      data,
    },
    201
  );
};

// Get Company Profile
export const getCompanyProfile = async (c: Context) => {
  const profile = await prisma.companyProfile.findFirst();
  if (!profile) return c.json({ message: "Not Found" }, 404);

  return c.json(
    {
      success: true,
      message: "Get company profile",
      data: profile,
    },
    200
  );
};
