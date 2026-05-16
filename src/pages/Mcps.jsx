import React from 'react';
import { CircleSlash2, Cpu, Database, TerminalSquare, Workflow } from 'lucide-react';
import { mcpMock } from '../mock/devEcosystemData';

const statusClasses = {
  Online: 'text-secondary',
  Warning: 'text-tertiary',
  Offline: 'text-error',
};

export default function Mcps() {
  return (
    <main className="flex-1 overflow-y-auto bg-background p-8">
      <header className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">MCP Servers</span>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tighter text-on-surface">Monitoring</h1>
          <p className="mt-2 max-w-3xl text-sm text-outline">Mock observability data for the MCP nucleus in dev.</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container-low px-4 py-3 text-sm text-outline">
          Command stream is local only
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {mcpMock.servers.map((server) => (
          <article key={server.id} className="rounded-xl border border-white/10 bg-surface-container-low p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold text-on-surface">{server.name}</p>
                <p className="mt-1 text-xs font-mono text-outline">{server.id}</p>
              </div>
              {server.status === 'Offline' ? (
                <CircleSlash2 className="h-5 w-5 text-error" aria-hidden="true" />
              ) : (
                <Cpu className={`h-5 w-5 ${statusClasses[server.status] ?? 'text-outline'}`} aria-hidden="true" />
              )}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-outline">Uptime</p>
                <p className="mt-1 font-bold text-on-surface">{server.uptime}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-outline">Latency</p>
                <p className="mt-1 font-bold text-on-surface">{server.latency}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-outline">Load</p>
                <p className="mt-1 font-bold text-on-surface">{server.load}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-outline">Status</p>
                <p className={`mt-1 font-bold ${statusClasses[server.status] ?? 'text-outline'}`}>{server.status}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="xl:col-span-8 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">System logs</h2>
              <p className="mt-1 text-sm text-outline">Synthetic event feed.</p>
            </div>
            <TerminalSquare className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-3 font-mono text-xs">
            {mcpMock.logs.map((line) => (
              <div key={line} className="rounded-lg border border-white/10 bg-surface-container p-4 text-outline">
                {line}
              </div>
            ))}
          </div>
        </article>

        <article className="xl:col-span-4 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Command palette</h2>
              <p className="mt-1 text-sm text-outline">Mock commands only.</p>
            </div>
            <Workflow className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-3">
            {mcpMock.commands.map((command) => (
              <div key={command} className="rounded-lg border border-white/10 bg-surface-container p-4 text-sm text-on-surface">
                {command}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-white/10 bg-surface-container p-4">
            <Database className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
        </article>
      </section>
    </main>
  );
}
