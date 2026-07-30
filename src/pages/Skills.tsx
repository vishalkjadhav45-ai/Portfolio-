import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { Reveal, GlassCard, TechBadge } from '../components/GlassCard';
import SectionHeading from '../components/SectionHeading';
import { skills, skillCategories } from '../data/skills';
import { getProjectBySlug } from '../data/projects';

const levelColor: Record<string, string> = {
  Learning: 'text-steel',
  Comfortable: 'text-azure-soft',
  Proficient: 'text-emerald',
};

export default function Skills() {
  return (
    <PageTransition>
      <section className="max-w-6xl mx-auto px-6 pt-36 pb-10">
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title="Tools I use to build and operate infrastructure"
            description="Grouped by where they sit in the stack — from the operating system up through the cloud."
          />
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-28 space-y-14">
        {skillCategories.map((category) => {
          const items = skills.filter((s) => s.category === category);
          if (items.length === 0) return null;
          return (
            <div key={category}>
              <Reveal>
                <p className="text-xs font-mono tracking-[0.2em] uppercase text-steel-dim mb-5 border-b pb-3" style={{ borderColor: 'var(--color-hairline)' }}>
                  {category}
                </p>
              </Reveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((s, i) => (
                  <Reveal key={s.id} delay={i * 0.04}>
                    <GlassCard className="h-full flex flex-col">
                      <div className="flex items-center justify-between">
                        <p className="font-display text-lg text-ink">{s.name}</p>
                        <span className={`text-[11px] font-mono uppercase tracking-wide ${levelColor[s.level]}`}>
                          {s.level}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-ink-muted leading-relaxed flex-1">{s.description}</p>
                      {s.relatedProjects.length > 0 && (
                        <div className="mt-4 pt-4 border-t flex flex-wrap gap-2" style={{ borderColor: 'var(--color-hairline)' }}>
                          {s.relatedProjects.map((slug) => {
                            const p = getProjectBySlug(slug);
                            if (!p) return null;
                            return (
                              <Link key={slug} to={`/projects/${slug}`}>
                                <TechBadge>{p.title.length > 22 ? p.title.split(' ').slice(0, 2).join(' ') : p.title}</TechBadge>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </GlassCard>
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </PageTransition>
  );
}
