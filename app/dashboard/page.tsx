"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div>
      <h1>My Books</h1>
      <ul>
        {books.map((b: any) => (
          <li key={b.id}>
            {b.title} av {b.author} ({b.available ? "Available" : "Loaned out"})
          </li>
        ))}
      </ul>
    </div>
  );
}
