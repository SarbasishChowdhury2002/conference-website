import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-600">
            © 2026 CONF2026. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              href="/contact"
              className="text-gray-600 hover:text-blue-600"
            >
              Contact
            </Link>

            <Link
              href="/login"
              className="font-medium text-gray-600 hover:text-blue-600"
            >
              Organizer Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}