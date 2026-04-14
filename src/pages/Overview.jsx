import React from "react";
import "@/src/styles/Global.module.css";

const Overview = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-background p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Ecosystem Overview</h1>
        <p className="text-on-surface-variant text-sm">Real-time observatory of your Axodus digital footprint.</p>
      </header>
      {/* 1. Financial Summary Bento Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-surface-container-highest p-8 rounded-xl relative overflow-hidden flex items-center">
          <div className="relative z-10 w-1/2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 block">Total Net Worth</span>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-extrabold tracking-tighter text-white">$142,850.32</span>
              <span className="text-secondary text-sm font-bold flex items-center">
                <span className="material-symbols-outlined text-sm">trending_up</span> +5.24%
              </span>
            </div>
            <div className="flex gap-4 mt-8">
              <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform">Deposit</button>
              <button className="bg-surface-container-high text-on-surface px-6 py-2.5 rounded-lg font-bold text-sm border border-outline-variant/10 hover:bg-surface-bright transition-colors">Withdraw</button>
            </div>
          </div>
          <div className="w-1/2 h-full flex items-end">
            <div className="w-full h-40 flex items-end gap-1 px-4 opacity-60">
              {/* Simple custom CSS sparkline visualization */}
              <div className="bg-secondary/40 w-full h-[30%] rounded-t-sm"></div>
              <div className="bg-secondary/50 w-full h-[45%] rounded-t-sm"></div>
              <div className="bg-secondary/60 w-full h-[40%] rounded-t-sm"></div>
              <div className="bg-secondary/70 w-full h-[60%] rounded-t-sm"></div>
              <div className="bg-secondary/80 w-full h-[55%] rounded-t-sm"></div>
              <div className="bg-secondary/90 w-full h-[75%] rounded-t-sm"></div>
              <div className="bg-secondary w-full h-[90%] rounded-t-sm shadow-[0_0_15px_#41e4b8]"></div>
            </div>
          </div>
          {/* Decorative Radial Gradient */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/5 rounded-full blur-[80px]"></div>
        </div>
        <div className="bg-surface-container-highest p-8 rounded-xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 block">Current APY Focus</span>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle className="text-surface-container-high" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-indigo-400" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="100" strokeWidth="8"></circle>
                </svg>
                <span className="text-2xl font-bold text-white">18.4%</span>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-on-surface-variant font-medium">
            Projected monthly yield: <span className="text-indigo-300">+$2,189.20</span>
          </div>
        </div>
      </section>
      {/* 2. Portfolio Distribution & Yields */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Distribution Visual */}
        <div className="lg:col-span-5 glass-panel p-8 rounded-xl border border-white/5">
          <h3 className="text-lg font-bold text-white mb-8">Portfolio Distribution</h3>
          <div className="relative flex flex-col items-center justify-center">
            {/* Radar Chart SVG */}
            <div className="w-full aspect-square max-w-[320px] relative flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="radarGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8"></stop>
                    <stop offset="100%" stopColor="#41e4b8"></stop>
                  </linearGradient>
                  <filter height="140%" id="glow" width="140%" x="-20%" y="-20%">
                    <feGaussianBlur result="blur" stdDeviation="3"></feGaussianBlur>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
                  </filter>
                </defs>
                {/* Grid Lines (Pentagons) */}
                <polygon fill="none" points="100,20 176,75 147,165 53,165 24,75" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="1"></polygon>
                <polygon fill="none" points="100,40 157,81 135,149 65,149 43,81" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="1"></polygon>
                <polygon fill="none" points="100,60 138,88 123,133 77,133 62,88" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="1"></polygon>
                <polygon fill="none" points="100,80 119,94 111,117 89,117 81,94" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="1"></polygon>
                {/* Axis Lines */}
                <line stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" x1="100" x2="100" y1="100" y2="20"></line>
                <line stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" x1="100" x2="176" y1="100" y2="75"></line>
                <line stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" x1="100" x2="147" y1="100" y2="165"></line>
                <line stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" x1="100" x2="53" y1="100" y2="165"></line>
                <line stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" x1="100" x2="24" y1="100" y2="75"></line>
                {/* Data Shape (Mining: 85%, Bot: 70%, DeFi: 60%, Gov: 40%, Bus: 55%) */}
                <polygon fill="url(#radarGradient)" fillOpacity="0.2" filter="url(#glow)" points="100,32 153,83 128,139 81,126 58,86" stroke="url(#radarGradient)" strokeWidth="2"></polygon>
                {/* Vertices Data Points */}
                <circle cx="100" cy="32" fill="#818cf8" r="2"></circle>
                <circle cx="153" cy="83" fill="#61b8da" r="2"></circle>
                <circle cx="128" cy="139" fill="#41e4b8" r="2"></circle>
                <circle cx="81" cy="126" fill="#41e4b8" r="2"></circle>
                <circle cx="58" cy="86" fill="#818cf8" r="2"></circle>
              </svg>
              {/* Labels Overlay */}
              <div className="absolute -top-4 text-[10px] font-bold text-indigo-300 uppercase tracking-tighter">Mining</div>
              <div className="absolute right-0 top-1/3 translate-x-4 text-[10px] font-bold text-slate-300 uppercase tracking-tighter">Bot Trading</div>
              <div className="absolute right-8 bottom-0 text-[10px] font-bold text-secondary uppercase tracking-tighter">DeFi</div>
              <div className="absolute left-8 bottom-0 text-[10px] font-bold text-secondary uppercase tracking-tighter">Governance</div>
              <div className="absolute left-0 top-1/3 -translate-x-4 text-[10px] font-bold text-indigo-300 uppercase tracking-tighter">Business</div>
            </div>
            {/* Data Legend */}
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-3 w-full max-w-xs mx-auto">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                <span className="text-[10px] text-slate-400 font-medium uppercase">Mining: 42%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                <span className="text-[10px] text-slate-400 font-medium uppercase">Bots: 35%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div>
                <span className="text-[10px] text-slate-400 font-medium uppercase">DeFi: 23%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
                <span className="text-[10px] text-slate-400 font-medium uppercase">Other: 10%</span>
              </div>
            </div>
          </div>
        </div>
        {/* Yield Products Table */}
        <div className="lg:col-span-7 bg-surface-container-highest p-8 rounded-xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-white">Active Yield Streams</h3>
            <button className="text-indigo-400 text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
                  <th className="pb-4 font-semibold">Product</th>
                  <th className="pb-4 font-semibold">Allocation</th>
                  <th className="pb-4 font-semibold">Current Yield</th>
                  <th className="pb-4 font-semibold">Risk</th>
                  <th className="pb-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-white/5 hover:bg-surface-bright/20 transition-colors">
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-indigo-400 text-lg">bolt</span>
                    </div>
                    <span className="font-semibold">Antminer S21 Pool</span>
                  </td>
                  <td className="py-4 text-slate-300">$60,000</td>
                  <td className="py-4 font-bold text-secondary">22.4% APY</td>
                  <td className="py-4"><span className="px-2 py-0.5 rounded text-[10px] bg-slate-500/10 text-slate-400 font-bold uppercase">Med</span></td>
                  <td className="py-4 text-right"><span className="w-2 h-2 rounded-full bg-secondary inline-block"></span></td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-surface-bright/20 transition-colors">
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-secondary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary text-lg">smart_toy</span>
                    </div>
                    <span className="font-semibold">High-Freq ETH Bot</span>
                  </td>
                  <td className="py-4 text-slate-300">$49,500</td>
                  <td className="py-4 font-bold text-secondary">31.2% ROI</td>
                  <td className="py-4"><span className="px-2 py-0.5 rounded text-[10px] bg-error/10 text-error font-bold uppercase">High</span></td>
                  <td className="py-4 text-right"><span className="w-2 h-2 rounded-full bg-secondary inline-block"></span></td>
                </tr>
                <tr className="hover:bg-surface-bright/20 transition-colors">
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-tertiary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-tertiary text-lg">account_balance</span>
                    </div>
                    <span className="font-semibold">USDC/ETH LP Vault</span>
                  </td>
                  <td className="py-4 text-slate-300">$32,850</td>
                  <td className="py-4 font-bold text-secondary">11.8% APY</td>
                  <td className="py-4"><span className="px-2 py-0.5 rounded text-[10px] bg-green-500/10 text-green-400 font-bold uppercase">Low</span></td>
                  <td className="py-4 text-right"><span className="w-2 h-2 rounded-full bg-secondary inline-block"></span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* 3. Governance & Business Status */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Governance Proposals */}
        <div className="bg-surface-container-highest p-8 rounded-xl border border-white/5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-400">gavel</span> Active Governance
            </h3>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-surface-container rounded-lg border border-outline-variant/10">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-sm font-bold text-on-surface">AX-104: Expand Mining in Norway</h4>
                <span className="px-2 py-1 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">CORE</span>
              </div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-500">72% Support (6.2M Neurons)</span>
                <span className="text-slate-500">4 days left</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                <div className="h-full bg-indigo-400 w-[72%]"></div>
              </div>
            </div>
            <div className="p-4 bg-surface-container rounded-lg border border-outline-variant/10">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-sm font-bold text-on-surface">AX-105: Dynamic Burn Rate Adjust</h4>
                <span className="px-2 py-1 rounded text-[10px] font-bold bg-secondary/20 text-secondary">ECON</span>
              </div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-500">48% Support (4.1M Neurons)</span>
                <span className="text-slate-500">22 hours left</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                <div className="h-full bg-tertiary w-[48%]"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Business Project Progress */}
        <div className="bg-surface-container-highest p-8 rounded-xl border border-white/5">
          <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">rocket_launch</span> Business Progress
          </h3>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden flex-shrink-0">
                <img className="w-full h-full object-cover" alt="futuristic minimalist datacenter logo indigo glow square" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBObIrk_UpLVWKNmo9VvrJazd40p8gwhaW0pJ_gfvlWw1UPFZh9Dz1_YCHufA0mi2UEaBCegbYHG-qwv_AxYSz3oacnfTbtjTlEG2fQTefT08akVla9K6TrxojNi2VUus6IPyGZ7EQT3B-QCtX2S89UHrk756is_D8ZjXhWfIknbj9u-PoaZqZntoNKRboZ0oOhF7_21GQGQ4QMBL3KEv-RleXtg9cNj7QxR5eN7F2DBTLkIvzBJxmBAX9WQ4RTfr2jKZMsTVFeb58"/>
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-bold">Project Helios: Data Node Cluster</span>
                  <span className="text-xs font-bold text-secondary">85%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[85%]"></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Hardware deployment complete. Finalizing software orchestration.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden flex-shrink-0">
                <img className="w-full h-full object-cover" alt="cybernetic trading terminal interface abstract logo teal glow" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe8MjOjZzDxlVvH48Wy4E-dTRILxrj4ZAHFB6fhFH0NVTsE_BZIt4QCeNUS3dQ85SLrxTWuBAy87ep8UxcURORQWjG7NUEgsxlX30SAvaY2dvQFEzyw27gQsAP_7LBb0M84jhTOGrJgSOgZTHsTwaHOYLQywpA7kj_32eNUyY32kjeEnbFyytAjOZRRB6CXxtm8gJI2FH9wtAUI3mqLSkhGnq1D4MysZudAjxQeZk6A7qpbCrRQrjmyEq5wkfvtudI6eFJ9_1whB4"/>
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-bold">Project Orion: DEX Aggregator</span>
                  <span className="text-xs font-bold text-indigo-400">42%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400 w-[42%]"></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Liquidity contract auditing phase. Integration with MCP servers in progress.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Overview;
