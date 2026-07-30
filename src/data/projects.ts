export interface Project {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  github: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  workflow: string[];
  challenges: string[];
  lessons: string[];
  improvements: string[];
}

export const projects: Project[] = [
  {
    slug: 'three-tier-application',
    title: 'Three-Tier Application Deployment',
    summary:
      'A containerized web application split into presentation, application, and data layers, each deployed and scaled independently.',
    stack: ['Docker', 'Nginx', 'Node.js', 'MongoDB', 'Linux'],
    github: 'https://github.com/vishalkjadhav45-ai',
    overview:
      'A classic three-tier architecture built to practice separating concerns across the presentation, application, and data layers, each running in its own container with clear network boundaries.',
    problem:
      'A single monolithic container made local development slow and made it impossible to scale the web layer independently from the database.',
    solution:
      'Split the application into three services connected through a dedicated Docker network: an Nginx-served frontend, a Node.js API layer, and a MongoDB data layer, each with its own Dockerfile and health checks.',
    architecture: [
      'Client requests hit Nginx, which serves static assets and proxies /api calls',
      'Nginx forwards API traffic to the Node.js application container over the internal network',
      'The application container reads and writes to a MongoDB container with a persistent volume',
      'Environment variables inject configuration per environment (dev, staging, prod)',
    ],
    workflow: [
      'docker compose build assembles all three images',
      'docker compose up starts services in dependency order using health checks',
      'Nginx configuration is validated with nginx -t before every deploy',
      'Data volume is backed up before any schema-affecting change',
    ],
    challenges: [
      'Container startup ordering caused the API to fail before MongoDB was ready',
      'Nginx proxy headers needed manual tuning to preserve client IPs',
    ],
    lessons: [
      'Health checks are non-negotiable for multi-container startup ordering',
      'Keeping each tier in its own image made debugging dramatically faster',
    ],
    improvements: [
      'Move orchestration from Docker Compose to a Kubernetes manifest',
      'Add a caching layer between the API and database',
    ],
  },
  {
    slug: 'dockerized-node-app',
    title: 'Dockerized Node.js Application',
    summary:
      'A production-style Node.js service packaged with a multi-stage Dockerfile to minimize image size and attack surface.',
    stack: ['Docker', 'Node.js', 'Linux'],
    github: 'https://github.com/vishalkjadhav45-ai',
    overview:
      'Focused exercise in writing a lean, secure Dockerfile for a Node.js service, using multi-stage builds to separate build-time dependencies from the runtime image.',
    problem:
      'An early single-stage Dockerfile produced a 1.2GB image that shipped build tools, dev dependencies, and source maps into production.',
    solution:
      'Rewrote the Dockerfile with a build stage that installs dependencies and compiles assets, then copied only the production artifacts into a slim runtime base image running as a non-root user.',
    architecture: [
      'Stage 1 (builder) installs full dependency tree and runs the build script',
      'Stage 2 (runtime) copies only dist/ and production node_modules',
      'Container runs as a dedicated non-root user with a read-only filesystem where possible',
      'A .dockerignore file excludes local env files and test artifacts',
    ],
    workflow: [
      'docker build with BuildKit cache mounts to speed up dependency installs',
      'Image scanned for vulnerabilities before being tagged as release-ready',
      'Semantic version tags pushed alongside a latest tag',
    ],
    challenges: [
      'Native dependencies required matching build tools between stages',
      'Reducing the final image from 1.2GB to under 180MB took several iterations',
    ],
    lessons: [
      'Multi-stage builds are the default answer to bloated images, not an edge case',
      'Running as non-root catches permission issues early instead of in production',
    ],
    improvements: [
      'Add automated image scanning to the CI pipeline',
      'Introduce distroless base images for an even smaller footprint',
    ],
  },
  {
    slug: 'kubernetes-deployment',
    title: 'Kubernetes Deployment & Rollout Strategy',
    summary:
      'Deploying a containerized service to a Kubernetes cluster with rolling updates, resource limits, and readiness probes.',
    stack: ['Kubernetes', 'Docker', 'Linux'],
    github: 'https://github.com/vishalkjadhav45-ai',
    overview:
      'Hands-on practice translating a Docker Compose setup into Kubernetes manifests, covering Deployments, Services, ConfigMaps, and rollout behavior.',
    problem:
      'Manual container restarts on the host meant every deploy caused visible downtime and no way to roll back quickly.',
    solution:
      'Defined a Deployment with a rolling update strategy, a ClusterIP Service for internal routing, and a ConfigMap for environment configuration, enabling zero-downtime deploys and one-command rollbacks.',
    architecture: [
      'Deployment manages replica count, rolling update strategy, and pod template',
      'Service exposes a stable internal endpoint across pod restarts',
      'ConfigMap decouples environment configuration from the container image',
      'Readiness and liveness probes gate traffic until a pod is actually healthy',
    ],
    workflow: [
      'kubectl apply -f applies manifests declaratively',
      'Rolling updates replace pods gradually based on maxSurge and maxUnavailable',
      'kubectl rollout undo provides an immediate rollback path',
      'kubectl describe pod is the first diagnostic step on failure',
    ],
    challenges: [
      'A missing readiness probe caused traffic to hit pods before the app was ready',
      'Understanding resource requests and limits took deliberate experimentation',
    ],
    lessons: [
      'Readiness probes are what actually make rolling updates safe',
      'Declarative manifests make cluster state easy to reason about and version control',
    ],
    improvements: [
      'Add a Horizontal Pod Autoscaler based on CPU utilization',
      'Introduce Helm for templated, reusable manifests',
    ],
  },
  {
    slug: 'ci-cd-pipeline',
    title: 'CI/CD Pipeline with Jenkins',
    summary:
      'An automated pipeline that builds, tests, scans, and deploys on every push, replacing a manual release checklist.',
    stack: ['Jenkins', 'Git', 'GitHub', 'Maven', 'SonarQube', 'Ansible'],
    github: 'https://github.com/vishalkjadhav45-ai',
    overview:
      'A declarative Jenkins pipeline that turns a manual, error-prone release process into a repeatable sequence of build, test, quality-gate, and deploy stages.',
    problem:
      'Releases depended on a manually run checklist, which occasionally skipped tests or shipped uncommitted local changes.',
    solution:
      'Built a Jenkinsfile with distinct stages for build, unit tests, static analysis via SonarQube, and deployment via an Ansible playbook, triggered automatically on every push to main.',
    architecture: [
      'GitHub webhook triggers the Jenkins pipeline on push',
      'Maven stage compiles the project and runs the unit test suite',
      'SonarQube stage enforces a quality gate before proceeding',
      'Ansible playbook stage handles configuration and deployment to the target host',
    ],
    workflow: [
      'Push to main triggers the pipeline automatically',
      'Pipeline fails fast if tests or the quality gate do not pass',
      'Successful builds are tagged and archived as build artifacts',
      'Ansible applies the deployment playbook only after all prior stages pass',
    ],
    challenges: [
      'Flaky tests occasionally failed the pipeline for unrelated reasons',
      'Getting SonarQube quality gate status to block the pipeline correctly took extra configuration',
    ],
    lessons: [
      'A pipeline is only trustworthy if failures are loud and immediate',
      'Automating the boring parts of a release freed up time for actual engineering',
    ],
    improvements: [
      'Add a staging environment with automated smoke tests before production',
      'Introduce parallel test stages to shorten pipeline duration',
    ],
  },
  {
    slug: 'nginx-reverse-proxy',
    title: 'NGINX Reverse Proxy & Load Balancer',
    summary:
      'NGINX configured as a reverse proxy in front of multiple application instances, handling SSL termination and load balancing.',
    stack: ['NGINX', 'Linux', 'Docker'],
    github: 'https://github.com/vishalkjadhav45-ai',
    overview:
      'A reverse proxy layer that fronts multiple backend instances, terminates SSL, and distributes traffic using a round-robin strategy.',
    problem:
      'A single application instance was a single point of failure with no way to distribute load or terminate SSL centrally.',
    solution:
      'Configured NGINX as a reverse proxy with an upstream block listing multiple backend instances, added SSL termination, and enabled gzip compression for static responses.',
    architecture: [
      'NGINX listens on 443 and terminates SSL using a managed certificate',
      'Upstream block load-balances requests across backend containers',
      'Static assets are served directly by NGINX with cache headers',
      'Access and error logs are shipped to a centralized log directory',
    ],
    workflow: [
      'nginx -t validates configuration syntax before every reload',
      'nginx -s reload applies configuration changes without dropping connections',
      'Health checks remove unhealthy upstream servers from rotation',
    ],
    challenges: [
      'Misconfigured proxy headers initially broke client IP logging',
      'Balancing cache headers against the need for fresh deployments took tuning',
    ],
    lessons: [
      'A reverse proxy is one of the highest-leverage pieces of infrastructure to get right',
      'Config validation before reload prevents almost all self-inflicted outages',
    ],
    improvements: [
      'Add rate limiting to protect backend services from abuse',
      'Automate certificate renewal with a scheduled job',
    ],
  },
  {
    slug: 'aws-ec2-deployment',
    title: 'AWS EC2 Deployment',
    summary:
      'Provisioning and securing an EC2 instance to host a production-style application, with IAM roles scoped to least privilege.',
    stack: ['AWS', 'Linux', 'Docker', 'NGINX'],
    github: 'https://github.com/vishalkjadhav45-ai',
    overview:
      'End-to-end deployment of a containerized application to an AWS EC2 instance, covering networking, security groups, and access control.',
    problem:
      'Needed a repeatable way to get an application from a local container to a publicly reachable, reasonably secure cloud instance.',
    solution:
      'Provisioned an EC2 instance inside a dedicated VPC, configured security groups to expose only required ports, attached a scoped IAM role, and deployed the application via Docker behind NGINX.',
    architecture: [
      'VPC with a public subnet hosts the EC2 instance',
      'Security group allows only HTTP, HTTPS, and SSH from a known IP range',
      'IAM role grants the instance only the permissions it needs, nothing broader',
      'Elastic IP keeps the public address stable across instance restarts',
    ],
    workflow: [
      'Infrastructure changes are made deliberately and documented before applying',
      'SSH access is key-based only, with password authentication disabled',
      'Application is deployed via Docker and fronted by NGINX on the instance',
    ],
    challenges: [
      'An overly broad security group in an early pass was tightened after review',
      'Balancing convenience of access against least-privilege access took iteration',
    ],
    lessons: [
      'Least privilege is easier to design in from the start than to retrofit',
      'A stable Elastic IP avoids a whole category of DNS-related deployment headaches',
    ],
    improvements: [
      'Move to Infrastructure as Code with Terraform for repeatability',
      'Add CloudWatch alarms for basic health and cost monitoring',
    ],
  },
];

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
