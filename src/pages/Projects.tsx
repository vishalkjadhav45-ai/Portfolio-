import { Link } from 'react-router-dom';
import { ArrowUpRight, Box } from 'lucide-react';
import { GithubIcon } from '../components/BrandIcons';
import PageTransition from '../components/PageTransition';
import { Reveal, GlassCard, TechBadge } from '../components/GlassCard';
import SectionHeading from '../components/SectionHeading';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <PageTransition>
      <section className="max-w-6xl mx-auto px-6 pt-36 pb-10">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Infrastructure I've designed, deployed, and documented"
            description="Six projects covering containers, orchestration, CI/CD, networking, and cloud deployment — each with a full write-up."
          />
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <GlassCard className="h-full flex flex-col" hover={false}>
                <Link to={`/projects/${p.slug}`} className="group flex flex-col h-full">
                  <div
                    className="rounded-lg aspect-[16/9] mb-5 flex items-center justify-center border overflow-hidden relative"
                    style={{ borderColor: 'var(--color-hairline)', background: 'linear-gradient(135deg, rgba(61,123,245,0.08), rgba(34,185,128,0.05))' }}
                  >
                    <Box size={30} strokeWidth={1.25} className="text-azure-soft opacity-70 group-hover:scale-105 transition-transform duration-300" />
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl text-ink group-hover:text-azure-soft transition-colors">
                      {p.title}
                    </h3>
                    <ArrowUpRight size={18} className="text-steel-dim group-hover:text-emerald group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                  </div>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed flex-1">{p.summary}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <TechBadge key={t}>{t}</TechBadge>
                    ))}
                  </div>

                  <div
                    className="mt-5 pt-4 border-t flex items-center gap-2 text-xs text-ink-muted"
                    style={{ borderColor: 'var(--color-hairline)' }}
                  >
                    <GithubIcon size={13} />
                    View repository
                  </div>
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
