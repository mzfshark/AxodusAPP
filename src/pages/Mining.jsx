import React from 'react';

const Mining = () => {
  return (
    <>

      {/*  Canvas Body  */}
      <main className="flex-1 app-view-shell">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-primary tracking-[0.2em] uppercase mb-2 block">Mining</span>
            <h1 className="text-4xl font-extrabold text-on-surface tracking-tighter"> Hashpower Overview</h1>
          </div>
          <div><p></p>  </div>
        </header>
        {/*  1. Header Metrics (Editorial Style)  */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="surface-container-low p-6 rounded-2xl flex flex-col justify-between min-h-[140px]">
            <span className="text-[10px] font-bold tracking-widest text-outline uppercase">Global Hashrate</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-black tracking-tighter text-white">642.1</span>
              <span className="text-sm font-semibold text-primary">EH/s</span>
            </div>
            <div className="mt-auto flex items-center gap-2 text-secondary text-xs font-bold">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+2.4% vs last week</span>
            </div>
          </div>
          <div className="surface-container-low p-6 rounded-2xl flex flex-col justify-between min-h-[140px]">
            <span className="text-[10px] font-bold tracking-widest text-outline uppercase">Next Adjustment</span>
            <div className="mt-2">
              <span className="text-4xl font-black tracking-tighter text-white">3d 14h</span>
            </div>
            <div className="mt-auto flex items-center gap-2 text-tertiary text-xs font-bold">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>Est: +1.2% Difficulty</span>
            </div>
          </div>
          <div className="surface-container-low p-6 rounded-2xl flex flex-col justify-between min-h-[140px]">
            <span className="text-[10px] font-bold tracking-widest text-outline uppercase">BTC Price</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-black tracking-tighter text-white">$68,241</span>
            </div>
            <div className="mt-auto flex items-center gap-2 text-secondary text-xs font-bold">
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>Active Market Volatility</span>
            </div>
          </div>
          <div className="surface-container-low p-6 rounded-2xl flex flex-col justify-between min-h-[140px]">
            <span className="text-[10px] font-bold tracking-widest text-outline uppercase">Total Mining Rewards</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-black tracking-tighter text-white">0.482</span>
              <span className="text-sm font-semibold text-primary">BTC</span>
            </div>
            <div className="mt-auto text-outline-variant text-xs">
              Valued at $32,892.16
            </div>
          </div>
        </section>
        {/*  2. Mining Products & 3. Your Yield (Asymmetric Grid)  */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/*  Mining Products Section  */}
          <section className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-white">Mining Products</h2>
              <span className="text-sm font-medium text-primary cursor-pointer hover:underline">View All Protocols</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {/*  Card 1: Minto Finance  */}
              <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-8 items-center group hover:bg-[#2d3449]/60 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-[#060e20] flex items-center justify-center shrink-0 border-outline-variant/10">
                  <img className=" object-contain" data-alt="abstract crypto logo for minto finance with geometric lines and blue neon lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPBEiVUmSpZNikDiFAGnMbL2W0Qjq2wZh7iMpgvSHSiFXoN3Hqc-MI1YfieKR_NMyg7HgwmBFE4kpTyjkHDe6YzvXQXRzjgLna7Itp4DnQFX8Dug8pggKrI0G3i-Tv-7NG1rmdf2K7wk_KG_hPt8ANbMrm9trMZPmvkdiEwoNrXjccObIqp5rBY-3kb7yTeXHc8C8djE-NtLkfy_0NrJdcQvGb_9qxBGdOGWFA5mVl3wZlox_6ZHW_hg9NsaMN_nvA9QEhGasa8FI" />
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-outline uppercase mb-1">Project</p>
                    <p className="font-bold text-white">Minto Finance</p>
                    <p className="text-xs text-primary">$BTCMT</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-outline uppercase mb-1">Hashpower</p>
                    <p className="font-bold text-white">125 TH/s</p>
                    <p className="text-xs text-secondary">Efficiency: 35J/T</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-outline uppercase mb-1">Daily Yield</p>
                    <p className="font-bold text-white">0.00042 BTC</p>
                    <p className="text-xs text-outline">Est. $28.65</p>
                  </div>
                  <div className="flex items-center">
                    <button className="w-full py-2 px-4 rounded-xl gradient-bg text-on-primary font-bold text-sm tracking-tight">
                      Buy Hashpower
                    </button>
                  </div>
                </div>
              </div>
              {/*  Card 2: GoMining  */}
              <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-8 items-center group hover:bg-[#2d3449]/60 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-[#060e20] flex items-center justify-center shrink-0 border-outline-variant/10">
                  <img className=" object-contain" data-alt="vibrant 3D digital token for goming project with neon green accents and futuristic textures" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTKe13-JaGYeLq7ZNnJqEhjI7JhWpzAqVITa9RqBkr3MEJp56WZoZyqwx5e2phs51Lo09RYtXZhdfYoopqpZSZB3IzamsBqUxvpO7AuVy3XSiu43faIqhA3R80uvEjbJubb0wH6nboFZNe5Po5azOQODD6FOwtcJbsjnBlb6_-MNKf5bhd-fi2biC0NLylROW0YZsXlIawFuOr9bPXlg6GgEAUCYBhC56-YLGIvsJ21-kDDQ__OUR5oNfjJVlMmlI3_GSlCfnnej4" />
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-outline uppercase mb-1">Project</p>
                    <p className="font-bold text-white">GoMining</p>
                    <p className="text-xs text-primary">$GOMINING</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-outline uppercase mb-1">NFT-Based HP</p>
                    <p className="font-bold text-white">450 TH/s</p>
                    <p className="text-xs text-tertiary">Maint: $0.05/TH</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-outline uppercase mb-1">Daily Payout</p>
                    <p className="font-bold text-white">0.0015 BTC</p>
                    <p className="text-xs text-outline">Net Reward</p>
                  </div>
                  <div className="flex items-center">
                    <button className="w-full py-2 px-4 rounded-xl border-outline-variant/30 text-white font-bold text-sm tracking-tight hover:bg-surface-container-highest">
                      Manage NFTs
                    </button>
                  </div>
                </div>
              </div>
              {/*  Card 3: BitFuFu  */}
              <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-8 items-center group hover:bg-[#2d3449]/60 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-[#060e20] flex items-center justify-center shrink-0 border-outline-variant/10">
                  <img className=" object-contain" data-alt="blue and white geometric logo for cloud mining service with professional fintech aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEAemm2zIkJxMGhzoBEj1c4RcEX3pi-0KhZSGS5YacKAzhIHUmuZOGRLwih4esRW1Xa8tqV3Es5bWV1esEgCc5588GdbYfqhwDUVjRe5WBMac6qHJmwWo-h7QiG2yfW-MZLiXYmklDvaRTBMsQt7T9IkT2y4W3ht0eXeQVwHySgfHou7tZ8KctFQtruxSVx0wDNE9BjivoEzdS48GFiPoS64t6YMC4d8vuDrY9OaZIi_u5fTvzKAnkti1cMbWHpHZtluX5a0yZ5HU" />
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-outline uppercase mb-1">Project</p>
                    <p className="font-bold text-white">BitFuFu</p>
                    <p className="text-xs text-primary">$FUFU</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-outline uppercase mb-1">Contract Duration</p>
                    <p className="font-bold text-white">180 Days</p>
                    <p className="text-xs text-secondary">Cloud Mining</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-outline uppercase mb-1">Est. Net Profit</p>
                    <p className="font-bold text-white">14.2% APR</p>
                    <p className="text-xs text-outline">Paid in BTC</p>
                  </div>
                  <div className="flex items-center">
                    <button className="w-full py-2 px-4 rounded-xl border-outline-variant/30 text-white font-bold text-sm tracking-tight hover:bg-surface-container-highest">
                      New Contract
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*  3. Your Yield Section (Column 3)  */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-white">Your Yield</h2>
            </div>
            <div className="surface-container-low rounded-2xl p-6 h-[510px] flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[10px] font-bold text-outline uppercase mb-1">30 Day Performance</p>
                  <h3 className="text-2xl font-black text-white">0.0381 BTC</h3>
                </div>
                <span className="px-2 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded">+12.4%</span>
              </div>
              {/*  Visual Mock of Chart  */}
              <div className="flex-1 relative flex items-end gap-1 px-2">
                {/*  SVG Curve Overlay  */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <path d="M0,150 Q50,130 100,140 T200,100 T300,120 T400,60 T500,80" fill="none" stroke="#c0c1ff" strokeLinecap="round" strokeWidth="3"></path>
                  <path d="M0,150 Q50,130 100,140 T200,100 T300,120 T400,60 T500,80 L500,200 L0,200 Z" fill="url(#grad)" opacity="0.1"></path>
                  <defs>
                    <linearGradient id="grad" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" style={{ "stopColor": "#c0c1ff", "stopOpacity": "1" }}></stop>
                      <stop offset="100%" style={{ "stopColor": "#c0c1ff", "stopOpacity": "0" }}></stop>
                    </linearGradient>
                  </defs>
                </svg>
                {/*  Data Columns (Hidden/Ghost)  */}
                <div className="flex-1 h-32 bg-outline-variant/5 rounded-t-sm"></div>
                <div className="flex-1 h-24 bg-outline-variant/5 rounded-t-sm"></div>
                <div className="flex-1 h-36 bg-outline-variant/5 rounded-t-sm"></div>
                <div className="flex-1 h-40 bg-outline-variant/5 rounded-t-sm"></div>
                <div className="flex-1 h-28 bg-outline-variant/5 rounded-t-sm"></div>
                <div className="flex-1 h-44 bg-outline-variant/5 rounded-t-sm"></div>
                <div className="flex-1 h-48 bg-primary/20 rounded-t-sm border-t-2 border-primary"></div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-surface-container-highest/30">
                  <p className="text-[10px] font-bold text-outline uppercase mb-1">Hash Cost</p>
                  <p className="text-sm font-bold text-white">$142.10/day</p>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-highest/30">
                  <p className="text-[10px] font-bold text-outline uppercase mb-1">Net Daily</p>
                  <p className="text-sm font-bold text-secondary">+$124.50</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/*  4. Live Hashpower Section (Full Width Data Viz)  */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-white">Live Hashpower Distribution</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-surface-container-highest rounded-full text-xs font-semibold text-primary">All Integrations</span>
              <span className="px-3 py-1 bg-surface-container-low rounded-full text-xs font-semibold text-outline">Real-time</span>
            </div>
          </div>
          <div className="surface-container-low rounded-2xl p-8 relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              {/*  Progress Circle / Radial Viz  */}
              <div className="relative w-48 h-48 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle className="text-outline-variant/10" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-primary" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="60" strokeLinecap="round" strokeWidth="8"></circle>
                  <circle className="text-secondary" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="180" strokeLinecap="round" strokeWidth="8"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-white">725</span>
                  <span className="text-[10px] font-bold text-outline uppercase">Total TH/s</span>
                </div>
              </div>
              {/*  Legend and Details  */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-sm font-semibold text-on-surface">GoMining NFT Fleet</span>
                  </div>
                  <p className="text-2xl font-black text-white">450 <span className="text-xs text-outline font-medium">TH/s</span></p>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-progress-bar w-[62%]"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                    <span className="text-sm font-semibold text-on-surface">Minto Finance</span>
                  </div>
                  <p className="text-2xl font-black text-white">125 <span className="text-xs text-outline font-medium">TH/s</span></p>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-progress-bar w-[17%]"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-outline"></div>
                    <span className="text-sm font-semibold text-on-surface">BitFuFu Cloud</span>
                  </div>
                  <p className="text-2xl font-black text-white">150 <span className="text-xs text-outline font-medium">TH/s</span></p>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-progress-bar w-[21%]"></div>
                  </div>
                </div>
              </div>
            </div>
            {/*  Ambient Background Decoration  */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 blur-[120px] rounded-full"></div>
          </div>
        </section>
      </main>

    </>
  );
};

export default Mining;
