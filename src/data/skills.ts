import type { Skill } from '@/types';

const yearsOfExperience = (startYear: number) => {
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
};

const proficiencyByYears = (years: number) => {
  if (years >= 5) return 'expert';
  if (years >= 3) return 'advanced';
  if (years >= 1) return 'intermediate';
  return 'beginner';
};

export const skills: Skill[] = [
  // Languages
  {
    name: 'TypeScript',
    category: 'Languages',
    proficiency: proficiencyByYears(yearsOfExperience(2018)),
    yearsOfExperience: yearsOfExperience(2018),
  },
  {
    name: 'JavaScript',
    category: 'Languages',
    proficiency: proficiencyByYears(yearsOfExperience(2015)),
    yearsOfExperience: yearsOfExperience(2015),
  },
  {
    name: 'Python',
    category: 'Languages',
    proficiency: proficiencyByYears(yearsOfExperience(2018)),
    yearsOfExperience: yearsOfExperience(2018),
  },
  {
    name: 'Java',
    category: 'Languages',
    proficiency: proficiencyByYears(yearsOfExperience(2014)),
    yearsOfExperience: yearsOfExperience(2014),
  },
  {
    name: 'Go',
    category: 'Languages',
    proficiency: proficiencyByYears(yearsOfExperience(2018)),
    yearsOfExperience: yearsOfExperience(2018),
  },
  {
    name: 'Bash/Shell',
    category: 'Languages',
    proficiency: proficiencyByYears(yearsOfExperience(2015)),
    yearsOfExperience: yearsOfExperience(2015),
  },
  {
    name: 'SQL',
    category: 'Languages',
    proficiency: proficiencyByYears(yearsOfExperience(2015)),
    yearsOfExperience: yearsOfExperience(2015),
  },

  // Frameworks
  {
    name: 'React',
    category: 'Frameworks',
    proficiency: proficiencyByYears(yearsOfExperience(2018)),
    yearsOfExperience: yearsOfExperience(2018),
  },
  {
    name: 'Node.js',
    category: 'Frameworks',
    proficiency: proficiencyByYears(yearsOfExperience(2015)),
    yearsOfExperience: yearsOfExperience(2015),
  },
  {
    name: 'Spring Boot',
    category: 'Frameworks',
    proficiency: proficiencyByYears(yearsOfExperience(2018)),
    yearsOfExperience: yearsOfExperience(2018),
  },
  {
    name: 'Express.js',
    category: 'Frameworks',
    proficiency: proficiencyByYears(yearsOfExperience(2015)),
    yearsOfExperience: yearsOfExperience(2015),
  },
  {
    name: 'FastAPI',
    category: 'Frameworks',
    proficiency: proficiencyByYears(yearsOfExperience(2023)),
    yearsOfExperience: yearsOfExperience(2023),
  },
  {
    name: 'Next.js',
    category: 'Frameworks',
    proficiency: proficiencyByYears(yearsOfExperience(2022)),
    yearsOfExperience: yearsOfExperience(2022),
  },

  // DevOps & Tools
  {
    name: 'Docker',
    category: 'DevOps & Tools',
    proficiency: proficiencyByYears(yearsOfExperience(2018)),
    yearsOfExperience: yearsOfExperience(2018),
  },
  {
    name: 'Kubernetes',
    category: 'DevOps & Tools',
    proficiency: proficiencyByYears(yearsOfExperience(2020)),
    yearsOfExperience: yearsOfExperience(2020),
  },
  {
    name: 'Terraform',
    category: 'DevOps & Tools',
    proficiency: proficiencyByYears(yearsOfExperience(2023)),
    yearsOfExperience: yearsOfExperience(2023),
  },
  {
    name: 'Ansible',
    category: 'DevOps & Tools',
    proficiency: proficiencyByYears(yearsOfExperience(2017)),
    yearsOfExperience: yearsOfExperience(2017),
  },
  {
    name: 'GitLab CI/CD',
    category: 'DevOps & Tools',
    proficiency: proficiencyByYears(yearsOfExperience(2022)),
    yearsOfExperience: yearsOfExperience(2022),
  },
  {
    name: 'GitHub Actions',
    category: 'DevOps & Tools',
    proficiency: proficiencyByYears(yearsOfExperience(2022)),
    yearsOfExperience: yearsOfExperience(2022),
  },
  {
    name: 'Jenkins',
    category: 'DevOps & Tools',
    proficiency: proficiencyByYears(yearsOfExperience(2018)),
    yearsOfExperience: yearsOfExperience(2018),
  },
  // {
  //   name: 'ArgoCD',
  //   category: 'DevOps & Tools',
  //   proficiency: 'advanced',
  //   yearsOfExperience: 3,
  // },
  {
    name: 'Helm',
    category: 'DevOps & Tools',
    proficiency: proficiencyByYears(yearsOfExperience(2022)),
    yearsOfExperience: yearsOfExperience(2022),
  },
  {
    name: 'Prometheus',
    category: 'DevOps & Tools',
    proficiency: proficiencyByYears(yearsOfExperience(2015)),
    yearsOfExperience: yearsOfExperience(2015),
  },
  {
    name: 'Grafana',
    category: 'DevOps & Tools',
    proficiency: proficiencyByYears(yearsOfExperience(2015)),
    yearsOfExperience: yearsOfExperience(2015),
  },
  // {
  //   name: 'Datadog',
  //   category: 'DevOps & Tools',
  //   proficiency: 'intermediate',
  //   yearsOfExperience: 2,
  // },
  {
    name: 'ELK Stack',
    category: 'DevOps & Tools',
    proficiency: proficiencyByYears(yearsOfExperience(2015)),
    yearsOfExperience: yearsOfExperience(2015),
  },
  // {
  //   name: 'Istio',
  //   category: 'DevOps & Tools',
  //   proficiency: 'intermediate',
  //   yearsOfExperience: yearsOfExperience(2023),
  // },

  // Cloud Platforms
  {
    name: 'AWS',
    category: 'Cloud Platforms',
    proficiency: proficiencyByYears(yearsOfExperience(2016)),
    yearsOfExperience: yearsOfExperience(2016),
  },
  // {
  //   name: 'Azure',
  //   category: 'Cloud Platforms',
  //   proficiency: 'intermediate',
  //   yearsOfExperience: yearsOfExperience(2023),
  // },
  {
    name: 'Google Cloud Platform',
    category: 'Cloud Platforms',
    proficiency: proficiencyByYears(yearsOfExperience(2024)),
    yearsOfExperience: yearsOfExperience(2024),
  },
  {
    name: 'DigitalOcean',
    category: 'Cloud Platforms',
    proficiency: proficiencyByYears(yearsOfExperience(2020)),
    yearsOfExperience: yearsOfExperience(2020),
  },

  // Databases
  {
    name: 'PostgreSQL',
    category: 'Databases',
    proficiency: proficiencyByYears(yearsOfExperience(2018)),
    yearsOfExperience: yearsOfExperience(2018),
  },
  {
    name: 'MongoDB',
    category: 'Databases',
    proficiency: proficiencyByYears(yearsOfExperience(2024)),
    yearsOfExperience: yearsOfExperience(2024),
  },
  {
    name: 'Redis',
    category: 'Databases',
    proficiency: proficiencyByYears(yearsOfExperience(2024)),
    yearsOfExperience: yearsOfExperience(2024),
  },
  {
    name: 'MySQL',
    category: 'Databases',
    proficiency: proficiencyByYears(yearsOfExperience(2015)),
    yearsOfExperience: yearsOfExperience(2015),
  },
  {
    name: 'DynamoDB',
    category: 'Databases',
    proficiency: proficiencyByYears(yearsOfExperience(2023)),
    yearsOfExperience: yearsOfExperience(2023),
  },
  {
    name: 'Elasticsearch',
    category: 'Databases',
    proficiency: proficiencyByYears(yearsOfExperience(2018)),
    yearsOfExperience: yearsOfExperience(2018),
  },
  // {
  //   name: 'ClickHouse',
  //   category: 'Databases',
  //   proficiency: 'intermediate',
  //   yearsOfExperience: 2,
  // },
  {
    name: 'Cassandra',
    category: 'Databases',
    proficiency: proficiencyByYears(yearsOfExperience(2018)),
    yearsOfExperience: yearsOfExperience(2018),
  },

  // Other
  {
    name: 'Apache Kafka',
    category: 'Other',
    proficiency: proficiencyByYears(yearsOfExperience(2018)),
    yearsOfExperience: yearsOfExperience(2018),
  },
  {
    name: 'Apache Spark',
    category: 'Other',
    proficiency: proficiencyByYears(yearsOfExperience(2017)),
    yearsOfExperience: yearsOfExperience(2017),
  },
  {
    name: 'Apache Airflow',
    category: 'Other',
    proficiency: proficiencyByYears(yearsOfExperience(2018)),
    yearsOfExperience: yearsOfExperience(2018),
  },
  {
    name: 'RabbitMQ',
    category: 'Other',
    proficiency: proficiencyByYears(yearsOfExperience(2023)),
    yearsOfExperience: yearsOfExperience(2023),
  },
  // {
  //   name: 'GraphQL',
  //   category: 'Other',
  //   proficiency: 'advanced',
  //   yearsOfExperience: 3,
  // },
  {
    name: 'REST APIs',
    category: 'Other',
    proficiency: proficiencyByYears(yearsOfExperience(2015)),
    yearsOfExperience: yearsOfExperience(2015),
  },
  {
    name: 'gRPC',
    category: 'Other',
    proficiency: proficiencyByYears(yearsOfExperience(2018)),
    yearsOfExperience: yearsOfExperience(2018),
  },
  {
    name: 'Microservices Architecture',
    category: 'Other',
    proficiency: proficiencyByYears(yearsOfExperience(2018)),
    yearsOfExperience: yearsOfExperience(2018),
  },
  {
    name: 'Event-Driven Architecture',
    category: 'Other',
    proficiency: proficiencyByYears(yearsOfExperience(2018)),
    yearsOfExperience: yearsOfExperience(2018),
  },
  {
    name: 'System Design',
    category: 'Other',
    proficiency: proficiencyByYears(yearsOfExperience(2016)),
    yearsOfExperience: yearsOfExperience(2016),
  },
];

// Group skills by category
export const skillsByCategory = skills.reduce(
  (acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  },
  {} as Record<string, Skill[]>
);
