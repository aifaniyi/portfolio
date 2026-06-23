import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProjectThumbnail } from '@/lib/project-utils';
import type { Project } from '@/types';

interface ProjectTableProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  className?: string;
}

export function ProjectTable({
  projects,
  onProjectClick,
  className,
}: ProjectTableProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects found.</p>
      </div>
    );
  }

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-semibold text-sm">
              Project
            </th>
            <th className="text-left py-3 px-4 font-semibold text-sm hidden md:table-cell">
              Category
            </th>
            <th className="text-left py-3 px-4 font-semibold text-sm hidden lg:table-cell">
              Technologies
            </th>
            <th className="text-left py-3 px-4 font-semibold text-sm hidden sm:table-cell">
              Date
            </th>
            <th className="text-left py-3 px-4 font-semibold text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-b hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onProjectClick(project)}
            >
              <td className="py-4 px-4">
                <div className="flex items-start gap-3">
                  <img
                    src={getProjectThumbnail(project, 100, 100)}
                    alt={project.title}
                    className="w-12 h-12 rounded object-cover hidden sm:block"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const fallback = `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=100&fit=crop`;
                      const placeholder = `https://placehold.co/100x100/3b82f6/ffffff?text=${encodeURIComponent(project.category.slice(0, 2))}`;

                      if (target.src.includes('images.unsplash.com')) {
                        target.src = placeholder;
                      } else {
                        target.src = fallback;
                      }
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 sm:line-clamp-1">
                      {project.description}
                    </p>
                  </div>
                </div>
              </td>

              <td className="py-4 px-4 hidden md:table-cell">
                <Badge
                  variant="secondary"
                  className="text-xs whitespace-nowrap"
                >
                  {project.category}
                </Badge>
              </td>

              <td className="py-4 px-4 hidden lg:table-cell">
                <div className="flex flex-wrap gap-1 max-w-md">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </td>

              <td className="py-4 px-4 hidden sm:table-cell">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {new Date(project.publishDate).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </td>

              <td className="py-4 px-4">
                <div
                  className="flex gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.demoUrl && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          project.demoUrl,
                          '_blank',
                          'noopener,noreferrer'
                        );
                      }}
                      title="View demo"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          project.githubUrl,
                          '_blank',
                          'noopener,noreferrer'
                        );
                      }}
                      title="View source"
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
