"use client";
import { useEffect, useState } from "react";

interface Book {
  id: string;
  title: string;
  author: string;
  available: boolean;
}

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBooks(data);
        else setBooks([]);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to BookSwap!</h1>
      <ul>
        {books.map((b) => (
          <li key={b.id}>
            {b.title} by {b.author} ({b.available ? "Available" : "Loaned out"})
          </li>
        ))}
      </ul>
    </div>
  );
}
