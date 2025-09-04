import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export async function registerUser(name: string, email: string, password: string) {
  const hashed = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      name,         // 👈 spara name
      email,
      password: hashed,
    },
  });
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) throw new Error("Invalid email or password");
  return user;
}
