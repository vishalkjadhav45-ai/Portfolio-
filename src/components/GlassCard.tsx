import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

export function GlassCard({
  children,
  className = '',
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, borderColor: 'var(--color-hairline-strong)' } : undefined}
      transition={{ duration: 0.2 }}
      className={`glass rounded-xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function TechBadge({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-md text-[12px] font-mono text-ink-muted border"
      style={{ borderColor: 'var(--color-hairline)', background: 'rgba(255,255,255,0.02)' }}
    >
      {children}
    </span>
  );
}

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
