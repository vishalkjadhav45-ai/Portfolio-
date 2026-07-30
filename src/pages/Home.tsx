import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { Reveal, GlassCard } from '../components/GlassCard';
import SectionHeading from '../components/SectionHeading';
import portrait from '../assets/vishal-portrait.jpg';

const techStrip = ['Linux', 'Git', 'GitHub', 'Docker', 'Kubernetes', 'AWS', 'NGINX', 'Jenkins', 'Ansible'];

const principles = [
  { title: 'Discipline', text: 'Consistent habits compound into reliable systems.' },
  { title: 'Ownership', text: 'Accountability for outcomes, not just tasks.' },
  { title: 'Automation', text: 'If it repeats, it should not require a human.' },
];

export default function Home() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-28 md:pt-48 md:pb-36">
        {/* Faded grayscale background portrait */}
        <div className="pointer-events-none absolute inset-0 -z-10 flex justify-end items-start select-none">
          <img
            src={portrait}
            alt=""
            aria-hidden="true"
            className="w-[560px] md:w-[760px] object-cover object-top opacity-[0.08] grayscale blur-[3px] translate-x-1/4 -translate-y-8"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent, black 25%, black 65%, transparent), linear-gradient(to left, black 40%, transparent 90%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent, black 25%, black 65%, transparent), linear-gradient(to left, black 40%, transparent 90%)',
              WebkitMaskComposite: 'source-in',
              maskComposite: 'intersect',
            }}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: 'radial-gradient(ellipse 900px 500px at 15% 20%, rgba(61,123,245,0.08), transparent 60%)' }}
        />

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono text-emerald mb-6"
              style={{ borderColor: 'var(--color-hairline)' }}
            >
              <ShieldCheck size={13} />
              SentinelOps · Engineering Identity
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-[2.5rem] leading-[1.08] sm:text-5xl md:text-[3.4rem] tracking-tight text-ink"
            >
              Building Reliable Infrastructure.
              <br />
              <span className="text-gradient">Automating Modern Deployments.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-ink-muted text-[16px] leading-relaxed max-w-xl"
            >
              I build scalable, reliable, and automated infrastructure using modern DevOps
              practices while continuously improving through hands-on learning and disciplined
              engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-azure text-white text-sm font-medium hover:bg-azure-soft transition-colors"
              >
                View Projects
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border text-sm font-medium text-ink hover:border-hairline-strong transition-colors"
                style={{ borderColor: 'var(--color-hairline)' }}
              >
                Contact Me
              </Link>
            </motion.div>
          </div>

          {/* Professional portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto md:mx-0 w-64 sm:w-72 md:w-full max-w-sm"
          >
            <div
              className="absolute -inset-4 rounded-2xl -z-10 opacity-60"
              style={{ background: 'linear-gradient(135deg, var(--color-azure-dim), transparent 60%)' }}
            />
            <div className="glass rounded-2xl p-2.5">
              <img
                src={portrait}
                alt="Portrait of Vishal Jadhav, DevOps and Cloud Engineer"
                className="w-full aspect-[4/5] object-cover rounded-xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Tech strip */}
        <div className="max-w-6xl mx-auto px-6 mt-20">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-steel-dim mb-4">Core Toolchain</p>
          <div className="flex flex-wrap gap-2.5 border-t pt-5" style={{ borderColor: 'var(--color-hairline)' }}>
            {techStrip.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-md text-[13px] font-mono text-ink-muted border"
                style={{ borderColor: 'var(--color-hairline)' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering principles preview */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Engineering Principles"
            title="How I approach the work"
            description="A short preview of the values behind every system I build. Read the full story on the About page."
          />
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <GlassCard>
                <p className="font-display text-lg text-ink">{p.title}</p>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{p.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <Link
            to="/about"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-azure-soft hover:text-emerald transition-colors"
          >
            Read the full engineering philosophy
            <ArrowRight size={14} />
          </Link>
        </Reveal>
      </section>
    </PageTransition>
  );
}
