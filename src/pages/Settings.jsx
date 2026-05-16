import React from 'react';
import { CheckCircle2, Laptop, Shield, Smartphone, Wallet } from 'lucide-react';
import { settingsMock } from '../mock/devEcosystemData';

export default function Settings() {
  return (
    <main className="flex-1 overflow-y-auto bg-background p-8">
      <header className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Settings</span>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tighter text-on-surface">Configuration</h1>
          <p className="mt-2 max-w-3xl text-sm text-outline">Mock profile, security, and device state for the dev workspace.</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container-low px-4 py-3 text-sm text-outline">
          No persisted user secrets
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-white/10 bg-surface-container-low p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-outline">Theme</p>
          <p className="mt-3 text-3xl font-extrabold text-on-surface">{settingsMock.profile.theme}</p>
          <p className="mt-2 text-sm text-outline">Default dev theme</p>
        </article>
        <article className="rounded-xl border border-white/10 bg-surface-container-low p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-outline">Notifications</p>
          <p className="mt-3 text-3xl font-extrabold text-on-surface">{settingsMock.profile.notifications}</p>
          <p className="mt-2 text-sm text-outline">Email surface only</p>
        </article>
        <article className="rounded-xl border border-white/10 bg-surface-container-low p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-outline">Wallet</p>
          <p className="mt-3 text-3xl font-extrabold text-on-surface">{settingsMock.profile.wallet}</p>
          <p className="mt-2 text-sm text-outline">{settingsMock.profile.chain}</p>
        </article>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="xl:col-span-7 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Security controls</h2>
              <p className="mt-1 text-sm text-outline">Mocked authentication and permission state.</p>
            </div>
            <Shield className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-3">
            {settingsMock.security.map((item) => (
              <div key={item.title} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-on-surface">{item.title}</p>
                    <p className="mt-1 text-sm text-outline">{item.detail}</p>
                  </div>
                  <span className="rounded-full bg-secondary/15 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <aside className="xl:col-span-5 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Device state</h2>
              <p className="mt-1 text-sm text-outline">Local dev access only.</p>
            </div>
            <Laptop className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-3">
            {settingsMock.devices.map((device) => (
              <div key={device.name} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-on-surface">{device.name}</p>
                    <p className="mt-1 text-sm text-outline">{device.location}</p>
                  </div>
                  <span className="text-xs font-bold text-secondary">{device.status}</span>
                </div>
                <p className="mt-2 text-xs text-outline">Last seen: {device.lastSeen}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-white/10 bg-surface-container p-4">
            <Wallet className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
        </aside>
      </section>

      <section className="mt-8 rounded-xl border border-white/10 bg-surface-container-low p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Activity feed</h2>
            <p className="mt-1 text-sm text-outline">Synthetic history for dev validation.</p>
          </div>
          <Smartphone className="h-5 w-5 text-outline" aria-hidden="true" />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {settingsMock.activity.map((item) => (
            <div key={item.title} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-on-surface">{item.title}</p>
                  <p className="mt-1 text-sm text-outline">{item.detail}</p>
                </div>
                <CheckCircle2 className="h-4 w-4 text-secondary" aria-hidden="true" />
              </div>
              <p className="mt-2 text-xs text-outline">{item.time}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
