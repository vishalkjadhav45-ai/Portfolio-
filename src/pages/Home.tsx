import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Terminal,
  CheckCircle2,
  Cpu,
  HardDrive,
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { Reveal, GlassCard } from '../components/GlassCard';
import SectionHeading from '../components/SectionHeading';

// Original background watermark portrait image import
import portrait from '../assets/vishal-portrait.jpg';

const techStrip = ['Linux', 'Git', 'GitHub', 'Docker', 'Kubernetes', 'AWS', 'NGINX', 'Jenkins', 'Ansible'];

const principles = [
  { title: 'Discipline', text: 'Consistent habits compound into reliable systems.' },
  { title: 'Ownership', text: 'Accountability for outcomes, not just tasks.' },
  { title: 'Automation', text: 'If it repeats, it should not require a human.' },
];

interface CommandStep {
  cmd: string;
  output: string;
  stageIndex: number;
}

const pipelineSteps: CommandStep[] = [
  {
    cmd: 'git checkout main && git pull',
    output: 'Already up to date. Branch: main',
    stageIndex: 0,
  },
  {
    cmd: 'trivy config --severity HIGH,CRITICAL .',
    output: '✔ 0 vulnerabilities found in HCL/YAML',
    stageIndex: 1,
  },
  {
    cmd: 'terraform apply -auto-approve',
    output: 'Apply complete! Resources: 3 added, 0 changed.',
    stageIndex: 2,
  },
  {
    cmd: 'helm upgrade --install api-gateway ./chart',
    output: 'Release "api-gateway" updated successfully.',
    stageIndex: 3,
  },
  {
    cmd: 'sentinelops healthcheck --endpoint /healthz',
    output: '✔ 200 OK | Latency: 14ms | Cluster: Healthy',
    stageIndex: 4,
  },
];

const stages = [
  { label: 'Source', icon: Terminal },
  { label: 'Audit', icon: ShieldCheck },
  { label: 'Provision', icon: Cpu },
  { label: 'Deploy', icon: HardDrive },
  { label: 'Live', icon: CheckCircle2 },
];

function InteractiveTerminalCard() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [displayedSteps, setDisplayedSteps] = useState<CommandStep[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // ReturnType<typeof setTimeout> prevents NodeJS namespace error during build
    let timeout: ReturnType<typeof setTimeout>;

    if (isCompleted) {
      timeout = setTimeout(() => {
        setIsCompleted(false);
        setDisplayedSteps([]);
        setCurrentStepIndex(0);
        setIsTyping(true);
      }, 4000);
      return () => clearTimeout(timeout);
    }

    const currentStep = pipelineSteps[currentStepIndex];

    if (isTyping) {
      if (typedText.length < currentStep.cmd.length) {
        timeout = setTimeout(() => {
          setTypedText(currentStep.cmd.slice(0, typedText.length + 1));
        }, 35);
      } else {
        timeout = setTimeout(() => {
          setDisplayedSteps((prev) => [...prev, currentStep]);
          setTypedText('');
          if (currentStepIndex + 1 < pipelineSteps.length) {
            setCurrentStepIndex((prev) => prev + 1);
          } else {
            setIsTyping(false);
            setIsCompleted(true);
          }
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedText, currentStepIndex, isTyping, isCompleted]);

  const activeStage = isCompleted
    ? stages.length - 1
    : pipelineSteps[currentStepIndex]?.stageIndex ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto md:mx-0 w-full max-w-lg"
    >
      {/* Soft Ambient Radial Glow Behind Terminal */}
      <div
        className="absolute -inset-3 rounded-3xl -z-10 blur-2xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(61, 123, 245, 0.4), transparent 70%)' }}
      />

      <div
        className="rounded-2xl bg-[#090d14]/90 backdrop-blur-xl border overflow-hidden font-mono text-xs shadow-2xl"
        style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/5 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            sentinelops-pipeline.sh — vishal@prod
          </div>

          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
            EKS-US-EAST
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 space-y-3.5 text-slate-300 min-h-[290px] flex flex-col justify-start">
          {displayedSteps.map((step, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-200">
                <span className="text-emerald-400 font-bold">$</span>
                <span className="font-semibold">{step.cmd}</span>
              </div>
              <div className="pl-4 text-[11.5px] text-slate-400 leading-relaxed flex items-center gap-1.5">
                <span>{step.output}</span>
              </div>
            </div>
          ))}

          {/* Currently Typing Command */}
          {!isCompleted && (
            <div className="flex items-center gap-2 text-slate-200">
              <span className="text-emerald-400 font-bold">$</span>
              <span>{typedText}</span>
              <span className="w-2 h-4 bg-azure animate-pulse inline-block" />
            </div>
          )}

          {/* Completion Banner */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-3 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center font-sans font-medium text-xs flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={15} />
                <span>Pipeline execution successful! All systems operational.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Pipeline Status Bar */}
        <div className="px-4 py-3 bg-white/[0.015] border-t border-white/5 grid grid-cols-5 gap-1 select-none">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isDone = idx < activeStage || isCompleted;
            const isCurrent = idx === activeStage && !isCompleted;

            return (
              <div
                key={stage.label}
                className={`flex flex-col items-center justify-center gap-1 py-1.5 rounded-md transition-all duration-300 ${
                  isCurrent
                    ? 'bg-azure/10 text-azure border border-azure/30'
                    : isDone
                    ? 'text-emerald-400'
                    : 'text-slate-600'
                }`}
              >
                <Icon size={13} />
                <span className="text-[10px] font-sans font-medium">{stage.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-40 pb-28 md:pt-48 md:pb-36">
        {/* Original Faded Grayscale Background Portrait Watermark */}
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

          {/* Interactive Terminal placed where the old framed portrait was */}
          <InteractiveTerminalCard />
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