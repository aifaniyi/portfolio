import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Timeline,
  TimelineItem,
  TimelineLine,
  TimelineDot,
  TimelineContent,
  TimelineDate,
} from '@/components/ui/timeline';
import type { Project } from '@/types';
import { getCategoryColor, formatDate } from '@/lib/project-utils';

interface ProjectTimelineProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function ProjectTimeline({ projects, onProjectClick }: ProjectTimelineProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">No projects found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search query</p>
      </div>
    );
  }

  const sorted = [...projects].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  let lastYear = '';

  return (
    <div className="max-h-[36rem] overflow-y-auto scrollbar-thin rounded-lg border p-6">
      <Timeline>
        <TimelineLine />
        {sorted.map((project, index) => {
          const year = new Date(project.publishDate).getFullYear().toString();
          const showYear = year !== lastYear;
          lastYear = year;
          const position = index % 2 === 0 ? 'right' : 'left';

          return (
            <div key={project.id}>
              {/* Year label */}
              {showYear && (
                <div className="relative flex items-center mb-6">
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                    {year}
                  </div>
                </div>
              )}

              <TimelineItem position={position}>
                <TimelineDot className={`top-4 ${getCategoryColor(project.category)} ring-border`} />

                {/* Date - hidden on mobile (shown inside card instead) */}
                <div className={`hidden md:block absolute top-3 ${position === 'right' ? 'left-[calc(50%+2rem)]' : 'right-[calc(50%+2rem)]'}`}>
                  {/* Date sits on the opposite side of the card */}
                </div>

                <TimelineContent className={position === 'left' ? 'md:ml-auto' : ''}>
                  <div
                    className="group cursor-pointer rounded-lg border bg-card p-3 hover:shadow-md hover:border-primary/30 transition-all"
                    onClick={() => onProjectClick(project)}
                  >
                    <div className="flex gap-3">
                      {/* Thumbnail */}
                      <img
                        src={`https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=80&h=80&fit=crop`}
                        alt={project.title}
                        className="w-12 h-12 rounded object-cover shrink-0"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://placehold.co/80x80/3b82f6/ffffff?text=${encodeURIComponent(project.category.charAt(0))}`;
                        }}
                      />

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <TimelineDate>
                            <time dateTime={project.publishDate}>{formatDate(project.publishDate)}</time>
                          </TimelineDate>
                          <Badge
                            variant="outline"
                            className={`${getCategoryColor(project.category)} text-white border-0 text-[9px] px-1.5 py-0`}
                          >
                            {project.category}
                          </Badge>
                          {project.featured && (
                            <Badge className="bg-primary text-[9px] px-1 py-0">Featured</Badge>
                          )}
                        </div>

                        <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                          {project.description}
                        </p>

                        <div className="flex items-center gap-1.5 mt-1.5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-[9px] px-1.5 py-0">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="text-[9px] text-muted-foreground">+{project.tags.length - 3}</span>
                          )}
                          <div className="flex gap-0.5 ml-auto shrink-0">
                            {project.demoUrl && (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-5 w-5"
                                onClick={(e) => { e.stopPropagation(); window.open(project.demoUrl, '_blank', 'noopener,noreferrer'); }}
                              >
                                <ExternalLink className="h-2.5 w-2.5" />
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-5 w-5"
                                onClick={(e) => { e.stopPropagation(); window.open(project.githubUrl, '_blank', 'noopener,noreferrer'); }}
                              >
                                <Github className="h-2.5 w-2.5" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TimelineContent>
              </TimelineItem>
            </div>
          );
        })}
      </Timeline>
    </div>
  );
}
