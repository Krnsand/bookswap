"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Book {
  id: string;
  title: string;
  author: string;
  available: boolean;
}

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBooks(data);
        else setBooks([]); // fallback om data är fel
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to BookSwap!
      </h1>

      <button
        onClick={() => router.push("/books/add")}
        className="mb-8 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add a Book
      </button>

      <ul className="w-full max-w-md space-y-3">
        {books.map((b: any) => (
          <li key={b.id}>
            {b.title} by {b.author} ({b.available ? "Available" : "Loaned out"})
          </li>
        ))}
      </ul>
    </div>
  );
}
