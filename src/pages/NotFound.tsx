import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

export default function NotFound() {
  return (
    <PageTransition>
      <section className="max-w-xl mx-auto px-6 pt-48 pb-32 text-center">
        <p className="font-mono text-emerald text-sm">404</p>
        <h1 className="font-display text-3xl text-ink mt-3">This route doesn't exist</h1>
        <p className="mt-3 text-ink-muted text-sm">The page you're looking for was moved, renamed, or never deployed.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-azure text-white text-sm font-medium hover:bg-azure-soft transition-colors"
        >
          Back to Home
        </Link>
      </section>
    </PageTransition>
  );
}
