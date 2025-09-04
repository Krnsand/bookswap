import { registerUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const user = await registerUser(name, email, password);

    const res = NextResponse.json({ message: "Registered", redirectTo: "/dashboard" });
    res.cookies.set("session", user.id, { httpOnly: true, path: "/" });

    return res;
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
