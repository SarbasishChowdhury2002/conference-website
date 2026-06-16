import { CommitteeCard } from "@/components/public/committee-card";
import { SectionTitle } from "@/components/public/section-title";
import { getCommitteeMembers } from "@/lib/data/committee";

export default async function CommitteePage() {
  const members = await getCommitteeMembers();

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle
        title="Conference Committee"
        subtitle="Meet the team behind the conference"
      />

      {members.length === 0 ? (
        <div className="text-center text-gray-500">
          No committee members found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <CommitteeCard
              key={member.id}
              name={member.name}
              designation={member.designation}
              organization={member.organization}
              committeeGroup={member.committee_group}
              photoUrl={member.photo_url}
            />
          ))}
        </div>
      )}
    </div>
  );
}