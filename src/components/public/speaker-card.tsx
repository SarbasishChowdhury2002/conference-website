import Image from "next/image";

interface SpeakerCardProps {
  name: string;
  designation: string;
  organization: string;
  photoUrl?: string | null;
}

export function SpeakerCard({
  name,
  designation,
  organization,
  photoUrl,
}: SpeakerCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      {photoUrl && (
        <Image
          src={photoUrl}
          alt={name}
          width={200}
          height={200}
          sizes="(max-width: 768px) 160px, 200px"
          className="mx-auto mb-4 h-32 w-32 rounded-full object-cover"
        />
      )}

      <h3 className="text-xl font-semibold">{name}</h3>

      <p className="text-gray-600">{designation}</p>

      <p className="text-sm text-gray-500">
        {organization}
      </p>
    </div>
  );
}