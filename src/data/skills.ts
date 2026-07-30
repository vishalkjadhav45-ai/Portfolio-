export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  level: 'Learning' | 'Proficient' | 'Comfortable';
  relatedProjects: string[];
}

export const skillCategories = [
  'Operating Systems',
  'Version Control',
  'Containers',
  'Orchestration',
  'CI/CD',
  'Cloud',
  'Web Server',
  'Build Tools',
  'Code Quality',
] as const;

export const skills: Skill[] = [
  {
    id: 'linux',
    name: 'Linux',
    category: 'Operating Systems',
    description: 'Daily driver for scripting, process management, and server administration.',
    level: 'Comfortable',
    relatedProjects: ['three-tier-application', 'nginx-reverse-proxy'],
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Version Control',
    description: 'Branching strategies, rebases, and clean commit history as a habit.',
    level: 'Comfortable',
    relatedProjects: ['ci-cd-pipeline'],
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Version Control',
    description: 'Actions, pull request workflows, and repository hygiene.',
    level: 'Comfortable',
    relatedProjects: ['ci-cd-pipeline'],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Containers',
    description: 'Multi-stage builds, image optimization, and container networking.',
    level: 'Proficient',
    relatedProjects: ['dockerized-node-app', 'three-tier-application'],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'Orchestration',
    description: 'Deployments, services, ConfigMaps, and rolling update strategies.',
    level: 'Learning',
    relatedProjects: ['kubernetes-deployment'],
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    category: 'CI/CD',
    description: 'Declarative pipelines, build stages, and automated testing gates.',
    level: 'Proficient',
    relatedProjects: ['ci-cd-pipeline'],
  },
  {
    id: 'ansible',
    name: 'Ansible',
    category: 'CI/CD',
    description: 'Idempotent playbooks for configuration management and provisioning.',
    level: 'Learning',
    relatedProjects: ['ci-cd-pipeline'],
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud',
    description: 'EC2, VPC, IAM, and S3 for deploying and securing infrastructure.',
    level: 'Learning',
    relatedProjects: ['aws-ec2-deployment'],
  },
  {
    id: 'nginx',
    name: 'NGINX',
    category: 'Web Server',
    description: 'Reverse proxying, load balancing, and SSL termination.',
    level: 'Proficient',
    relatedProjects: ['nginx-reverse-proxy'],
  },
  {
    id: 'maven',
    name: 'Maven',
    category: 'Build Tools',
    description: 'Dependency management and build lifecycle for Java-based services.',
    level: 'Learning',
    relatedProjects: ['ci-cd-pipeline'],
  },
  {
    id: 'sonarqube',
    name: 'SonarQube',
    category: 'Code Quality',
    description: 'Static analysis gates integrated into the CI pipeline for code health.',
    level: 'Learning',
    relatedProjects: ['ci-cd-pipeline'],
  },
];
