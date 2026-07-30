import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';
import { GithubIcon } from '../components/BrandIcons';
import PageTransition from '../components/PageTransition';
import { Reveal, TechBadge, GlassCard } from '../components/GlassCard';
import { getProjectBySlug } from '../data/projects';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug ?? '');

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <PageTransition>
      <section className="max-w-4xl mx-auto px-6 pt-36 pb-10">
        <Reveal>
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors">
            <ArrowLeft size={14} /> All projects
          </Link>

          <h1 className="font-display text-3xl md:text-4xl text-ink mt-6 tracking-tight">{project.title}</h1>
          <p className="mt-4 text-ink-muted text-[15px] leading-relaxed max-w-2xl">{project.overview}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <TechBadge key={t}>{t}</TechBadge>
            ))}
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-azure text-white text-sm font-medium hover:bg-azure-soft transition-colors"
          >
            <GithubIcon size={15} /> View Repository
          </a>
        </Reveal>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-10 grid md:grid-cols-2 gap-6">
        <Reveal>
          <GlassCard hover={false} className="h-full">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-emerald mb-3">Problem Statement</p>
            <p className="text-sm text-ink-muted leading-relaxed">{project.problem}</p>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.05}>
          <GlassCard hover={false} className="h-full">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-azure-soft mb-3">Solution</p>
            <p className="text-sm text-ink-muted leading-relaxed">{project.solution}</p>
          </GlassCard>
        </Reveal>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-10">
        <Reveal>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-steel-dim mb-4 border-b pb-3" style={{ borderColor: 'var(--color-hairline)' }}>
            Architecture
          </p>
          <ul className="space-y-3">
            {project.architecture.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-ink-muted leading-relaxed">
                <span className="font-mono text-xs text-azure-soft mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-10">
        <Reveal>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-steel-dim mb-4 border-b pb-3" style={{ borderColor: 'var(--color-hairline)' }}>
            Deployment Workflow
          </p>
          <div className="glass rounded-xl p-5 font-mono text-[13px] text-ink-muted leading-loose">
            {project.workflow.map((step, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-emerald shrink-0">$</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-6">
        <Reveal>
          <div>
            <p className="flex items-center gap-2 text-xs font-mono tracking-[0.15em] uppercase text-steel-dim mb-4">
              <AlertTriangle size={13} className="text-azure-soft" /> Challenges
            </p>
            <ul className="space-y-2.5">
              {project.challenges.map((c, i) => (
                <li key={i} className="text-sm text-ink-muted leading-relaxed">{c}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div>
            <p className="flex items-center gap-2 text-xs font-mono tracking-[0.15em] uppercase text-steel-dim mb-4">
              <Lightbulb size={13} className="text-emerald" /> Lessons Learned
            </p>
            <ul className="space-y-2.5">
              {project.lessons.map((c, i) => (
                <li key={i} className="text-sm text-ink-muted leading-relaxed">{c}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <p className="flex items-center gap-2 text-xs font-mono tracking-[0.15em] uppercase text-steel-dim mb-4">
              <TrendingUp size={13} className="text-azure-soft" /> Future Improvements
            </p>
            <ul className="space-y-2.5">
              {project.improvements.map((c, i) => (
                <li key={i} className="text-sm text-ink-muted leading-relaxed flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-steel-dim mt-0.5 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
