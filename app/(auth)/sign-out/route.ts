
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out", redirectTo: "/sign-in" });
  
  // Ta bort session-cookien
  res.cookies.delete("session", { path: "/" });

  return res;
}
