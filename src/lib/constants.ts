import type { Category } from '@/types';

export const CATEGORIES: Category[] = [
  'Software Development',
  'DevOps/SRE',
  'Platform Engineering',
  'Data Engineering',
  'Cloud Infrastructure',
  'Networking',
];

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  'Software Development':
    'Full-stack applications, microservices, and modern web development',
  'DevOps/SRE':
    'CI/CD pipelines, automation, monitoring, and site reliability engineering',
  'Platform Engineering':
    'Internal developer platforms, service mesh, and infrastructure abstractions',
  'Data Engineering':
    'Data pipelines, ETL processes, streaming analytics, and big data systems',
  'Cloud Infrastructure':
    'Cloud architecture, IaC, multi-account strategies, and cloud optimization',
  Networking:
    'Network automation, SDN, infrastructure connectivity, and network security',
};

export const APP_CONFIG = {
  siteName: 'Portfolio',
  siteDescription:
    'Technical portfolio showcasing projects in software development, DevOps, cloud infrastructure, and more',
  siteUrl: 'https://yourportfolio.com',
  author: 'Your Name',
  social: {
    github: 'yourusername',
    linkedin: 'yourusername',
    twitter: 'yourusername',
  },
};
