import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'microservices-platform',
    title: 'Microservices Image Transformation Platform',
    description:
      'Built a scalable image transformation platform using microservices architecture with Golang, React, Kafka, ElasticSearch and Kubernetes.',
    longDescription:
      'Designed and implemented a cloud-native image transformation platform using microservices architecture and an automated CI/CD pipeline.',
    category: 'Software Development',
    tags: [
      'Golang',
      'React',
      'TypeScript',
      'PostgreSQL',
      'Redis',
      'Kafka',
      'ElasticSearch',
      'Kubernetes',
      'Docker',
      'AWS',
    ],
    thumbnail: '/projects/microservices-thumb.jpg',
    images: ['/projects/microservices-1.jpg', '/projects/microservices-2.jpg'],
    demoUrl: 'https://resyze.aoilabs.net/landing',
    githubUrl: 'https://github.com/aifaniyi/resyze-api',
    featured: true,
    status: 'completed',
    publishDate: '2024-01-15',
    challenges:
      'Managing inter-service communication, handling distributed transactions, and ensuring data consistency across services.',
    solutions:
      'Implemented Saga pattern for distributed transactions, used event sourcing with Kafka, and created comprehensive API gateway with rate limiting.',
    outcomes:
      'Reduced deployment time by 70%, improved system scalability to handle 5x traffic, and reduced infrastructure costs by 40%.',
    codeSnippets: [
      {
        language: 'golang',
        code: `@Service
public class OrderService {
    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;
    
    @Transactional
    public Order createOrder(OrderRequest request) {
        Order order = orderRepository.save(createOrderEntity(request));
        kafkaTemplate.send("orders", new OrderCreatedEvent(order));
        return order;
    }
}`,
        description: 'Event-driven order creation with Kafka',
      },
    ],
  },
  {
    id: 'realtime-analytics-dashboard',
    title: 'Real-time Analytics Dashboard',
    description:
      'Developed a real-time analytics dashboard using React, D3.js, and WebSockets to visualize streaming data.',
    longDescription:
      'Created an interactive dashboard that processes and visualizes streaming data in real-time. Handles millions of events per hour with sub-second latency.',
    category: 'Software Development',
    tags: [
      'React',
      'TypeScript',
      'D3.js',
      'WebSocket',
      'Node.js',
      'TimescaleDB',
    ],
    thumbnail: '/projects/analytics-thumb.jpg',
    githubUrl: 'https://github.com/example/realtime-dashboard',
    featured: false,
    status: 'completed',
    publishDate: '2023-11-20',
    challenges:
      'Handling high-volume streaming data, optimizing rendering performance, and managing WebSocket connections at scale.',
    solutions:
      'Implemented data aggregation at the edge, used virtual scrolling for large datasets, and implemented WebSocket connection pooling.',
    outcomes:
      'Enabled real-time decision making for business teams, reduced data processing latency by 80%.',
  },
  {
    id: 'kubernetes-cicd-pipeline',
    title: 'Kubernetes CI/CD Pipeline',
    description:
      'Automated deployment pipeline using GitLab CI, ArgoCD, and Kubernetes for 50+ microservices.',
    longDescription:
      'Built a comprehensive CI/CD pipeline that automates testing, building, and deployment of microservices to Kubernetes clusters. Integrated security scanning, automated rollbacks, and blue-green deployments.',
    category: 'DevOps/SRE',
    tags: ['Kubernetes', 'Docker', 'GitLab CI', 'ArgoCD', 'Helm', 'Terraform'],
    thumbnail: '/projects/cicd-thumb.jpg',
    githubUrl: 'https://github.com/example/k8s-cicd',
    documentationUrl: 'https://docs.example.com/cicd',
    featured: true,
    status: 'completed',
    publishDate: '2024-02-10',
    challenges:
      'Managing complex deployment workflows, ensuring zero-downtime deployments, and maintaining deployment consistency across environments.',
    solutions:
      'Implemented GitOps with ArgoCD, created reusable Helm charts, and automated rollback mechanisms with health checks.',
    outcomes:
      'Reduced deployment time from 2 hours to 15 minutes, achieved 99.95% deployment success rate, and eliminated manual deployment errors.',
    codeSnippets: [
      {
        language: 'yaml',
        code: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: microservice-app
spec:
  destination:
    namespace: production
    server: https://kubernetes.default.svc
  source:
    repoURL: https://github.com/example/helm-charts
    targetRevision: HEAD
    path: charts/microservice
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`,
        description: 'ArgoCD application configuration for automated GitOps',
      },
    ],
  },
  {
    id: 'observability-stack',
    title: 'Observability Stack Implementation',
    description:
      'Implemented comprehensive observability using Prometheus and Grafana.',
    longDescription:
      'Designed and deployed a full observability stack to monitor services across Kubernetes clusters. Integrated metrics, logs, and traces for complete system visibility.',
    category: 'DevOps/SRE',
    tags: [
      'Prometheus',
      'Grafana',
      // 'Loki',
      // 'Tempo',
      // 'OpenTelemetry',
      'Kubernetes',
    ],
    thumbnail:
      'https://resyze.aoilabs.net/cdn/10dcb518-6af7-4a0d-9752-14d2ff0f8917/ace986cc-44ca-4f5c-9c55-3a398a85dc9e?w=100&h=100',
    images: [
      'https://resyze.aoilabs.net/cdn/10dcb518-6af7-4a0d-9752-14d2ff0f8917/ace986cc-44ca-4f5c-9c55-3a398a85dc9e',
      'https://resyze.aoilabs.net/cdn/10dcb518-6af7-4a0d-9752-14d2ff0f8917/05f1c6de-7ac4-48d6-b97c-817b78b11980',
    ],
    demoUrl: 'https://grafana.aoilabs.net',
    // githubUrl: 'https://github.com/example/observability-stack',
    featured: true,
    status: 'completed',
    publishDate: '2023-12-05',
    // challenges:
    //   'Collecting metrics from diverse sources, correlating logs and traces, and managing storage costs for high-volume telemetry data.',
    // solutions:
    //   'Implemented metric aggregation and sampling, used Loki for log aggregation, and deployed Tempo for distributed tracing.',
    // outcomes:
    //   'Reduced MTTR by 65%, improved system visibility, and enabled proactive issue detection.',
  },
  // {
  //   id: 'internal-developer-platform',
  //   title: 'Internal Developer Platform',
  //   description:
  //     'Built an IDP using Backstage, enabling self-service infrastructure provisioning and deployment.',
  //   longDescription:
  //     'Created a unified developer portal that streamlines infrastructure provisioning, service deployment, and documentation. Integrated with existing tools like Kubernetes, Terraform, and GitLab.',
  //   category: 'Platform Engineering',
  //   tags: [
  //     'Backstage',
  //     'Node.js',
  //     'React',
  //     'Kubernetes',
  //     'Terraform',
  //     'PostgreSQL',
  //   ],
  //   thumbnail: '/projects/idp-thumb.jpg',
  //   demoUrl: 'https://developer-portal.example.com',
  //   githubUrl: 'https://github.com/example/developer-platform',
  //   featured: true,
  //   status: 'in-progress',
  //   publishDate: '2024-03-01',
  //   challenges:
  //     'Integrating multiple tools and services, creating intuitive self-service workflows, and maintaining platform security.',
  //   solutions:
  //     'Built custom Backstage plugins, implemented RBAC, and created reusable templates for common infrastructure patterns.',
  //   outcomes:
  //     'Reduced onboarding time for new developers by 50%, decreased infrastructure provisioning time from days to minutes.',
  // },
  // {
  //   id: 'service-mesh-migration',
  //   title: 'Service Mesh Migration with Istio',
  //   description:
  //     'Migrated 60+ microservices to Istio service mesh for improved security, observability, and traffic management.',
  //   longDescription:
  //     'Led the migration of a large microservices architecture to Istio service mesh. Implemented mTLS, advanced traffic routing, and circuit breaking.',
  //   category: 'Platform Engineering',
  //   tags: ['Istio', 'Kubernetes', 'Envoy', 'Go', 'Prometheus', 'Grafana'],
  //   thumbnail: '/projects/service-mesh-thumb.jpg',
  //   githubUrl: 'https://github.com/example/istio-migration',
  //   featured: false,
  //   status: 'completed',
  //   publishDate: '2023-10-15',
  //   challenges:
  //     'Zero-downtime migration, managing service mesh complexity, and training teams on new patterns.',
  //   solutions:
  //     'Implemented gradual rollout strategy, created comprehensive documentation, and built custom operators for common patterns.',
  //   outcomes:
  //     'Achieved 100% mTLS encryption, improved observability, and reduced latency by 20%.',
  // },
  {
    id: 'data-pipeline-etl',
    title: 'Scalable ETL Data Pipeline',
    description:
      'Built a distributed ETL pipeline using Apache Airflow, Spark, and Amazon S3 processing between 500GB and 1TB+ CDN logs daily.',
    longDescription:
      'Designed and implemented a scalable data pipeline that ingests data from multiple sources (S3, SFTP, ...), transforms it using Spark, and stores it in S3 for later analytics using SparkSQL.',
    category: 'Data Engineering',
    tags: ['Apache Airflow', 'Apache Spark', 'Python', 'AWS S3', 'Databricks'],
    thumbnail: '/projects/etl-thumb.jpg',
    githubUrl: 'https://github.com/example/data-pipeline',
    featured: true,
    status: 'completed',
    publishDate: '2017-01-20',
    challenges:
      'Handling data quality issues, managing pipeline failures, and optimizing for cost and performance.',
    solutions:
      'Implemented data validation framework, created automated retry mechanisms, and optimized Spark jobs for performance.',
    outcomes:
      'Reduced data processing time by 60%, improved data quality to 99.9%.',
    codeSnippets: [
      {
        language: 'Python',
        code: `from airflow import DAG
from airflow.providers.apache.spark.operators.spark_submit import SparkSubmitOperator

with DAG('data_pipeline', schedule_interval='@daily') as dag:
    process_data = SparkSubmitOperator(
        task_id='process_data',
        application='jobs/process_data.py',
        conf={'spark.executor.memory': '8g'}
    )`,
        description: 'Airflow DAG for daily data processing',
      },
    ],
  },
  {
    id: 'streaming-analytics',
    title: 'Real-time Streaming Analytics',
    description:
      'Implemented real-time data processing using Apache Kafka, Spark, and Elasticsearch for event analytics.',
    longDescription:
      'Built a real-time analytics platform that processes millions of events per second using Kafka Streams and Apache Spark.',
    category: 'Data Engineering',
    tags: [
      'Apache Kafka',
      'Apache Spark',
      'Elasticsearch',
      'Python',
      'Docker',
      'Kubernetes',
    ],
    thumbnail: '/projects/streaming-thumb.jpg',
    githubUrl: 'https://github.com/example/streaming-analytics',
    featured: false,
    status: 'completed',
    publishDate: '2023-09-10',
    challenges:
      'Handling late-arriving data, managing state in distributed processing, and ensuring exactly-once semantics.',
    solutions:
      'Implemented watermarking for late data, used Spark state backends, and configured Kafka transactions.',
    outcomes:
      'Enabled real-time business insights, processed 10M+ events per hour with sub-second latency.',
  },
  {
    id: 'aws-multi-account',
    title: 'AWS Multi-Account Strategy',
    description:
      'Designed and implemented AWS multi-account architecture using AWS Organizations and Control Tower.',
    longDescription:
      'Created a scalable AWS multi-account setup following best practices for security, compliance, and cost management across 50+ AWS accounts.',
    category: 'Cloud Infrastructure',
    tags: [
      'AWS',
      'Terraform',
      'AWS Organizations',
      'Control Tower',
      'IAM',
      'CloudFormation',
    ],
    thumbnail: '/projects/aws-multi-thumb.jpg',
    githubUrl: 'https://github.com/example/aws-multi-account',
    featured: true,
    status: 'completed',
    publishDate: '2024-02-28',
    challenges:
      'Managing IAM permissions across accounts, implementing centralized logging and monitoring, and ensuring compliance.',
    solutions:
      'Used AWS Control Tower for account provisioning, implemented SCPs for guardrails, and centralized logging with CloudWatch.',
    outcomes:
      'Improved security posture, reduced blast radius of security incidents, and streamlined account management.',
    codeSnippets: [
      {
        language: 'hcl',
        code: `module "organization" {
  source = "./modules/organization"
  
  organizational_units = {
    production = {
      name = "Production"
      policies = ["restrict-regions", "require-mfa"]
    }
    development = {
      name = "Development"
      policies = ["cost-optimization"]
    }
  }
}`,
        description: 'Terraform module for AWS Organizations setup',
      },
    ],
  },
  {
    id: 'terraform-modules',
    title: 'Reusable Terraform Module Library',
    description:
      'Created a comprehensive library of reusable Terraform modules for AWS infrastructure provisioning.',
    longDescription:
      'Developed and maintained 30+ Terraform modules following best practices for versioning, testing, and documentation.',
    category: 'Cloud Infrastructure',
    tags: ['Terraform', 'AWS', 'Terratest', 'Go', 'GitLab CI', 'S3'],
    thumbnail: '/projects/terraform-thumb.jpg',
    githubUrl: 'https://github.com/example/terraform-modules',
    documentationUrl: 'https://terraform-docs.example.com',
    featured: true,
    status: 'completed',
    publishDate: '2023-11-30',
    challenges:
      'Maintaining backward compatibility, testing infrastructure code, and managing module dependencies.',
    solutions:
      'Implemented semantic versioning, used Terratest for automated testing, and created comprehensive documentation.',
    outcomes:
      'Reduced infrastructure provisioning time by 75%, improved consistency across environments.',
  },
  // {
  //   id: 'network-automation',
  //   title: 'Network Automation Framework',
  //   description:
  //     'Automated network configuration and monitoring using Ansible, Python, and NetBox.',
  //   longDescription:
  //     'Built a network automation framework that manages 200+ network devices including routers, switches, and firewalls.',
  //   category: 'Networking',
  //   tags: ['Ansible', 'Python', 'NetBox', 'NAPALM', 'Cisco', 'Juniper'],
  //   thumbnail: '/projects/network-automation-thumb.jpg',
  //   githubUrl: 'https://github.com/example/network-automation',
  //   featured: true,
  //   status: 'completed',
  //   publishDate: '2023-08-15',
  //   challenges:
  //     'Managing diverse network device vendors, ensuring configuration consistency, and handling network changes safely.',
  //   solutions:
  //     'Used NAPALM for vendor-agnostic APIs, implemented dry-run mode, and created rollback mechanisms.',
  //   outcomes:
  //     'Reduced network configuration time by 90%, eliminated configuration drift, and improved compliance.',
  // },
  // {
  //   id: 'sdn-implementation',
  //   title: 'Software-Defined Networking with OpenFlow',
  //   description:
  //     'Implemented SDN solution using OpenFlow and custom controller for dynamic network management.',
  //   longDescription:
  //     'Designed and deployed an SDN architecture that provides centralized network control and programmability.',
  //   category: 'Networking',
  //   tags: ['OpenFlow', 'Python', 'Open vSwitch', 'SDN', 'Kubernetes', 'Docker'],
  //   thumbnail: '/projects/sdn-thumb.jpg',
  //   githubUrl: 'https://github.com/example/sdn-controller',
  //   featured: false,
  //   status: 'completed',
  //   publishDate: '2023-07-20',
  //   challenges:
  //     'Ensuring high availability of the controller, managing flow rules efficiently, and integrating with existing network.',
  //   solutions:
  //     'Implemented controller clustering, optimized flow rule installation, and created migration plan.',
  //   outcomes:
  //     'Improved network agility, reduced provisioning time from hours to seconds.',
  // },
];
