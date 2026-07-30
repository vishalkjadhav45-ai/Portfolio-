import { Download, GraduationCap, Wrench, FolderGit2, TrendingUp, Award, Target } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { Reveal, GlassCard } from '../components/GlassCard';

const sections = [
  {
    icon: GraduationCap,
    title: 'Education',
    body: 'Bachelor of Computer Applications (BCA) — third year, focused on systems and infrastructure coursework.',
  },
  {
    icon: Wrench,
    title: 'Technical Skills',
    body: 'Linux, Git, GitHub, Docker, Kubernetes, Jenkins, Ansible, AWS, NGINX, Maven, SonarQube.',
  },
  {
    icon: FolderGit2,
    title: 'Projects',
    body: 'Six documented DevOps projects spanning containers, orchestration, CI/CD, and cloud deployment.',
  },
  {
    icon: TrendingUp,
    title: 'Learning Journey',
    body: 'A self-directed path from Linux fundamentals through to Kubernetes and AWS, in progress.',
  },
  {
    icon: Award,
    title: 'Certifications',
    body: 'Coming soon — currently preparing for foundational cloud and Kubernetes certifications.',
  },
  {
    icon: Target,
    title: 'Professional Goal',
    body: 'To grow into a DevOps or Platform Engineering role where reliability and automation are the craft.',
  },
];

export default function Resume() {
  return (
    <PageTransition>
      <section className="max-w-4xl mx-auto px-6 pt-36 pb-10 text-center">
        <Reveal>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-emerald mb-3">Resume</p>
          <h1 className="font-display text-3xl md:text-4xl text-ink tracking-tight">
            Resume Currently Under Preparation
          </h1>
          <p className="mt-4 text-ink-muted text-[15px] max-w-lg mx-auto leading-relaxed">
            A downloadable resume is on the way. In the meantime, here's a structured summary of
            where things stand.
          </p>

          <button
            disabled
            aria-disabled="true"
            className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-lg border text-sm font-medium text-steel-dim cursor-not-allowed"
            style={{ borderColor: 'var(--color-hairline)' }}
          >
            <Download size={15} />
            Download Resume
            <span className="ml-1 text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: 'var(--color-graphite-raised)' }}>
              Available Soon
            </span>
          </button>
        </Reveal>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-28">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <GlassCard className="h-full">
                <s.icon size={20} className="text-azure-soft" strokeWidth={1.75} />
                <p className="font-display text-base text-ink mt-4">{s.title}</p>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{s.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
