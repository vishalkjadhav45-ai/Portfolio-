import PageTransition from '../components/PageTransition';
import { Reveal, GlassCard } from '../components/GlassCard';
import SectionHeading from '../components/SectionHeading';

const commands = [
  { cmd: 'docker build -t app:latest .', desc: 'Build an image from the Dockerfile in the current directory' },
  { cmd: 'docker compose up -d', desc: 'Start all services defined in docker-compose.yml, detached' },
  { cmd: 'kubectl apply -f deployment.yaml', desc: 'Apply a manifest declaratively to the cluster' },
  { cmd: 'kubectl rollout status deployment/app', desc: 'Watch a rolling update until it completes' },
  { cmd: 'kubectl rollout undo deployment/app', desc: 'Roll back to the previous deployment revision' },
  { cmd: 'nginx -t && nginx -s reload', desc: 'Validate config, then reload without dropping connections' },
  { cmd: 'ansible-playbook site.yml --check', desc: 'Dry-run a playbook to preview changes' },
  { cmd: 'journalctl -u app.service -f', desc: 'Tail logs for a systemd-managed service' },
];

const lifecycle = ['Plan', 'Code', 'Build', 'Test', 'Release', 'Deploy', 'Operate', 'Monitor'];

const cicdStages = ['Checkout', 'Build', 'Unit Test', 'Quality Gate', 'Package', 'Deploy'];

export default function DevOpsLab() {
  return (
    <PageTransition>
      <section className="max-w-6xl mx-auto px-6 pt-36 pb-10">
        <Reveal>
          <SectionHeading
            eyebrow="DevOps Lab"
            title="How the infrastructure actually fits together"
            description="Architecture diagrams, pipeline flow, and the command reference I keep coming back to."
          />
        </Reveal>
      </section>

      {/* Deployment lifecycle */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <Reveal>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-steel-dim mb-6">Deployment Lifecycle</p>
          <div className="glass rounded-xl p-6 md:p-8 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              {lifecycle.map((stage, i) => (
                <div key={stage} className="flex items-center gap-2">
                  <div
                    className="px-4 py-2.5 rounded-lg border text-sm font-mono text-ink whitespace-nowrap"
                    style={{ borderColor: 'var(--color-hairline)', background: 'rgba(255,255,255,0.02)' }}
                  >
                    {stage}
                  </div>
                  {i < lifecycle.length - 1 && (
                    <div className="w-6 h-px" style={{ background: 'var(--color-hairline-strong)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Docker workflow + K8s topology */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-6">
        <Reveal>
          <GlassCard hover={false} className="h-full">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-azure-soft mb-5">Docker Workflow</p>
            <div className="space-y-3 font-mono text-[13px]">
              {['Dockerfile', 'docker build →  image', 'image →  container registry', 'docker run →  running container'].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] shrink-0"
                    style={{ background: 'var(--color-azure-dim)', color: 'var(--color-azure-soft)' }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-ink-muted">{s}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.05}>
          <GlassCard hover={false} className="h-full">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-emerald mb-5">Kubernetes Topology</p>
            <div className="space-y-3 font-mono text-[13px]">
              {['Ingress', 'Service (ClusterIP)', 'Deployment → ReplicaSet', 'Pod ×N — app container'].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] shrink-0"
                    style={{ background: 'var(--color-emerald-dim)', color: 'var(--color-emerald)' }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-ink-muted">{s}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </section>

      {/* CI/CD pipeline visualization */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <Reveal>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-steel-dim mb-6">CI/CD Pipeline</p>
          <div className="glass rounded-xl p-6 md:p-8 overflow-x-auto">
            <div className="flex items-center min-w-max">
              {cicdStages.map((stage, i) => (
                <div key={stage} className="flex items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: i < 4 ? 'var(--color-emerald)' : 'var(--color-azure)' }}
                    />
                    <span className="text-xs font-mono text-ink-muted whitespace-nowrap">{stage}</span>
                  </div>
                  {i < cicdStages.length - 1 && (
                    <div className="w-12 md:w-16 h-px mx-1 -mt-5" style={{ background: 'var(--color-hairline-strong)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* YAML snippet */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <Reveal>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-steel-dim mb-6">Sample Deployment Manifest</p>
          <div className="glass rounded-xl p-6 overflow-x-auto">
            <pre className="font-mono text-[13px] leading-relaxed text-ink-muted">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    spec:
      containers:
        - name: app
          image: registry/app:latest
          readinessProbe:
            httpGet:
              path: /healthz
              port: 8080`}
            </pre>
          </div>
        </Reveal>
      </section>

      {/* Linux command reference */}
      <section className="max-w-6xl mx-auto px-6 py-10 pb-28">
        <Reveal>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-steel-dim mb-6">Command Reference</p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-4">
          {commands.map((c, i) => (
            <Reveal key={c.cmd} delay={i * 0.03}>
              <div className="glass rounded-lg p-4">
                <p className="font-mono text-[13px] text-emerald">{c.cmd}</p>
                <p className="mt-1.5 text-[13px] text-ink-muted">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
