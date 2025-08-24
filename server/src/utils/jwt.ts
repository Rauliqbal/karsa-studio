import jwt from "jsonwebtoken";

const SECRET_TOKEN = process.env.SECRET_TOKEN as string;

export const signToken = (payload: object) => {
  return jwt.sign(payload, SECRET_TOKEN, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_TOKEN);
};
