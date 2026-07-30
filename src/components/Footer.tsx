import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

const nav = [
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/devops-lab', label: 'DevOps Lab' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="border-t mt-32" style={{ borderColor: 'var(--color-hairline)' }}>
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg text-ink">Vishal Jadhav</p>
          <p className="text-sm text-ink-muted mt-1">DevOps &amp; Cloud Engineer</p>
          <p className="text-xs text-steel-dim mt-4 tracking-widest uppercase">SentinelOps</p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-2">
          {nav.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-ink-muted hover:text-ink w-fit transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/vishalkjadhav45-ai"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-md border flex items-center justify-center text-ink-muted hover:text-ink hover:border-hairline-strong transition-colors"
              style={{ borderColor: 'var(--color-hairline)' }}
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/vishal-k-jadhav"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-md border flex items-center justify-center text-ink-muted hover:text-ink hover:border-hairline-strong transition-colors"
              style={{ borderColor: 'var(--color-hairline)' }}
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href="mailto:vishalkjadhav45@gmail.com"
              aria-label="Email"
              className="w-9 h-9 rounded-md border flex items-center justify-center text-ink-muted hover:text-ink hover:border-hairline-strong transition-colors"
              style={{ borderColor: 'var(--color-hairline)' }}
            >
              <Mail size={16} />
            </a>
          </div>
          <p className="text-xs text-steel-dim">Chhatrapati Sambhajinagar, Maharashtra, India</p>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: 'var(--color-hairline)' }}>
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-steel-dim italic">
            &ldquo;Discipline builds consistency. Consistency builds excellence.&rdquo;
          </p>
          <p className="text-xs text-steel-dim">© {new Date().getFullYear()} Vishal Jadhav. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
