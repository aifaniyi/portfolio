import { useState, useMemo } from 'react';
import { Container } from './Container';
import { FilterBar } from './FilterBar';
import { ProjectGrid } from './ProjectGrid';
import { ProjectDetail } from './ProjectDetail';
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

          {/* Filters */}
          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            projectCount={filteredProjects.length}
          />

          {/* Projects Grid */}
          <ProjectGrid
            projects={filteredProjects}
            onProjectClick={handleProjectClick}
          />

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
