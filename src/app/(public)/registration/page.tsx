import { SectionTitle } from "@/components/public/section-title";

export default function RegistrationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle
        title="Registration"
        subtitle="Conference registration information"
      />

      <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
        <h3 className="mb-4 text-2xl font-semibold">
          Registration Opening Soon
        </h3>

        <p className="text-gray-600">
          Registration details, fees, and payment
          instructions will be announced shortly.
        </p>
      </div>
    </div>
  );
}