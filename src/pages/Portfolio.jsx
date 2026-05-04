// src/pages/Portfolio.jsx
import React from 'react';
import "@/styles/Global.css";

const Portfolio = () => {
  return (
    <main className="flex-1 bg-background p-6 lg:p-10 space-y-10 overflow-hidden">
      {/* Hero Section: TVL Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-surface-container-low rounded-3xl p-6 ghost-border">
          <div>
            <span className="text-xs font-semibold text-outline uppercase tracking-[0.2em] mb-2 block">Total Value Locked</span>
            <div className="flex items-baseline gap-3">
              <h1 className="text-5xl font-extrabold tracking-tighter text-on-surface">$4.28B</h1>
              <span className="text-secondary text-sm font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-outline">trending_up</span>
                +12.4%
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <button className="hero-gradient px-6 py-2.5 rounded-xl font-bold text-sm text-on-primary shadow-lg shadow-indigo-500/20">Deposit Now</button>
            <button className="bg-surface-container-high px-6 py-2.5 rounded-xl font-bold text-sm text-on-surface border-outline-variant/20">Withdraw</button>
          </div>
        </div>
        <div className="lg:col-span-8 bg-surface-container-low rounded-3xl p-6 ghost-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-on-surface">Yield History</h3>
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1 rounded bg-surface-container-lowest/50 text-outline/50">1W</button>
              <button className="text-xs px-3 py-1 rounded hover:bg-surface-container-lowest text-outline hover:text-on-surface">1M</button>
              <button className="text-xs px-3 py-1 rounded hover:bg-surface-container-lowest text-outline hover:text-on-surface">1Y</button>
            </div>
          </div>
          <div className="h-48 flex items-end gap-2 relative">
            {/* Mock Area Chart Visual */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <img className="w-full h-full object-cover rounded-lg" alt="abstract flowing blue and purple neon gradient line graph representing kinetic growth on a dark digital mesh background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCac0WJDqXuk5-qdQh_8RzVJ4NL7stPXeHqhh_sM-JjFemMRU6uCHMV-vPTcElIo86jBUa1qXeCb_fLC1YeMnVR5s-RtczxrtK3nIEPwqoo8nbHPBFTjPoSY9-_xV6EMVQEMxpVRTqVCPgvijBRUqMjCmKPwDGIxGSMlh1EDBTtWSwrNLt2WZQl3FoEL0boHrKiTltQRy7zQ9SNClgaWuQ7_4jDg7VcyYenHNNpG3E0co5Cqgmr0vL1GSVZd4dAiJf7Aam98HzU8Ds"/>
            </div>
            {/* UI representation of peaks - properly centered */}
            <div className="absolute inset-4 flex items-end gap-2">
              <div className="flex-1 bg-primary/20 rounded-t h-[40%] hover:bg-primary/40 transition-all"></div>
              <div className="flex-1 bg-primary/30 rounded-t h-[55%] hover:bg-primary/50 transition-all"></div>
              <div className="flex-1 bg-primary/40 rounded-t h-[70%] hover:bg-primary/60 transition-all"></div>
              <div className="flex-1 bg-primary/50 rounded-t h-[65%] hover:bg-primary/70 transition-all"></div>
              <div className="flex-1 bg-primary/60 rounded-t h-[85%] hover:bg-primary/80 transition-all"></div>
              <div className="flex-1 bg-primary/70 rounded-t h-[80%] hover:bg-primary/90 transition-all"></div>
              <div className="flex-1 bg-primary/80 rounded-t h-[95%] hover:bg-primary transition-all"></div>
              <div className="flex-1 bg-primary/90 rounded-t h-[100%] hover:bg-primary shadow-[0_0_10px_rgba(192,193,255,0.5)]"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Layout Split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Left: Staking & Lending --> */}
        <div className="xl:col-span-2 space-y-10">
          {/* Staking Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">layers</span>
                Staking Opportunities
              </h2>
              <button className="text-primary text-sm font-semibold hover:underline">View All Pools</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Core $NEURONS Pool */}
              <div className="bg-surface-container-low rounded-2xl p-6 ghost-border hover:border-primary/30 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                      <span className="material-symbols-outlined text-white">bolt</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Core $NEURONS Pool</h4>
                      <span className="text-xs text-secondary font-medium tracking-wide">HIGH YIELD</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block uppercase">APY</span>
                    <span className="text-2xl font-black text-indigo-400">42.8%</span>
                  </div>
                </div>
                <div className="bg-surface-container-lowest/50 rounded-xl p-4 mb-6 flex justify-between">
                  <div>
                    <span className="text-[10px] text-outline block uppercase">Earned Rewards</span>
                    <span className="text-lg font-bold text-on-surface">1,240.50 <span className="text-xs font-normal text-outline">$NRS</span></span>
                  </div>
                  <button className="text-primary font-semibold text-sm self-end">Claim</button>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-2.5 rounded-lg bg-primary/10 text-primary font-bold text-sm border-primary/20 hover:bg-primary hover:text-on-primary transition-all">Stake</button>
                  <button className="flex-1 py-2.5 rounded-lg bg-surface-container-highest text-on-surface font-bold text-sm border-outline-variant/10">Unstake</button>
                </div>
              </div>
              {/* ETH/WBTC Pool */}
              <div className="bg-surface-container-low rounded-2xl p-6 ghost-border hover:border-primary/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-[#131b2e] flex items-center justify-center">
                        <img className="w-6 h-6" alt="ethereum logo icon in sleek silver 3d style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwM1kHlmSmuBe44Uk19syCvfbLCM7xHVu0GuBhxpMDHnIy4htxC8TbzEHgsU6v2FcUfyN2MdiTLVLpJtohSdcq5gJ0FXpnU3Csn1-7kUlMOTmj36YHBGusji1HNfamsurQtBzrJJPbkUP3CnAZi8W8JJ7Df1oUydsQhO-bLwyxkKQQVlMwDhEaymFMaSWVA6jw1jb1nnDmaeL6FJWGlgoGk1bS1YVs-z2Jr0uodDigvYW56ilRS060TRz80Z_zSLRdbVbeO1nprTg"/>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-[#131b2e] flex items-center justify-center">
                        <img className="w-6 h-6" alt="bitcoin logo icon in gold 3d style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB02ZlUZzvUpVEljKo75K_FAB_hH3nTmTIT2nn_ksz4S8skGZDUj2_8gIc5r0LrXFB6XM90ZQ-KV7grqpMYjgGi0WKpfNLJNSghuf46H3ZfzkO3LGaafGM-W9Uu_fIa4zZtYbszls3Kn5ocElFELLUr-1l4VER_mkOy4fnyIHB0S5yoi0tv-9bEPZL9DUK6OctpriE0BOHTuEhG_bTBY3yynOKSrH26EMcm4Itf6ErU8tJeMdnvVcaQ2tIGk8XHdpK3Jra4k-2ySsY"/>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">ETH / WBTC</h4>
                      <span className="text-xs text-slate-500 font-medium tracking-wide">CROSS-CHAIN</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block uppercase">APY</span>
                    <span className="text-2xl font-black text-white">8.2%</span>
                  </div>
                </div>
                <div className="bg-surface-container-lowest/50 rounded-xl p-4 mb-6 flex justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Earned Rewards</span>
                    <span className="text-lg font-bold text-white">0.042 <span className="text-xs font-normal text-slate-400">ETH</span></span>
                  </div>
                  <button className="text-indigo-400 font-semibold text-sm self-end">Claim</button>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold text-sm border-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all">Stake</button>
                  <button className="flex-1 py-2.5 rounded-lg bg-surface-container-highest text-slate-300 font-bold text-sm border-outline-variant/10">Unstake</button>
                </div>
              </div>
            </div>
          </section>
          {/* Lending Markets */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
              Lending Markets
            </h2>
            <div className="overflow-hidden rounded-2xl bg-surface-container-low border-outline-variant/10">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-lowest/50">
                    <th className="px-6 py-4 text-xs font-semibold text-outline uppercase tracking-wider">Asset</th>
                    <th className="px-6 py-4 text-xs font-semibold text-outline uppercase tracking-wider">Supply APY</th>
                    <th className="px-6 py-4 text-xs font-semibold text-outline uppercase tracking-wider">Borrow APY</th>
                    <th className="px-6 py-4 text-xs font-semibold text-outline uppercase tracking-wider">Liquidity</th>
                    <th className="px-6 py-4 text-xs font-semibold text-outline uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  <tr className="hover:bg-surface-container transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-xs font-bold">USDT</div>
                        <span className="font-semibold text-on-surface">Tether</span>
                      </div>
                    </td>
                    <td className="px-6 py-5"><span className="text-secondary font-bold">4.2%</span></td>
                    <td className="px-6 py-5 text-on-surface-variant">5.8%</td>
                    <td className="px-6 py-5 text-outline">$142M</td>
                    <td className="px-6 py-5 text-right"><button className="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Lend</button></td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">ETH</div>
                        <span className="font-semibold text-on-surface">Ethereum</span>
                      </div>
                    </td>
                    <td className="px-6 py-5"><span className="text-secondary font-bold">2.1%</span></td>
                    <td className="px-6 py-5 text-on-surface-variant">3.4%</td>
                    <td className="px-6 py-5 text-outline">$892M</td>
                    <td className="px-6 py-5 text-right"><button className="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Lend</button></td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary text-xs font-bold">BTC</div>
                        <span className="font-semibold text-on-surface">Bitcoin</span>
                      </div>
                    </td>
                    <td className="px-6 py-5"><span className="text-secondary font-bold">1.8%</span></td>
                    <td className="px-6 py-5 text-on-surface-variant">2.9%</td>
                    <td className="px-6 py-5 text-outline">$2.1B</td>
                    <td className="px-6 py-5 text-right"><button className="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Lend</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
        {/* Right Sidebar Content */}
        <div className="space-y-10">
          {/* User Status Widget */}
          <section className="bg-surface-container-low p-8 rounded-3xl ghost-border space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Loan Health</h3>
              <div className="relative flex items-center justify-center">
                {/* Circular Gauge Mockup */}
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle className="text-white/5" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-secondary" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="110" strokeLinecap="round" strokeWidth="10"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-white">2.4</span>
                  <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">Safe</span>
                </div>
              </div>
              <p className="text-xs text-center text-slate-500 mt-4 leading-relaxed px-4">Your liquidation threshold is far. Keep your collateral ratio above 1.5 to stay safe.</p>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-6 border-white/5">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4 block">Claimable Rewards</span>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">$1,482.00</div>
                  <div className="text-xs text-indigo-400">+124.2 NRS pending</div>
                </div>
                <button className="hero-gradient p-3 rounded-full shadow-lg shadow-indigo-500/20">
                  <span className="material-symbols-outlined text-on-primary">payments</span>
                </button>
              </div>
            </div>
          </section>
          {/* Liquidity Pools (DEX LPs) */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-on-surface px-2">Top Yield Pools</h3>
            <div className="space-y-4">
              {/* Pool Card */}
              <div className="bg-surface-container-low p-5 rounded-2xl ghost-border hover:translate-y-[-2px] transition-transform cursor-pointer">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 border-surface z-10 flex items-center justify-center"><span className="material-symbols-outlined text-xs text-white">bolt</span></div>
                    <div className="w-8 h-8 rounded-full bg-green-500 border-surface flex items-center justify-center text-[10px] font-bold text-white">U</div>
                  </div>
                  <span className="text-secondary font-bold text-lg">124.5% <span className="text-[10px] text-slate-500 align-middle">APY</span></span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>NEURONS / USDT</span>
                  <span>Vol: $4.2M</span>
                </div>
              </div>
              {/* Pool Card */}
              <div className="surface-container-highest p-5 rounded-2xl border-white/5 hover:translate-y-[-2px] transition-transform cursor-pointer">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-surface z-10 flex items-center justify-center text-[10px] font-bold text-white">E</div>
                    <div className="w-8 h-8 rounded-full bg-orange-500 border-surface flex items-center justify-center text-[10px] font-bold text-white">B</div>
                  </div>
                  <span className="text-white font-bold text-lg">18.4% <span className="text-[10px] text-slate-500 align-middle">APY</span></span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>ETH / WBTC</span>
                  <span>Vol: $12.8M</span>
                </div>
              </div>
              {/* Pool Card */}
              <div className="surface-container-highest p-5 rounded-2xl border-white/5 hover:translate-y-[-2px] transition-transform cursor-pointer">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500 border-surface z-10 flex items-center justify-center text-[10px] font-bold text-white">S</div>
                    <div className="w-8 h-8 rounded-full bg-blue-400 border-surface flex items-center justify-center text-[10px] font-bold text-white">U</div>
                  </div>
                  <span className="text-white font-bold text-lg">26.1% <span className="text-[10px] text-slate-500 align-middle">APY</span></span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>SOL / USDC</span>
                  <span>Vol: $8.9M</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Portfolio;
