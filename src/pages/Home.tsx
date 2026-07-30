import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle2, ShieldCheck, Cpu, HardDrive } from 'lucide-react';

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

export default function InteractiveTerminalCard() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [displayedSteps, setDisplayedSteps] = useState<CommandStep[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isCompleted) {
      // Pause on completed state for 4 seconds, then reset
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
        }, 35); // Typing speed
      } else {
        // Finished typing current command
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

  // Determine active stage based on current progress
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
      {/* Soft Ambient Radial Lighting */}
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

        {/* Bottom Interactive Pipeline Progress Bar */}
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
