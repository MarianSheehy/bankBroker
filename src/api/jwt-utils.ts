import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../models/db.js";
import type { User } from "../types/report-types.js";

dotenv.config();

interface TokenPayload {
  id: string;
  email: string;
}

interface DecodedUserInfo {
  userId?: string;
  email?: string;
}

export function createToken(user: User): string {
  const payload: TokenPayload = {
    id: user._id!,
    email: user.email,
  };
  const options: jwt.SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.cookie_password as string, options);
}

export function decodeToken(token: string): DecodedUserInfo {
  const userInfo: DecodedUserInfo = {};
  try {
    const decoded = jwt.verify(token, process.env.cookie_password as string) as TokenPayload;
    userInfo.userId = decoded.id;
    userInfo.email = decoded.email;
  } catch (err) {
    console.log((err as Error).message);
  }
  return userInfo;
}

export async function validate(decoded: TokenPayload) {
  const user = await db.userStore.findOne(decoded.id);
  if (!user) {
    return { isValid: false };
  }
  return { isValid: true, credentials: user };
}
