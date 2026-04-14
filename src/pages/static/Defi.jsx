import React from 'react';
import styles from '../../styles/Global.module.css';

const Defi = () => {
  return (
    <>
      {/* TopNavBar Implementation */}
      <header className="bg-[#0b1326] backdrop-blur-xl bg-opacity-60 font-['Inter'] tracking-tight docked full-width top-0 z-50 flex justify-between items-center w-full px-6 py-3 border-b border-white/5 sticky">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-semibold tracking-tighter text-slate-50">Axodus</span>
          <div className="hidden md:flex items-center bg-surface-container-lowest rounded-full px-4 py-1.5 border border-outline-variant/10">
            <span className="material-symbols-outlined text-outline text-sm mr-2">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-sm w-64 placeholder:text-slate-500" placeholder="Search markets..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-xs font-label text-slate-500 uppercase tracking-widest">Network Status</span>
            <span className="text-sm font-semibold text-indigo-400">$NEURONS: $1.42</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-white transition-colors duration-200"><span className="material-symbols-outlined">notifications</span></button>
            <button className="p-2 text-slate-400 hover:text-white transition-colors duration-200"><span className="material-symbols-outlined">settings</span></button>
            <button className="hero-gradient text-on-primary px-5 py-2 rounded-lg font-semibold text-sm active:scale-95 duration-150">Connect Wallet</button>
          </div>
        </div>
      </header>
      <div className="flex">
        {/* SideNavBar Implementation */}
        <aside className="bg-[#0b1326] font-['Inter'] font-medium text-sm docked left-0 h-screen w-64 border-r border-white/5 flex flex-col sticky top-0 hidden md:flex">
          <div className="px-6 py-8">
            <h2 className="text-xl font-bold text-white">Axodus</h2>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Kinetic Observatory</p>
          </div>
          <nav className="flex-1 px-3 space-y-1">
            <a href="index.html" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-indigo-400 bg-indigo-500/10 border-r-2 border-indigo-400 translate-x-1">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>grid_view</span>
              Dashboard
            </a>
            <a href="mining.html" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all duration-200">
              <span className="material-symbols-outlined">agriculture</span>
              Mining
            </a>
            <a href="tradingbots.html" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all duration-200">
              <span className="material-symbols-outlined">swap_horiz</span>
              Trading
            </a>
            <a href="defi.html" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all duration-200">
              <span className="material-symbols-outlined">layers</span>
              Staking
            </a>
            <a href="dao.html" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all duration-200">
              <span className="material-symbols-outlined">account_balance</span>
              DAOs
            </a>
            <a href="marketplace.html" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all duration-200">
              <span className="material-symbols-outlined">storefront</span>
              Marketplace
            </a>
            <a href="academy.html" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all duration-200">
              <span className="material-symbols-outlined">school</span>
              Academy
            </a>
            <a href="defi.html" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all duration-200">
              <span className="material-symbols-outlined">account_balance_wallet</span>
              Lending
            </a>
            <a href="dex.html" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all duration-200">
              <span className="material-symbols-outlined">currency_exchange</span>
              DEX
            </a>
            <a href="lottery.html" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all duration-200">
              <span className="material-symbols-outlined">casino</span>
              Lottery
            </a>
            <a href="mcps.html" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all duration-200">
              <span className="material-symbols-outlined">dns</span>
              MCP Servers
            </a>
          </nav>
          <div className="p-4 border-t border-white/5">
            <a className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">help</span>
              Support
            </a>
            <a className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">description</span>
              Docs
            </a>
          </div>
        </aside>
        {/* Main Content Area */}
        <main className="flex-1 bg-background p-6 lg:p-10 space-y-10 overflow-hidden">
          {/* Hero Section: TVL Overview */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 flex flex-col justify-between p-8 rounded-3xl surface-container-highest relative overflow-hidden bg-gradient-to-br from-[#131b2e] to-[#2d3449]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em] mb-2 block">Total Value Locked</span>
                <div className="flex items-baseline gap-3">
                  <h1 className="text-5xl font-extrabold tracking-tighter text-white">$4.28B</h1>
                  <span className="text-secondary text-sm font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">trending_up</span>
                    +12.4%
                  </span>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <button className="hero-gradient px-6 py-2.5 rounded-xl font-bold text-sm text-on-primary shadow-lg shadow-indigo-500/20">Deposit Now</button>
                <button className="bg-surface-container-high px-6 py-2.5 rounded-xl font-bold text-sm text-white border border-outline-variant/20">Withdraw</button>
              </div>
            </div>
            <div className="lg:col-span-8 p-6 rounded-3xl surface-container-highest bg-[#131b2e]/50 border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white">Yield History</h3>
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1 rounded bg-indigo-500/20 text-indigo-300">1W</button>
                  <button className="text-xs px-3 py-1 rounded hover:bg-white/5 text-slate-500">1M</button>
                  <button className="text-xs px-3 py-1 rounded hover:bg-white/5 text-slate-500">1Y</button>
                </div>
              </div>
              <div className="h-48 flex items-end gap-1 relative">
                {/* Mock Area Chart Visual */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                  <img className="w-full h-full object-cover rounded-lg" alt="abstract flowing blue and purple neon gradient line graph representing kinetic growth on a dark digital mesh background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCac0WJDqXuk5-qdQh_8RzVJ4NL7stPXeHqhh_sM-JjFemMRU6uCHMV-vPTcElIo86jBUa1qXeCb_fLC1YeMnVR5s-RtczxrtK3nIEPwqoo8nbHPBFTjPoSY9-_xV6EMVQEMxpVRTqVCPgvijBRUqMjCmKPwDGIxGSMlh1EDBTtWSwrNLt2WZQl3FoEL0boHrKiTltQRy7zQ9SNClgaWuQ7_4jDg7VcyYenHNNpG3E0co5Cqgmr0vL1GSVZd4dAiJf7Aam98HzU8Ds"/>
                </div>
                {/* UI representation of peaks */}
                <div className="flex-1 bg-indigo-500/20 rounded-t h-[40%]"></div>
                <div className="flex-1 bg-indigo-500/30 rounded-t h-[55%]"></div>
                <div className="flex-1 bg-indigo-500/40 rounded-t h-[70%]"></div>
                <div className="flex-1 bg-indigo-500/50 rounded-t h-[65%]"></div>
                <div className="flex-1 bg-indigo-500/60 rounded-t h-[85%]"></div>
                <div className="flex-1 bg-indigo-500/70 rounded-t h-[80%]"></div>
                <div className="flex-1 bg-indigo-500/80 rounded-t h-[95%]"></div>
                <div className="flex-1 bg-indigo-500/90 rounded-t h-[100%]"></div>
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
                  <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-indigo-400">layers</span>
                    Staking Opportunities
                  </h2>
                  <button className="text-indigo-400 text-sm font-semibold hover:underline">View All Pools</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Core $NEURONS Pool */}
                  <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all group">
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
                        <span className="text-[10px] text-slate-500 block uppercase">Earned Rewards</span>
                        <span className="text-lg font-bold text-white">1,240.50 <span className="text-xs font-normal text-slate-400">$NRS</span></span>
                      </div>
                      <button className="text-indigo-400 font-semibold text-sm self-end">Claim</button>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 py-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold text-sm border border-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all">Stake</button>
                      <button className="flex-1 py-2.5 rounded-lg bg-surface-container-highest text-slate-300 font-bold text-sm border border-outline-variant/10">Unstake</button>
                    </div>
                  </div>
                  {/* ETH/WBTC Pool */}
                  <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all">
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
                      <button className="flex-1 py-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold text-sm border border-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all">Stake</button>
                      <button className="flex-1 py-2.5 rounded-lg bg-surface-container-highest text-slate-300 font-bold text-sm border border-outline-variant/10">Unstake</button>
                    </div>
                  </div>
                </div>
              </section>
              {/* Lending Markets */}
              <section>
                <h2 className="text-2xl font-bold tracking-tight text-white mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-400">account_balance_wallet</span>
                  Lending Markets
                </h2>
                <div className="overflow-hidden rounded-2xl surface-container-highest border border-white/5">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Asset</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Supply APY</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Borrow APY</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Liquidity</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xs font-bold">USDT</div>
                            <span className="font-semibold text-white">Tether</span>
                          </div>
                        </td>
                        <td className="px-6 py-5"><span className="text-secondary font-bold">4.2%</span></td>
                        <td className="px-6 py-5 text-slate-300">5.8%</td>
                        <td className="px-6 py-5 text-slate-400">$142M</td>
                        <td className="px-6 py-5 text-right"><button className="px-4 py-1.5 rounded-lg bg-indigo-500 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Lend</button></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">ETH</div>
                            <span className="font-semibold text-white">Ethereum</span>
                          </div>
                        </td>
                        <td className="px-6 py-5"><span className="text-secondary font-bold">2.1%</span></td>
                        <td className="px-6 py-5 text-slate-300">3.4%</td>
                        <td className="px-6 py-5 text-slate-400">$892M</td>
                        <td className="px-6 py-5 text-right"><button className="px-4 py-1.5 rounded-lg bg-indigo-500 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Lend</button></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-xs font-bold">BTC</div>
                            <span className="font-semibold text-white">Bitcoin</span>
                          </div>
                        </td>
                        <td className="px-6 py-5"><span className="text-secondary font-bold">1.8%</span></td>
                        <td className="px-6 py-5 text-slate-300">2.9%</td>
                        <td className="px-6 py-5 text-slate-400">$2.1B</td>
                        <td className="px-6 py-5 text-right"><button className="px-4 py-1.5 rounded-lg bg-indigo-500 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Lend</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
            {/* Right Sidebar Content */}
            <div className="space-y-10">
              {/* User Status Widget */}
              <section className="glass-panel p-8 rounded-3xl border border-white/5 space-y-8">
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
                <div className="bg-surface-container-lowest rounded-2xl p-6 border border-white/5">
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
                <h3 className="text-lg font-bold text-white px-2">Top Yield Pools</h3>
                <div className="space-y-4">
                  {/* Pool Card */}
                  <div className="surface-container-highest p-5 rounded-2xl border border-white/5 hover:translate-y-[-2px] transition-transform cursor-pointer">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 border border-surface z-10 flex items-center justify-center"><span className="material-symbols-outlined text-xs text-white">bolt</span></div>
                        <div className="w-8 h-8 rounded-full bg-green-500 border border-surface flex items-center justify-center text-[10px] font-bold text-white">U</div>
                      </div>
                      <span className="text-secondary font-bold text-lg">124.5% <span className="text-[10px] text-slate-500 align-middle">APY</span></span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>NEURONS / USDT</span>
                      <span>Vol: $4.2M</span>
                    </div>
                  </div>
                  {/* Pool Card */}
                  <div className="surface-container-highest p-5 rounded-2xl border border-white/5 hover:translate-y-[-2px] transition-transform cursor-pointer">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 border border-surface z-10 flex items-center justify-center text-[10px] font-bold text-white">E</div>
                        <div className="w-8 h-8 rounded-full bg-orange-500 border border-surface flex items-center justify-center text-[10px] font-bold text-white">B</div>
                      </div>
                      <span className="text-white font-bold text-lg">18.4% <span className="text-[10px] text-slate-500 align-middle">APY</span></span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>ETH / WBTC</span>
                      <span>Vol: $12.8M</span>
                    </div>
                  </div>
                  {/* Pool Card */}
                  <div className="surface-container-highest p-5 rounded-2xl border border-white/5 hover:translate-y-[-2px] transition-transform cursor-pointer">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-purple-500 border border-surface z-10 flex items-center justify-center text-[10px] font-bold text-white">S</div>
                        <div className="w-8 h-8 rounded-full bg-blue-400 border border-surface flex items-center justify-center text-[10px] font-bold text-white">U</div>
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
      </div>
      {/* Mobile Navigation (BottomNavBar) */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-high/80 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex justify-between items-center z-50">
        <a className="text-indigo-400 flex flex-col items-center gap-1" href="#">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>grid_view</span>
          <span className="text-[10px] font-bold">Hub</span>
        </a>
        <a className="text-slate-400 flex flex-col items-center gap-1" href="#">
          <span className="material-symbols-outlined">swap_horiz</span>
          <span className="text-[10px]">Trade</span>
        </a>
        <div className="relative -top-6">
          <button className="hero-gradient p-4 rounded-full shadow-2xl shadow-indigo-500/40">
            <span className="material-symbols-outlined text-on-primary">add</span>
          </button>
        </div>
        <a className="text-slate-400 flex flex-col items-center gap-1" href="#">
          <span className="material-symbols-outlined">account_balance_wallet</span>
          <span className="text-[10px]">Lend</span>
        </a>
        <a className="text-slate-400 flex flex-col items-center gap-1" href="#">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px]">Profile</span>
        </a>
      </footer>
    </>
  );
};

export default Defi;
