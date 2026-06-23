import { ExternalLink, Github } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Project } from '@/types';
import {
  getCategoryColor,
  getProjectThumbnail,
  formatDate,
} from '@/lib/project-utils';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const handleLinkClick = (e: React.MouseEvent, url?: string) => {
    if (url) {
      e.stopPropagation();
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden rounded-t-lg bg-muted">
        <img
          src={getProjectThumbnail(project, 400, 300)}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            const fallback = `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop`;
            const placeholder = `https://placehold.co/400x300/3b82f6/ffffff?text=${encodeURIComponent(project.category)}`;

            if (target.src.includes('images.unsplash.com')) {
              target.src = placeholder;
            } else {
              target.src = fallback;
            }
          }}
        />
        {project.featured && (
          <Badge className="absolute top-2 right-2 bg-primary text-xs">
            Featured
          </Badge>
        )}
      </div>

      <CardHeader className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <Badge
            variant="outline"
            className={`${getCategoryColor(project.category)} text-white border-0 text-xs`}
          >
            {project.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDate(project.publishDate)}
          </span>
        </div>
        <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors text-lg">
          {project.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs px-2 py-0.5"
            >
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs px-2 py-0.5">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="gap-2 p-4 pt-0">
        {project.demoUrl && (
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={(e) => handleLinkClick(e, project.demoUrl)}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Demo
          </Button>
        )}
        {project.githubUrl && (
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={(e) => handleLinkClick(e, project.githubUrl)}
          >
            <Github className="h-4 w-4 mr-1" />
            Code
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
