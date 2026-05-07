import { getPosts } from "@/lib/mdx";
import { FeaturedProjectsClient } from "@/components/home/FeaturedProjectsClient";

export function FeaturedProjects() {
  const allProjects = getPosts(["src", "app", "work", "projects"]);

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  return (
    <section className="w-full">
      <div className="flex flex-col items-center gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <p className="font-mono text-[#ff4081] text-sm tracking-widest uppercase">
            Featured Work
          </p>
          <h2 className="font-mono font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gray-900 dark:text-white">
            Selected <span className="text-[#ff4081]">Projects</span>
          </h2>
        </div>

        <FeaturedProjectsClient projects={sortedProjects} />
      </div>
    </section>
  );
}
