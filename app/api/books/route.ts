import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = getCurrentUserId();
  if (!userId) return NextResponse.json([], { status: 401 });
  const books = await prisma.book.findMany({ where: { ownerId: userId } });
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  const userId = getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const { title, author } = await req.json();
  const book = await prisma.book.create({ data: { title, author, ownerId: userId } });
  return NextResponse.json(book);
}
