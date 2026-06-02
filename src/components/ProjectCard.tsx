import { ExternalLink, Github, FileText, ArrowRight } from 'lucide-react';
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
    <div 
      className="group relative bg-card rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
      onClick={onClick}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText className="h-20 w-20 text-muted-foreground/30" />
          </div>
        )}
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-60" />
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-primary/90 backdrop-blur-sm border-0 shadow-lg">
              ⭐ Featured
            </Badge>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <Badge 
            className={`${getCategoryColor(project.category)} text-white border-0 shadow-lg backdrop-blur-sm`}
          >
            {project.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-xs text-muted-foreground">
            {formatDate(project.publishDate)}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/50 text-secondary-foreground">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        {(project.demoUrl || project.githubUrl) && (
          <div className="flex gap-2 pt-4 border-t border-border/50">
            {project.demoUrl && (
              <Button
                size="sm"
                variant="ghost"
                className="flex-1 group/btn"
                onClick={(e) => handleLinkClick(e, project.demoUrl)}
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1.5 group-hover/btn:rotate-12 transition-transform" />
                Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button
                size="sm"
                variant="ghost"
                className="flex-1 group/btn"
                onClick={(e) => handleLinkClick(e, project.githubUrl)}
              >
                <Github className="h-3.5 w-3.5 mr-1.5 group-hover/btn:scale-110 transition-transform" />
                Code
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
}
