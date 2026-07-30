import { ShieldCheck, Target, Wind, HandHeart, Repeat, BookOpen } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { Reveal, GlassCard } from '../components/GlassCard';
import SectionHeading from '../components/SectionHeading';
import { timeline } from '../data/timeline';

const values = [
  { icon: ShieldCheck, title: 'Discipline', text: 'Showing up and doing the fundamentals well, every single day, regardless of motivation.' },
  { icon: Target, title: 'Precision', text: 'Infrastructure decisions are deliberate — configuration is written to be correct, not just working.' },
  { icon: Wind, title: 'Calm Under Pressure', text: 'Incidents get a clear head and a checklist, not panic. Root cause before quick fixes.' },
  { icon: HandHeart, title: 'Ownership', text: 'If it is deployed under my name, I am responsible for it end to end — build, run, and fix.' },
  { icon: Repeat, title: 'Consistency', text: 'Reliable systems come from reliable habits. Small, repeatable practices, applied every time.' },
  { icon: BookOpen, title: 'Continuous Learning', text: 'The tools change constantly. Staying useful means treating learning as a permanent practice.' },
];

const principleCards = [
  { title: 'Discipline', text: 'The habit of doing the necessary thing, not just the interesting thing.' },
  { title: 'Ownership', text: 'Full accountability from first commit to production incident.' },
  { title: 'Automation', text: 'Manual, repeated work is a bug in the process, not a fact of life.' },
  { title: 'Continuous Learning', text: 'Every project is scoped to leave me with one new capability.' },
  { title: 'Reliability', text: 'Systems should behave predictably, especially when no one is watching.' },
];

export default function About() {
  return (
    <PageTransition>
      <section className="max-w-4xl mx-auto px-6 pt-36 pb-20">
        <Reveal>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-emerald mb-3">About</p>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight text-ink leading-tight">
            Engineering with discipline, precision, and ownership.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 space-y-5 text-[15.5px] leading-relaxed text-ink-muted">
            <p>
              Vishal Jadhav is currently pursuing a Bachelor of Computer Applications (BCA), now in
              his third academic year. His primary focus is DevOps and Cloud Computing — building
              fluency across Linux, Docker, Kubernetes, AWS, CI/CD pipelines, and automation
              tooling through consistent, hands-on practice.
            </p>
            <p>
              Outside of technology, he is equally committed to fitness and physical discipline —
              a practice that reinforces the same principle that shapes his engineering work:
              consistency compounds. Small, repeated actions, done correctly, are what separate
              systems that merely work from systems that can be trusted.
            </p>
            <p>
              He believes engineering excellence isn't a single breakthrough — it's the result of
              consistency, ownership, and a continuous learning habit applied over time. That
              belief shows up in how he approaches every project: understand the fundamentals
              first, automate what can be automated, and take responsibility for what gets shipped.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Values grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <Reveal>
          <SectionHeading eyebrow="Operating Values" title="What guides the work" />
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <GlassCard className="h-full">
                <v.icon size={20} className="text-azure-soft" strokeWidth={1.75} />
                <p className="font-display text-lg text-ink mt-4">{v.title}</p>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{v.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Learning timeline — signature element */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Learning Path"
            title="The order things were learned"
            description="Each tool was picked up because the previous one exposed a real limitation — this is the actual sequence, not a curated list."
          />
        </Reveal>

        <div className="mt-14 relative pl-10">
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px"
            style={{ background: 'linear-gradient(180deg, var(--color-azure), var(--color-emerald))' }}
            aria-hidden="true"
          />
          <ol className="space-y-9">
            {timeline.map((step, i) => (
              <Reveal key={step.name} delay={i * 0.04}>
                <li className="relative">
                  <span
                    className="absolute -left-10 top-1 w-[15px] h-[15px] rounded-full border-2"
                    style={{
                      borderColor: i === timeline.length - 1 || i === timeline.length - 2 ? 'var(--color-emerald)' : 'var(--color-azure)',
                      background: 'var(--color-graphite)',
                    }}
                    aria-hidden="true"
                  />
                  <p className="font-display text-lg text-ink">{step.name}</p>
                  <p className="text-sm text-ink-muted mt-1">{step.note}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Engineering principles */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <Reveal>
          <SectionHeading eyebrow="Engineering Principles" title="Five principles, applied consistently" />
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {principleCards.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <GlassCard className="h-full">
                <p className="font-mono text-xs text-steel-dim">{String(i + 1).padStart(2, '0')}</p>
                <p className="font-display text-base text-ink mt-3">{p.title}</p>
                <p className="mt-2 text-[13px] text-ink-muted leading-relaxed">{p.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
