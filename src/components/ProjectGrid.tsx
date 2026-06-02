import { ProjectCard } from './ProjectCard';
import type { Project } from '@/types';

interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function ProjectGrid({ projects, onProjectClick }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">No projects found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onProjectClick(project)}
        />
      ))}
    </div>
  );
}
