export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'text-center max-w-2xl mx-auto' : ''}>
      <p className="text-xs font-mono tracking-[0.2em] uppercase text-emerald mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-[2.5rem] leading-tight tracking-tight text-ink">{title}</h2>
      {description && <p className="mt-4 text-ink-muted text-[15px] leading-relaxed">{description}</p>}
    </div>
  );
}
