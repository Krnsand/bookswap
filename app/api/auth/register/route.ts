import { registerUser } from "@/lib/auth";
import { loginFake } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await registerUser(email, password);
    loginFake(user.id);
    return NextResponse.json(user);
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
