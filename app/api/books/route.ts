import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = cookies();
    const ownerId = cookieStore.get("session")?.value;

    if (!ownerId) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const books = await prisma.book.findMany({ where: { ownerId } });
    return NextResponse.json(books);
  } catch (err: unknown) {
    return NextResponse.json(
      { error: (err as Error).message || "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { title, author } = await req.json();
    const cookieStore = cookies();
    const ownerId = cookieStore.get("session")?.value;

    if (!ownerId) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const book = await prisma.book.create({
      data: { title, author, ownerId, available: true },
    });

    return NextResponse.json(book);
  } catch (err: unknown) {
    return NextResponse.json(
      { error: (err as Error).message || "Something went wrong" },
      { status: 500 }
    );
  }
}
