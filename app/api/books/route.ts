import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ownerId = cookies().get("session")?.value;
    if (!ownerId) return NextResponse.json([], { status: 200 }); // alltid array

    const books = await prisma.book.findMany({ where: { ownerId } });
    return NextResponse.json(books);
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message || "Something went wrong" }, { status: 500 });
  }
}

