export type Category =
  | 'Software Development'
  | 'DevOps/SRE'
  | 'Platform Engineering'
  | 'Data Engineering'
  | 'Cloud Infrastructure'
  | 'Networking';

export type ProjectStatus = 'completed' | 'in-progress' | 'archived';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: Category;
  tags: string[];
  thumbnail: string;
  images?: string[];
  demoUrl?: string;
  githubUrl?: string;
  documentationUrl?: string;
  featured?: boolean;
  status: ProjectStatus;
  publishDate: string;
  challenges?: string;
  solutions?: string;
  outcomes?: string;
  codeSnippets?: CodeSnippet[];
}

export interface CodeSnippet {
  language: string;
  code: string;
  description?: string;
}

export type SkillCategory =
  | 'Languages'
  | 'Frameworks'
  | 'DevOps & Tools'
  | 'Cloud Platforms'
  | 'Databases'
  | 'Other';

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
  icon?: string;
}

export type SocialPlatform = 'github' | 'linkedin' | 'twitter' | 'email' | 'website';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  achievements?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}
