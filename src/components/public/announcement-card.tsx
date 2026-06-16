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
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-2 text-xl font-semibold">
        {title}
      </h3>

      <p className="mb-4 text-gray-600">
        {content}
      </p>

      <p className="text-sm text-gray-500">
        {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}