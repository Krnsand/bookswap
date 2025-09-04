"use client";
import { useEffect, useState } from "react";

type Book = {
  id: string;
  title: string;
  author: string;
  available: boolean;
};

type User = {
  id: string;
  name: string;
  email: string;
};

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/books");
      if (res.status === 401) {
        setIsLoggedIn(false);
      } else {
        const data: Book[] = await res.json();
        setBooks(data);
        setIsLoggedIn(true);

        const userRes = await fetch("/api/auth/me");
        if (userRes.ok) {
          const userData: User = await userRes.json();
          setUser(userData);
        }
      }
    }
    loadData();
  }, []);

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/sign-in";
  }

  return (
    <div className="relative min-h-screen bg-black p-6">
      {isLoggedIn && (
        <button
          onClick={handleSignOut}
          className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign out
        </button>
      )}

      <div className="flex flex-col items-center mt-12">
        <h1 className="text-2xl font-bold mb-2">Welcome to BookSwap!</h1>
        {user && <p className="text-lg text-white mb-6">{user.name}</p>}

        {isLoggedIn ? (
          <a
            href="/books/add"
            className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Book
          </a>
        ) : (
          <div className="flex space-x-4 mb-6">
            <a
              href="/sign-in"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign in
            </a>
            <a
              href="/sign-up"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Register
            </a>
          </div>
        )}

        {isLoggedIn && (
          <ul className="w-full max-w-md space-y-3">
            {books.map((b) => (
              <li
                key={b.id}
                className="p-4 bg-slate-300 shadow text-slate-900 rounded flex justify-between"
              >
                {b.title} by {b.author}{" "}
                <span
                  className={
                    b.available
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  ({b.available ? "Available" : "Loaned out"})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
