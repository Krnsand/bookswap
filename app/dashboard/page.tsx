"use client";
import { useEffect, useState } from "react";

type Book = {
  id: string;
  title: string;
  author: string;
  available: boolean;
};

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Books</h1>
      <ul>
        {books.map((b) => (
          <li key={b.id}>
            {b.title} av {b.author} ({b.available ? "Available" : "Loaned out"})
          </li>
        ))}
      </ul>
    </div>
  );
}
