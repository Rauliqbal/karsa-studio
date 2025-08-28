import { prisma } from "../utils/db.js";
import bcrypt from "bcryptjs";
import { signToken, verifyToken } from "../utils/jwt.js";
import type { Context } from "hono";
import type { AdminUserInput, AdminUserResponse } from "../types/adminUser.js";
import type { Prisma, Role } from "../generated/prisma/index.js";

// REGISTER
export const register = async (c: Context) => {
  const data = c.get("validatedData");

  const existing = await prisma.adminUser.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existing) {
    return c.json(
      {
        success: false,
        message: "User already exists",
      },
      400
    );
  }

  const hashed = await bcrypt.hash(data.password, 10);

  const user = await prisma.adminUser.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashed,
      verified: false,
    },
  });

  const register = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return c.json(
    {
      success: true,
      message: "User created successfully",
      data: register,
    },
    200
  );
};

// LOGIN
export const login = async (c: Context) => {
  const data = c.get("validatedData");

  const user = await prisma.adminUser.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return c.json(
      {
        success: false,
        message: "User not found",
      },
      401
    );
  }

  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) {
    return c.json(
      {
        success: false,
        message: "Invalid password",
      },
      401
    );
  }

  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const { password, ...userWithoutPassword } = user;

  return c.json(
    {
      success: true,
      message: "User logged in successfully",
      data: {
        user: userWithoutPassword,
        token,
      },
    },
    200
  );
};

// GET CURRENT ADMINUSER
export const getUser = async (c: Context) => {
  const auth = c.get("auth");

  if (!auth?.id) {
    return c.json({ success: false, message: "Unauthorized" }, 401);
  }

  const user = await prisma.adminUser.findUnique({
    where: { id: auth.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      verified: true,
    },
  });

  if (!user) {
    return c.json({ success: false, message: "User not found" }, 404);
  }

  return c.json({
    success: true,
    message: "User fetched successfully",
    data: user,
  });
};

// UPDATE ADMINUSER
export const updateUser = async (c: Context) => {
  const { id } = c.req.param(); 
  const body = await c.req.json() as AdminUserInput;

  const user = await prisma.adminUser.findUnique({ where: { id } });
  if (!user) return c.json({ message: "Not Found" }, 404);

  if (body.password && body.confirmPassword && body.password !== body.confirmPassword) {
    return c.json({ message: "Password tidak sama" }, 400);
  }

  const updateData: Prisma.AdminUserUpdateInput = {};

  if (body.name) updateData.name = body.name;
  if (body.email) updateData.email = body.email;
  if (body.password){
    updateData.password = await bcrypt.hash(body.password,10)
  }
  if (body.role) updateData.role = body.role as Role;
  if (body.verified !== undefined) updateData.verified = body.verified;

  const updated = await prisma.adminUser.update({
    where: { id },
    data: updateData,
  });

  return c.json({
    success: true,
    message: "Update Successfully",
    data: updated,
  });
};
