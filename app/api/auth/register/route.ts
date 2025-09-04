import { registerUser } from "@/lib/auth";
import { loginFake } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const user = await registerUser(name, email, password);
    loginFake(user.id); // sätter session

    return NextResponse.json({ redirectTo: "/dashboard" }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 }
    );
  }
}
