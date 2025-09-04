import { PrismaClient } from "../generated/prisma";

// TypeScript global declaration
declare global {

  var prisma: PrismaClient | undefined;
}

// Use the existing PrismaClient in dev (hot reload safe), otherwise create new
export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
