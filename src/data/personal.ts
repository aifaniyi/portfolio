import type { SocialLink } from '@/types';

export const socialLinks: SocialLink[] = [
  {
    platform: 'github',
    url: 'https://github.com/aifaniyi',
    label: 'GitHub',
  },
  {
    platform: 'linkedin',
    url: 'https://www.linkedin.com/in/akinwale-ifaniyi-a865b861',
    label: 'LinkedIn',
  },
  {
    platform: 'email',
    url: 'mailto:waleifaniyi@gmail.com',
    label: 'Email',
  },
];

export const contactInfo = {
  email: 'waleifaniyi@gmail.com',
  location: 'Calgary, AB',
  availability: 'Open to opportunities',
};

export const personalInfo = {
  name: 'Akinwale Ifaniyi',
  title: 'AI | Backend Engineer | DevOps & Cloud Infrastructure Specialist',
  tagline:
    'Building scalable systems and infrastructure with expertise in cloud platforms, DevOps, and modern software development',
  bio: `Passionate technologist with expertise spanning software development, DevOps/SRE, platform engineering, data engineering, cloud infrastructure, and networking. 
  
I specialize in building and scaling distributed systems, implementing robust CI/CD pipelines, and architecting cloud-native solutions. With a strong foundation in both development and operations, I bridge the gap between software engineering and infrastructure to deliver high-quality, resilient systems.

My experience includes designing microservices architectures, implementing comprehensive observability solutions, building internal developer platforms, and automating infrastructure at scale. I'm committed to continuous learning and sharing knowledge with the community.`,
  expertise: [
    'Cloud-Native Architecture & Microservices',
    'CI/CD Pipeline Automation',
    'Kubernetes & Container Orchestration',
    'Infrastructure as Code (Terraform, Ansible)',
    'Site Reliability Engineering (SRE)',
    'Data Engineering & Real-time Analytics',
    'Network Automation & SDN',
    'Platform Engineering & Developer Experience',
  ],
};
