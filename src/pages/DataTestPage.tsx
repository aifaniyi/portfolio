import { projects, skills, personalInfo } from '@/data';
import { CATEGORIES } from '@/lib/constants';
import {
  getProjectsByCategory,
  getFeaturedProjects,
  getAllTags,
  getCategoryColor,
} from '@/lib/project-utils';

export function DataTestPage() {
  const featuredProjects = getFeaturedProjects(projects);
  const allTags = getAllTags(projects);
  const devOpsProjects = getProjectsByCategory(projects, 'DevOps/SRE');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Data Layer Test</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Personal Info</h2>
        <p className="text-lg">{personalInfo.name}</p>
        <p className="text-muted-foreground">{personalInfo.title}</p>
        <p className="mt-4">{personalInfo.tagline}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Categories ({CATEGORIES.length})
        </h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <span
              key={category}
              className={`px-3 py-1 rounded-full text-white text-sm ${getCategoryColor(category)}`}
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Total Projects: {projects.length}
        </h2>
        <p>Featured Projects: {featuredProjects.length}</p>
        <p>DevOps/SRE Projects: {devOpsProjects.length}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Featured Projects ({featuredProjects.length})
        </h2>
        <div className="space-y-4">
          {featuredProjects.map((project) => (
            <div key={project.id} className="border p-4 rounded-lg">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {project.category}
              </p>
              <p>{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-secondary text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">All Tags ({allTags.length})</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-accent text-sm rounded text-accent-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Skills ({skills.length})</h2>
        <p>Sample skills:</p>
        <ul className="list-disc list-inside">
          {skills.slice(0, 10).map((skill) => (
            <li key={skill.name}>
              {skill.name} - {skill.category} ({skill.proficiency})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
