import Image from "next/image";

interface CommitteeCardProps {
  name: string;
  designation: string;
  organization: string;
  committeeGroup: string;
  photoUrl?: string | null;
}

export function CommitteeCard({
  name,
  designation,
  organization,
  committeeGroup,
  photoUrl,
}: CommitteeCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      {photoUrl && (
        <Image
          src={photoUrl}
          alt={name}
          width={200}
          height={200}
          className="mx-auto mb-4 h-40 w-40 rounded-full object-cover"
        />
      )}

      <h3 className="text-xl font-semibold">
        {name}
      </h3>

      <p className="mt-1 text-gray-600">
        {designation}
      </p>

      <p className="text-sm text-gray-500">
        {organization}
      </p>

      <div className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs">
        {committeeGroup}
      </div>
    </div>
  );
}