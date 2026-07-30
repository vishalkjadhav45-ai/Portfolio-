import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons';
import PageTransition from '../components/PageTransition';
import { Reveal, GlassCard } from '../components/GlassCard';
import SectionHeading from '../components/SectionHeading';

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email address'),
  subject: z.string().min(3, 'Give the message a short subject'),
  message: z.string().min(10, 'Message should be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'vishalkjadhav45@gmail.com', href: 'mailto:vishalkjadhav45@gmail.com' },
  { icon: GithubIcon, label: 'GitHub', value: 'vishalkjadhav45-ai', href: 'https://github.com/vishalkjadhav45-ai' },
  { icon: LinkedinIcon, label: 'LinkedIn', value: 'vishal-k-jadhav', href: 'https://www.linkedin.com/in/vishal-k-jadhav' },
  { icon: MapPin, label: 'Location', value: 'Chhatrapati Sambhajinagar, Maharashtra, India', href: undefined },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <PageTransition>
      <section className="max-w-6xl mx-auto px-6 pt-36 pb-16">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk infrastructure"
            description="Open to internships, entry-level DevOps roles, and conversations about cloud and automation."
          />
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-[0.85fr_1.15fr] gap-10">
          <Reveal>
            <div className="space-y-4">
              {contactInfo.map((c) => (
                <GlassCard key={c.label} hover={false} className="flex items-center gap-4">
                  <span
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-azure-dim)' }}
                  >
                    <c.icon size={16} className="text-azure-soft" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-mono uppercase tracking-wide text-steel-dim">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noreferrer" className="text-sm text-ink hover:text-azure-soft transition-colors break-words">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-sm text-ink break-words">{c.value}</p>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard hover={false}>
              {submitted ? (
                <div className="py-16 flex flex-col items-center text-center">
                  <CheckCircle2 size={36} className="text-emerald" />
                  <p className="font-display text-xl text-ink mt-4">Message sent</p>
                  <p className="text-sm text-ink-muted mt-2">Thanks for reaching out — I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Name" error={errors.name?.message}>
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="Your full name"
                        className={inputClass(!!errors.name)}
                        style={inputStyle(!!errors.name)}
                      />
                    </Field>
                    <Field label="Email" error={errors.email?.message}>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="you@example.com"
                        className={inputClass(!!errors.email)}
                        style={inputStyle(!!errors.email)}
                      />
                    </Field>
                  </div>
                  <Field label="Subject" error={errors.subject?.message}>
                    <input
                      {...register('subject')}
                      type="text"
                      placeholder="What's this about?"
                      className={inputClass(!!errors.subject)}
                      style={inputStyle(!!errors.subject)}
                    />
                  </Field>
                  <Field label="Message" error={errors.message?.message}>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="Tell me a bit about the opportunity or question."
                      className={inputClass(!!errors.message)}
                      style={inputStyle(!!errors.message)}
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-azure text-white text-sm font-medium hover:bg-azure-soft transition-colors disabled:opacity-60"
                  >
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-mono uppercase tracking-wide text-steel-dim">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1.5 block text-xs text-red-400">{error}</span>}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg bg-transparent border px-4 py-2.5 text-sm text-ink placeholder:text-steel-dim outline-none transition-colors focus:border-azure-soft ${
    hasError ? 'border-red-500/60' : ''
  }`;
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return hasError ? {} : { borderColor: 'var(--color-hairline)' };
}
