import { BrainCircuit, Cpu, Users } from "lucide-react";

import { Section } from "@/components/public/section";
import { SectionHeader } from "@/components/public/section-header";
import { Card, CardContent } from "@/components/ui/card";

/**
 * The `conferences.about` field currently holds placeholder text
 * ("Conference About") and is deliberately NOT rendered here. This section
 * instead explains the three areas named in the conference's own verified
 * full title — a durable structural framework, not a claim about the
 * conference's specific content, so it doesn't need to be replaced once an
 * official About paragraph is supplied (that would slot in above or beside
 * this, via the CMS, without touching this component).
 */
const PILLARS = [
  {
    icon: BrainCircuit,
    title: "Computational Intelligence",
    description:
      "Machine learning, deep learning, generative and agentic AI, and the algorithmic foundations that let systems reason, learn, and adapt.",
  },
  {
    icon: Cpu,
    title: "Modern Engineering Systems",
    description:
      "Applying these methods to real engineering domains — from robotics and cyber-physical systems to computing infrastructure and automation.",
  },
  {
    icon: Users,
    title: "Societal Applications",
    description:
      "Translating research into impact for healthcare, sustainability, security, and other domains where engineering meets everyday life.",
  },
] as const;

export function AboutSection() {
  return (
    <Section>
      <SectionHeader
        eyebrow="About IC-COMEN 2027"
        title="Where computational intelligence meets engineering practice"
        description="IC-COMEN 2027 brings together researchers and practitioners working across three connected areas."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {PILLARS.map(({ icon: Icon, title, description }) => (
          <Card key={title} variant="flat">
            <CardContent className="pt-6">
              <Icon aria-hidden="true" className="size-8 text-primary" />
              <h3 className="text-h4 mt-4">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
