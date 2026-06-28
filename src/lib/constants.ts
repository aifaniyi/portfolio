import type { Category } from '@/types';

export const CATEGORIES: Category[] = [
  'Software Development',
  'DevOps/SRE',
  // 'Platform Engineering',
  'Data Engineering',
  'Cloud Infrastructure',
  // 'Networking',
];

export const CATEGORY_DESCRIPTIONS: Partial<Record<Category, string>> = {
  'Software Development':
    'Full-stack applications, microservices, and modern web development',
  'DevOps/SRE':
    'CI/CD pipelines, automation, monitoring, and site reliability engineering',
  'Data Engineering':
    'Data pipelines, ETL processes, streaming analytics, and big data systems',
  'Cloud Infrastructure':
    'Cloud architecture, IaC, multi-account strategies, and cloud optimization',
};

export const APP_CONFIG = {
  siteName:
    'Akinwale Ifaniyi - Software Engineer | Cloud | DevOps | Data Engineer',
  siteDescription:
    'My technical portfolio showcasing projects in software development, DevOps, cloud infrastructure, and more',
  siteUrl: 'https://aifaniiyi.dev',
  author: 'Akinwale Ifaniyi',
  social: {
    github: 'https://github.com/aifaniyi',
    linkedin: 'https://www.linkedin.com/in/akinwale-ifaniyi-a865b861',
    // twitter: 'https://twitter.com/yourusername',
  },
};
