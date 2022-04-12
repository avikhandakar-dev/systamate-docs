import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@lib/prisma";

export function createJWT(user) {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
}

export function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return false;
  }
}

export async function compairPassword(password, hash) {
  const isValid = await compare(password, hash);
  return isValid;
}

export async function getUser(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  const token = authHeader.split(" ")[1];
  const decoded = verifyJWT(token);
  if (!decoded) {
    return false;
  }
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });
  return user ? user : false;
}
