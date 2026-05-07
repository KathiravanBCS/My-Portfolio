import type { Metadata } from "next";
import { person, baseURL } from "@/config";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";

export const metadata: Metadata = {
  title: `Experience – ${person.name}`,
  description: `Work experience and education of ${person.name}`,
  openGraph: {
    title: `Experience – ${person.name}`,
    description: `Work experience and education of ${person.name}`,
    url: `${baseURL}/experience`,
  },
};

export default function Experience() {
  return (
    <div className="flex flex-col items-center w-full">
      <ExperienceTimeline />
    </div>
  );
}
