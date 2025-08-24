import { prisma } from "../utils/db.js";
import bcrypt from "bcryptjs";
import { signToken, verifyToken } from "../utils/jwt.js";

// REGISTER
export const register = async (c: any) => {
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
      role: data.role,
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
export const login = async (c: any) => {
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

// GET CURRENT USER
export const getUser = async (c: any) => {
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
