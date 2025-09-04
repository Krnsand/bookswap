"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddBookPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Failed to add book. Try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl text-black font-bold mb-4 text-center">
          Add a Book
        </h1>

        <label className="block mb-2 text-slate-900">
          Title
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>

        <label className="block mb-4 text-slate-900">
          Author
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
