import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, ShieldCheck, Wallet } from 'lucide-react';
import WalletConnectButton from '../components/WalletConnectButton';
import { useWallet } from '../hooks/useWallet';
import { connectMock } from '../mock/devEcosystemData';
import '@/styles/Global.css';

export default function ConnectWalletPage() {
  const { isConnected } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/dashboard';

  useEffect(() => {
    if (isConnected) {
      navigate(redirectTo, { replace: true });
    }
  }, [isConnected, redirectTo, navigate]);

  return (
    <main className="flex-1 overflow-y-auto bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center gap-3">
            <Wallet className="h-6 w-6 text-primary" aria-hidden="true" />
            <div>
              <h1 className="text-3xl font-extrabold tracking-tighter text-on-surface">{connectMock.title}</h1>
              <p className="mt-2 text-sm text-outline">{connectMock.subtitle}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {connectMock.badges.map((badge) => (
              <span key={badge} className="rounded-full border border-white/10 bg-surface-container px-3 py-1 text-xs font-semibold text-outline">
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-100">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{connectMock.note}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center gap-3 text-sm text-outline">
            <ShieldCheck className="h-4 w-4 text-secondary" aria-hidden="true" />
            Wallet connection stays isolated from legacy Hummingbot and MQTT flows.
          </div>
          <div className="mt-6">
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </main>
  );
}
