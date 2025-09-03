import { prisma } from "./prisma";

export async function registerUser(email: string, password: string) {
  return prisma.user.create({ data: { email, password } });
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) throw new Error("Incorrect email or password");
  return user;
}
