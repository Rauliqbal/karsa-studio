import type { Context } from "hono";
import { prisma } from "../utils/db.js";
import { saveFile } from "../utils/upload.js";
import type {
  CompanyProfileInput,
  CompanyProfileResponse,
} from "../types/companyProfile.js";
import path from "path";
import fs from "fs/promises";

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
      data: profile,
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

// Update Company Profile
export const updateCompanyProfile = async (c: Context) => {
  const profile = await prisma.companyProfile.findFirst();
  if (!profile) return c.json({ message: "Not Found" }, 404);

  const body = (await c.req.parseBody()) as unknown as CompanyProfileInput;

  const updateData: Partial<CompanyProfileResponse> = {
    name: body.name,
    description: body.description,
    foundedYear: Number(body.foundedYear),
    address: body.address,
    email: body.email,
    phone: body.phone,
    vision: body.vision,
    mission: body.mission,
  };

  if (body.logoUrl && body.logoUrl instanceof File) {
    if (profile.logoUrl) {
      const oldPath = path.join(process.cwd(), "public", profile.logoUrl);
      try {
        await fs.unlink(oldPath);
      } catch (e) {
        console.warn("⚠️ Gagal hapus logo lama:", e);
      }
    }
    updateData.logoUrl = await saveFile(body.logoUrl);
  }

  if (body.coverImageUrl && body.coverImageUrl instanceof File) {
    if (profile.coverImageUrl) {
      const oldPath = path.join(process.cwd(), "public", profile.coverImageUrl);
      try {
        await fs.unlink(oldPath);
      } catch (e) {
        console.warn("⚠️ Gagal hapus cover lama:", e);
      }
    }
    updateData.coverImageUrl = await saveFile(body.coverImageUrl);
  }

  const updated = await prisma.companyProfile.update({
    where: { id: profile.id },
    data: updateData,
  });

  return c.json({
    success: true,
    message: "Update successfully",
    data: updated,
  });
};

export const deleteCompanyProfile = async (c: Context) => {
  const profile = await prisma.companyProfile.findFirst();
  if (!profile) return c.json({ message: "Not Found" }, 404);

  if (profile.logoUrl) {
    const logoFile = path.basename(profile.logoUrl);
    const logoPath = path.join(process.cwd(), "public", "uploads", logoFile);
    try {
      await fs.unlink(logoPath);
      console.log("Deleted logo:", logoPath);
    } catch (err) {
      console.warn("Logo file not found:", logoPath);
    }
  }

  if (profile.coverImageUrl) {
    const coverFile = path.basename(profile.coverImageUrl);
    const coverPath = path.join(process.cwd(), "public", "uploads", coverFile);
    try {
      await fs.unlink(coverPath);
      console.log("Deleted cover image:", coverPath);
    } catch (err) {
      console.warn("Cover image file not found:", coverPath);
    }
  }

  await prisma.companyProfile.delete({ where: { id: profile.id } });

  return c.json({
    success: true,
    message: "Delete Successfully",
  });
};
