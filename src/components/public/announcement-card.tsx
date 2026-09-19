import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface AnnouncementCardProps {
  title: string;
  content: string;
  createdAt: string;
}

export function AnnouncementCard({
  title,
  content,
  createdAt,
}: AnnouncementCardProps) {
  return (
    <Card className="p-6">
      <p className="text-label">{formatDate(createdAt.slice(0, 10))}</p>
      <h3 className="text-h4 mt-2">{title}</h3>
      <p className="text-lead mt-2">{content}</p>
    </Card>
  );
}
