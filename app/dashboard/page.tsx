"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Book = { id: string; title: string; author: string; available: boolean };

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBooks(data);
        else setBooks([]);
      });
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to BookSwap!</h1>
      <button
        onClick={() => router.push("/books/add")}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Book
      </button>

      <ul className="space-y-3">
        {books.map((b) => (
          <li key={b.id} className="p-4 bg-white shadow rounded">
            {b.title} by {b.author} ({b.available ? "Available" : "Loaned out"})
          </li>
        ))}
      </ul>
    </div>
  );
}
