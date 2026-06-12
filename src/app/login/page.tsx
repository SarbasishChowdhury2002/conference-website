"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
//import { createBrowserClient } from "@/lib/supabase/client";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  //const supabase = createBrowserClient();
  const supabase = getSupabaseBrowserClient();

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { data, error } =
        await supabase.auth.signInWithPassword({
        email,
        password,
        });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log("SESSION AFTER LOGIN:", session);

    console.log("LOGIN DATA:", data);
    console.log("LOGIN ERROR:", error);

    if (error) {
        setError(error.message);
        setLoading(false);
        return;
    }

    alert("Login Success");
    setLoading(false);
    //router.push("/admin");
    window.location.href = "/admin";
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Conference Login
      </h1>

      <form
        onSubmit={handleLogin}
        className="space-y-4"
      >
        <div>
          <label className="mb-1 block">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <label className="mb-1 block">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="Enter password"
          />
        </div>

        {error && (
        <p className="text-red-600">
            {error}
        </p>
        )}

        <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-black p-2 text-white"
        >
        {loading ? "Logging in..." : "Login"}
        </button>
      </form>

    </main>
  );
}