import type { Project, Category } from '@/types';

export function getProjectsByCategory(
  projects: Project[],
  category: Category
): Project[] {
  return projects.filter((project) => project.category === category);
}

export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.filter((project) => project.featured);
}

export function searchProjects(projects: Project[], query: string): Project[] {
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) return projects;

  return projects.filter((project) => {
    const searchableText = `
      ${project.title}
      ${project.description}
      ${project.longDescription}
      ${project.tags.join(' ')}
      ${project.category}
    `.toLowerCase();

    return searchableText.includes(lowerQuery);
  });
}

export function filterProjectsByTags(
  projects: Project[],
  tags: string[]
): Project[] {
  if (tags.length === 0) return projects;

  return projects.filter((project) =>
    tags.some((tag) =>
      project.tags.some((projectTag) =>
        projectTag.toLowerCase().includes(tag.toLowerCase())
      )
    )
  );
}

export function getAllTags(projects: Project[]): string[] {
  const tagsSet = new Set<string>();

  projects.forEach((project) => {
    project.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

export function getProjectById(
  projects: Project[],
  id: string
): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getRelatedProjects(
  projects: Project[],
  currentProject: Project,
  limit: number = 3
): Project[] {
  // Find projects with similar tags or same category
  const related = projects
    .filter((project) => project.id !== currentProject.id)
    .map((project) => {
      let score = 0;

      // Same category
      if (project.category === currentProject.category) {
        score += 3;
      }

      // Shared tags
      const sharedTags = project.tags.filter((tag) =>
        currentProject.tags.includes(tag)
      );
      score += sharedTags.length;

      return { project, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ project }) => project);

  return related;
}

export function getCategoryColor(category: Category): string {
  const colors: Record<Category, string> = {
    'Software Development': 'bg-blue-500',
    'DevOps/SRE': 'bg-emerald-500',
    'Platform Engineering': 'bg-violet-500',
    'Data Engineering': 'bg-amber-500',
    'Cloud Infrastructure': 'bg-cyan-500',
    Networking: 'bg-pink-500',
  };

  return colors[category] || 'bg-gray-500';
}

export function getCategoryTextColor(category: Category): string {
  const colors: Record<Category, string> = {
    'Software Development': 'text-blue-600 dark:text-blue-400',
    'DevOps/SRE': 'text-emerald-600 dark:text-emerald-400',
    'Platform Engineering': 'text-violet-600 dark:text-violet-400',
    'Data Engineering': 'text-amber-600 dark:text-amber-400',
    'Cloud Infrastructure': 'text-cyan-600 dark:text-cyan-400',
    Networking: 'text-pink-600 dark:text-pink-400',
  };

  return colors[category] || 'text-gray-600 dark:text-gray-400';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
}
