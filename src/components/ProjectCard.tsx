import { ExternalLink, Github, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Project } from '@/types';
import { getCategoryColor, formatDate } from '@/lib/project-utils';

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
      <div className="relative h-48 overflow-hidden rounded-t-lg bg-muted">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <FileText className="h-16 w-16" />
          </div>
        )}
        {project.featured && (
          <Badge className="absolute top-3 right-3 bg-primary">
            Featured
          </Badge>
        )}
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge 
            variant="outline" 
            className={`${getCategoryColor(project.category)} text-white border-0`}
          >
            {project.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDate(project.publishDate)}
          </span>
        </div>
        <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
          {project.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{project.tags.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="gap-2">
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
