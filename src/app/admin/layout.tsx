import Link from "next/link";
import { ReactNode } from "react";
import LogoutButton from "@/components/admin/logout-button";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-50 p-4">
        <h2 className="mb-6 text-xl font-bold">
          Conference Admin
        </h2>

        <nav className="space-y-2">
          <Link
            href="/admin"
            className="block rounded p-2 hover:bg-gray-200"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/speakers"
            className="block rounded p-2 hover:bg-gray-200"
          >
            Speakers
          </Link>

          <Link
            href="/admin/important-dates"
            className="block rounded p-2 hover:bg-gray-200"
          >
            Important Dates
          </Link>

          <Link
            href="/admin/announcements"
            className="block rounded p-2 hover:bg-gray-200"
          >
            Announcements
          </Link>

          <Link
            href="/admin/committee-members"
            className="block rounded p-2 hover:bg-gray-200"
          >
            Committee Members
          </Link>

          <Link
            href="/admin/programme"
            className="block rounded p-2 hover:bg-gray-200"
          >
            Programme
          </Link>

          <Link
            href="/admin/registrations"
            className="block rounded p-2 hover:bg-gray-200"
          >
            Registrations
          </Link>

          <Link
            href="/admin/settings"
            className="block rounded p-2 hover:bg-gray-200"
          >
            Settings
          </Link>

          

        <div className="mt-auto">
          <LogoutButton />
        </div>


        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}