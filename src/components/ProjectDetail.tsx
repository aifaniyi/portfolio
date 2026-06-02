import { ExternalLink, Github, FileText, X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Project } from '@/types';
import { getCategoryColor, formatDate } from '@/lib/project-utils';

interface ProjectDetailProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function ProjectDetail({
  project,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: ProjectDetailProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className={`${getCategoryColor(project.category)} text-white border-0`}
                >
                  {project.category}
                </Badge>
                {project.featured && (
                  <Badge className="bg-primary">Featured</Badge>
                )}
                <span className="text-sm text-muted-foreground">
                  {formatDate(project.publishDate)}
                </span>
              </div>
              <DialogTitle className="text-2xl md:text-3xl">
                {project.title}
              </DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Images */}
          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="relative h-48 rounded-lg overflow-hidden bg-muted"
                >
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          <Separator />

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Challenges */}
          {project.challenges && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2">Challenges</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.challenges}
                </p>
              </div>
            </>
          )}

          {/* Solutions */}
          {project.solutions && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2">Solutions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.solutions}
                </p>
              </div>
            </>
          )}

          {/* Outcomes */}
          {project.outcomes && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2">Outcomes</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.outcomes}
                </p>
              </div>
            </>
          )}

          {/* Code Snippets */}
          {project.codeSnippets && project.codeSnippets.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3">Code Examples</h3>
                <div className="space-y-4">
                  {project.codeSnippets.map((snippet, index) => (
                    <div key={index}>
                      {snippet.description && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {snippet.description}
                        </p>
                      )}
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code className="text-sm">{snippet.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Links */}
          <Separator />
          <div className="flex flex-wrap gap-3">
            {project.demoUrl && (
              <Button asChild>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-2" />
                  View Source
                </a>
              </Button>
            )}
            {project.documentationUrl && (
              <Button variant="outline" asChild>
                <a
                  href={project.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Documentation
                </a>
              </Button>
            )}
          </div>

          {/* Navigation */}
          {(onPrevious || onNext) && (
            <>
              <Separator />
              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  onClick={onPrevious}
                  disabled={!onPrevious}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous Project
                </Button>
                <Button variant="ghost" onClick={onNext} disabled={!onNext}>
                  Next Project
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
