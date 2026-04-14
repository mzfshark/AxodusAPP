import React from 'react';
import '../../styles/Global.module.css';

const Mining = () => {
  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center fixed top-0 left-0 right-0 z-[60] px-6 bg-[#0b1326]/80 backdrop-blur-xl border-b border-[#464554]/15 h-16">
        <div className="flex items-center gap-3 w-64">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-xl" style={{fontVariationSettings: "'FILL' 1"}}>precision_manufacturing</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter text-[#c0c1ff] leading-none">Axodus</h1>
            <p className="text-[8px] uppercase tracking-widest text-outline leading-none mt-1">Kinetic Observatory</p>
          </div>
        </div>
        {/* Centered Search */}
        <div className="flex-1 max-w-xl px-4">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input className="w-full bg-[#131b2e] border-outline-variant/20 border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-outline/50" placeholder="Search resources, hashpower, or protocols..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-[#c0c1ff] font-['Inter'] font-semibold tracking-[-0.02em] text-sm">
              $NEURONS: 42,069.00
            </span>
            <div className="h-4 w-px bg-outline-variant/30"></div>
            <div className="flex items-center gap-3 text-[#908fa0]">
              <span className="material-symbols-outlined hover:text-white cursor-pointer transition-colors duration-300 text-xl">notifications</span>
              <span className="material-symbols-outlined hover:text-white cursor-pointer transition-colors duration-300 text-xl">settings</span>
            </div>
          </div>
          <button className="px-5 py-2 rounded-full border border-[#c0c1ff]/30 text-[#c0c1ff] font-semibold text-xs hover:bg-[#c0c1ff]/10 transition-all">
            Connect Wallet
          </button>
        </div>
      </header>
      {/* Sidebar */}
      <aside className="flex flex-col fixed left-0 top-16 h-[calc(100vh-64px)] overflow-y-auto bg-[#131b2e] w-64 border-r border-[#464554]/15 z-50">
        <nav className="mt-4 flex-1">
          <a href="index.html" className="flex items-center px-6 py-3 gap-4 text-[#908fa0] hover:bg-[#1d263b] transition-colors duration-200 font-['Inter'] tracking-tight font-semibold text-sm">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Overview</span>
          </a>
          <a href="mining.html" className="flex items-center px-6 py-3 gap-4 text-[#c0c1ff] bg-[#2d3449] border-r-2 border-[#c0c1ff] font-['Inter'] tracking-tight font-semibold text-sm">
            <span className="material-symbols-outlined">precision_manufacturing</span>
            <span>Mining</span>
          </a>
          <a href="tradingbots.html" className="flex items-center px-6 py-3 gap-4 text-[#908fa0] hover:bg-[#1d263b] transition-colors duration-200 font-['Inter'] tracking-tight font-semibold text-sm">
            <span className="material-symbols-outlined">candlestick_chart</span>
            <span>Trading</span>
          </a>
          <a href="defi.html" className="flex items-center px-6 py-3 gap-4 text-[#908fa0] hover:bg-[#1d263b] transition-colors duration-200 font-['Inter'] tracking-tight font-semibold text-sm">
            <span className="material-symbols-outlined">account_balance</span>
            <span>Staking</span>
          </a>
          <a href="dao.html" className="flex items-center px-6 py-3 gap-4 text-[#908fa0] hover:bg-[#1d263b] transition-colors duration-200 font-['Inter'] tracking-tight font-semibold text-sm">
            <span className="material-symbols-outlined">group_work</span>
            <span>DAOs</span>
          </a>
          <a href="business.html" className="flex items-center px-6 py-3 gap-4 text-[#908fa0] hover:bg-[#1d263b] transition-colors duration-200 font-['Inter'] tracking-tight font-semibold text-sm">
            <span className="material-symbols-outlined">business_center</span>
            <span>Business</span>
          </a>
          <a href="marketplace.html" className="flex items-center px-6 py-3 gap-4 text-[#908fa0] hover:bg-[#1d263b] transition-colors duration-200 font-['Inter'] tracking-tight font-semibold text-sm">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span>Marketplace</span>
          </a>
          <a href="academy.html" className="flex items-center px-6 py-3 gap-4 text-[#908fa0] hover:bg-[#1d263b] transition-colors duration-200 font-['Inter'] tracking-tight font-semibold text-sm">
            <span className="material-symbols-outlined">school</span>
            <span>Academy</span>
          </a>
          <a href="dex.html" className="flex items-center px-6 py-3 gap-4 text-[#908fa0] hover:bg-[#1d263b] transition-colors duration-200 font-['Inter'] tracking-tight font-semibold text-sm">
            <span className="material-symbols-outlined">currency_exchange</span>
            <span>DEX</span>
          </a>
          <a href="lottery.html" className="flex items-center px-6 py-3 gap-4 text-[#908fa0] hover:bg-[#1d263b] transition-colors duration-200 font-['Inter'] tracking-tight font-semibold text-sm">
            <span className="material-symbols-outlined">casino</span>
            <span>Lottery</span>
          </a>
          <a href="mcps.html" className="flex items-center px-6 py-3 gap-4 text-[#908fa0] hover:bg-[#1d263b] transition-colors duration-200 font-['Inter'] tracking-tight font-semibold text-sm">
            <span className="material-symbols-outlined">dns</span>
            <span>MCP Servers</span>
          </a>
        </nav>
        <div className="p-6 border-t border-outline-variant/15 sticky bottom-0 bg-[#131b2e]">
          <button className="w-full py-3 rounded-lg gradient-bg text-on-primary font-bold text-sm tracking-tight hover:opacity-90 transition-all active:scale-95">
            Launch Terminal
          </button>
        </div>
      </aside>
      {/* Main Content Area */}
      <main className="ml-64 min-h-screen relative overflow-y-auto bg-background">
        {/* Canvas Body */}
        <div className="pt-24 px-8 pb-12 space-y-10 max-w-[1600px] mx-auto">
          {/* 1. Header Metrics (Editorial Style) */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
          {/* 2. Mining Products & 3. Your Yield (Asymmetric Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Mining Products Section */}
            <section className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight text-white">Mining Products</h2>
                <span className="text-sm font-medium text-primary cursor-pointer hover:underline">View All Protocols</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {/* Card 1: Minto Finance */}
                <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-8 items-center group hover:bg-[#2d3449]/60 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-[#060e20] flex items-center justify-center shrink-0 border border-outline-variant/10">
                    <img className="w-10 h-10 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPBEiVUmSpZNikDiFAGnMbL2W0Qjq2wZh7iMpgvSHSiFXoN3Hqc-MI1YfieKR_NMyg7HgwmBFE4kpTyjkHDe6YzvXQXRzjgLna7Itp4DnQFX8Dug8pggKrI0G3i-Tv-7NG1rmdf2K7wk_KG_hPt8ANbMrm9trMZPmvkdiEwoNrXjccObIqp5rBY-3kb7yTeXHc8C8djE-NtLkfy_0NrJdcQvGb_9qxBGdOGWFA5mVl3wZlox_6ZHW_hg9NsaMN_nvA9QEhGasa8FI"/>
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
                {/* Card 2: GoMining */}
                <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-8 items-center group hover:bg-[#2d3449]/60 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-[#060e20] flex items-center justify-center shrink-0 border border-outline-variant/10">
                    <img className="w-10 h-10 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTKe13-JaGYeLq7ZNnJqEhjI7JhWpzAqVITa9RqBkr3MEJp56WZoZyqwx5e2phs51Lo09RYtXZhdfYoopqpZSZB3IzamsBqUxvpO7AuVy3XSiu43faIqhA3R80uvEjbJubb0wH6nboFZNe5Po5azOQODD6FOwtcJbsjnBlb6_-MNKf5bhd-fi2biC0NLylROW0YZsXlIawFuOr9bPXlg6GgEAUCYBhC56-YLGIvsJ21-kDDQ__OUR5oNfjJVlMmlI3_GSlCfnnej4"/>
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
                      <button className="w-full py-2 px-4 rounded-xl border border-outline-variant/30 text-white font-bold text-sm tracking-tight hover:bg-surface-container-highest">
                        Manage NFTs
                      </button>
                    </div>
                  </div>
                </div>
                {/* Card 3: BitFuFu */}
                <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-8 items-center group hover:bg-[#2d3449]/60 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-[#060e20] flex items-center justify-center shrink-0 border border-outline-variant/10">
                    <img className="w-10 h-10 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEAemm2zIkJxMGhzoBEj1c4RcEX3pi-0KhZSGS5YacKAzhIHUmuZOGRLwih4esRW1Xa8tqV3Es5bWV1esEgCc5588GdbYfqhwDUVjRe5WBMac6qHJmwWo-h7QiG2yfW-MZLiXYmklDvaRTBMsQt7T9IkT2y4W3ht0eXeQVwHySgfHou7tZ8KctFQtruxSVx0wDNE9BjivoEzdS48GFiPoS64t6YMC4d8vuDrY9OaZIi_u5fTvzKAnkti1cMbWHpHZtluX5a0yZ5HU"/>
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
                      <button className="w-full py-2 px-4 rounded-xl border border-outline-variant/30 text-white font-bold text-sm tracking-tight hover:bg-surface-container-highest">
                        New Contract
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* 3. Your Yield Section (Column 3) */}
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
                {/* Visual Mock of Chart */}
                <div className="flex-1 relative flex items-end gap-1 px-2">
                  {/* SVG Curve Overlay */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <path d="M0,150 Q50,130 100,140 T200,100 T300,120 T400,60 T500,80" fill="none" stroke="#c0c1ff" strokeLinecap="round" strokeWidth="3"></path>
                    <path d="M0,150 Q50,130 100,140 T200,100 T300,120 T400,60 T500,80 L500,200 L0,200 Z" fill="url(#grad)" opacity="0.1"></path>
                    <defs>
                      <linearGradient id="grad" x1="0%" x2="0%" y1="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: "#c0c1ff", stopOpacity: 1}}></stop>
                        <stop offset="100%" style={{stopColor: "#c0c1ff", stopOpacity: 0}}></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Data Columns (Hidden/Ghost) */}
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
          {/* 4. Live Hashpower Section (Full Width Data Viz) */}
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
                {/* Progress Circle / Radial Viz */}
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
                {/* Legend and Details */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-sm font-semibold text-on-surface">GoMining NFT Fleet</span>
                    </div>
                    <p className="text-2xl font-black text-white">450 <span className="text-xs text-outline font-medium">TH/s</span></p>
                    <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[62%]"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-secondary"></div>
                      <span className="text-sm font-semibold text-on-surface">Minto Finance</span>
                    </div>
                    <p className="text-2xl font-black text-white">125 <span className="text-xs text-outline font-medium">TH/s</span></p>
                    <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-secondary w-[17%]"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-outline"></div>
                      <span className="text-sm font-semibold text-on-surface">BitFuFu Cloud</span>
                    </div>
                    <p className="text-2xl font-black text-white">150 <span className="text-xs text-outline font-medium">TH/s</span></p>
                    <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-outline w-[21%]"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Ambient Background Decoration */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 blur-[120px] rounded-full"></div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Mining;
