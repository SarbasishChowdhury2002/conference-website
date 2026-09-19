import Image from "next/image";

import { Card } from "@/components/ui/card";

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
    <Card className="p-6 text-center">
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={name}
          width={200}
          height={200}
          className="mx-auto mb-4 h-32 w-32 rounded-full border border-border object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full border border-border bg-muted text-2xl font-semibold text-muted-foreground"
        >
          {name
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")}
        </div>
      )}

      <h3 className="text-h4">{name}</h3>
      <p className="mt-1 text-sm text-foreground/80">{designation}</p>
      <p className="text-sm text-muted-foreground">{organization}</p>

      <p className="text-eyebrow mt-3 inline-block text-muted-foreground">
        {committeeGroup}
      </p>
    </Card>
  );
}
