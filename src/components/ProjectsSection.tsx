import { useState, useMemo, useEffect } from 'react';
import { Container } from './Container';
import { FilterBar } from './FilterBar';
import { ProjectGrid } from './ProjectGrid';
import { ProjectDetail } from './ProjectDetail';
import { ProjectTable } from './ProjectTable';
import { LayoutToggle, type LayoutType } from './LayoutToggle';
import { projects } from '@/data';
import type { Category, Project } from '@/types';
import {
  getProjectsByCategory,
  searchProjects,
} from '@/lib/project-utils';

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [layout, setLayout] = useState<LayoutType>(() => {
    // Load saved layout preference from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-layout');
      return (saved as LayoutType) || 'grid';
    }
    return 'grid';
  });

  // Save layout preference to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-layout', layout);
    }
  }, [layout]);

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = getProjectsByCategory(filtered, selectedCategory);
    }

    // Apply search
    if (searchQuery.trim()) {
      filtered = searchProjects(filtered, searchQuery);
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(
      (p) => p.id === selectedProject.id
    );
    if (currentIndex < filteredProjects.length - 1) {
      setSelectedProject(filteredProjects[currentIndex + 1]);
    }
  };

  const handlePreviousProject = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(
      (p) => p.id === selectedProject.id
    );
    if (currentIndex > 0) {
      setSelectedProject(filteredProjects[currentIndex - 1]);
    }
  };

  const currentIndex = selectedProject
    ? filteredProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  return (
    <section id="projects" className="py-24">
      <Container>
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore my technical projects across software development, DevOps,
              cloud infrastructure, and more
            </p>
          </div>

          {/* Filters and Layout Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <FilterBar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              projectCount={filteredProjects.length}
            />
            
            <LayoutToggle layout={layout} onLayoutChange={setLayout} />
          </div>

          {/* Projects Display - Dynamic based on layout */}
          {layout === 'grid' && (
            <ProjectGrid
              projects={filteredProjects}
              onProjectClick={handleProjectClick}
            />
          )}
          
          {layout === 'table' && (
            <ProjectTable
              projects={filteredProjects}
              onProjectClick={handleProjectClick}
            />
          )}

          {/* Anchor for skip link */}
          <div id="after-carousel" className="sr-only" />

          {/* Project Detail Modal */}
          <ProjectDetail
            project={selectedProject}
            isOpen={isDetailOpen}
            onClose={handleCloseDetail}
            onNext={currentIndex < filteredProjects.length - 1 ? handleNextProject : undefined}
            onPrevious={currentIndex > 0 ? handlePreviousProject : undefined}
          />
        </div>
      </Container>
    </section>
  );
}
