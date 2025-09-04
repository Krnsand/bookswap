import { prisma } from "@/lib/prisma";
import { loginFake } from "@/lib/session";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
  }

  loginFake(user.id);
  return NextResponse.json({ message: "Logged in" });
}
