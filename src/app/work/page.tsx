import type { Metadata } from "next";
import { work, person, baseURL } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { WorkHeader } from "@/components/work/WorkHeader";

export const metadata: Metadata = {
  title: work.title,
  description: work.description,
  openGraph: {
    title: work.title,
    description: work.description,
    url: `${baseURL}${work.path}`,
  },
};

export default function Work() {
  return (
    <div className="py-16 sm:py-24">
      <WorkHeader title={work.title} />
      <Projects />
    </div>
  );
}
