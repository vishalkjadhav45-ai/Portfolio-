export interface TimelineStep {
  name: string;
  note: string;
}

export const timeline: TimelineStep[] = [
  { name: 'Linux', note: 'Foundation — the filesystem, the shell, the process model.' },
  { name: 'Git', note: 'Learned to treat every change as a reviewable, reversible unit.' },
  { name: 'GitHub', note: 'Collaboration workflows, pull requests, and code review discipline.' },
  { name: 'Maven', note: 'Dependency and build lifecycle management for Java services.' },
  { name: 'SonarQube', note: 'Made code quality a gate, not an afterthought.' },
  { name: 'Ansible', note: 'Configuration as code — idempotent, repeatable provisioning.' },
  { name: 'Jenkins', note: 'Automated the release process end to end.' },
  { name: 'Docker', note: 'Packaged applications to run the same way everywhere.' },
  { name: 'Kubernetes', note: 'Currently learning — orchestration, scaling, and resilience.' },
  { name: 'AWS', note: 'Currently learning — cloud infrastructure and least-privilege access.' },
];
