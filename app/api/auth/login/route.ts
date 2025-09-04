import { loginUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await loginUser(email, password);

    if (!user) throw new Error("Invalid email or password");

    const res = NextResponse.json({ message: "Logged in", redirectTo: "/dashboard" });
    res.cookies.set("session", user.id, { httpOnly: true, path: "/" });

    return res;
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
