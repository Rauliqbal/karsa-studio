import type { Context } from "hono";
import { prisma } from "../utils/db.js";
import { saveFile } from "../utils/upload.js";

// CREATE TEAM MEMBER
export const createTeamMember = async (c: Context) => {
  const existing = await prisma.teamMember.findFirst();
  if (existing) {
    return c.json({ message: "Member already exists" }, 400);
  }

  const body = await c.req.parseBody();
  let photoUrl = "";

  if (body.photoUrl instanceof File) {
    photoUrl = await saveFile(body.photoUrl);
  }

  const data = {
    name: body.name as string,
    position: body.position as string,
    bio: body.bio as string,
    photoUrl,
  };

  const teamMember = await prisma.teamMember.create({ data });
  return c.json({
    success: true,
    message: "Create Successfully",
    data: teamMember,
  });
};

// GET ALL TEAM MEMBER
export const getTeamMember = async (c: Context) => {
  const teamMember = await prisma.teamMember.findMany();

  return c.json({
    success: true,
    message: "Get All Team Member",
    data: teamMember,
  });
};

export const getTeamMemberById = async (c: Context) => {
  const { id } = c.req.param();

  const teamMember = await prisma.teamMember.findFirst({
    where: { id },
  });
  if (!teamMember) return c.json({ success: false, message: "Not Found" });

  const teamMemberById = await prisma.teamMember.findUnique({
    where: { id },
  });

  return c.json({
    success: true,
    message: "Get Member by ID Successfully",
    data: teamMemberById,
  });
};
