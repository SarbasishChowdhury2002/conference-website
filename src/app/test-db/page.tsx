import { supabase } from "@/lib/supabase/client";

export default async function TestDbPage() {
  const { data, error } = await supabase
    .from("conferences")
    .select("*");

  return (
    <main className="p-6">
      <h1>Database Test</h1>

      <pre>
        {JSON.stringify(
          {
            data,
            error,
          },
          null,
          2
        )}
      </pre>
    </main>
  );
}