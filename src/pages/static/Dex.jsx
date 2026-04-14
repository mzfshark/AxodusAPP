import React from 'react';
import styles from '../../styles/Global.module.css';

const Dex = () => {
  return (
    <>
      {/* SideNavBar Anchor */}
      <aside className="h-screen w-64 fixed left-0 top-0 z-40 bg-[#131b2e] flex flex-col py-6 tonal-shift-right border-r border-indigo-500/10 font-['Inter'] font-medium text-sm hidden md:flex">
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-container text-lg" data-icon="rocket_launch">rocket_launch</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-indigo-100 tracking-tighter">Axodus</h1>
            <p className="text-[10px] text-indigo-400 uppercase tracking-widest leading-none">Kinetic Observatory</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          <a className="flex items-center px-4 py-2.5 rounded-lg bg-indigo-500/10 text-indigo-300 border-r-2 border-indigo-500 active:translate-x-1 transition-transform" href="#">
            <span className="material-symbols-outlined mr-3" data-icon="swap_horiz">swap_horiz</span>Trading
          </a>
          <a className="flex items-center px-4 py-2.5 rounded-lg text-slate-400 hover:bg-[#2d3449]/30 hover:text-indigo-200 transition-colors" href="#">
            <span className="material-symbols-outlined mr-3" data-icon="precision_manufacturing">precision_manufacturing</span>Mining
          </a>
          <a className="flex items-center px-4 py-2.5 rounded-lg text-slate-400 hover:bg-[#2d3449]/30 hover:text-indigo-200 transition-colors" href="#">
            <span className="material-symbols-outlined mr-3" data-icon="layers">layers</span>Staking
          </a>
          <a className="flex items-center px-4 py-2.5 rounded-lg text-slate-400 hover:bg-[#2d3449]/30 hover:text-indigo-200 transition-colors" href="#">
            <span className="material-symbols-outlined mr-3" data-icon="account_balance_wallet">account_balance_wallet</span>DEX
          </a>
          <a className="flex items-center px-4 py-2.5 rounded-lg text-slate-400 hover:bg-[#2d3449]/30 hover:text-indigo-200 transition-colors" href="#">
            <span className="material-symbols-outlined mr-3" data-icon="account_balance">account_balance</span>Lending
          </a>
          <a className="flex items-center px-4 py-2.5 rounded-lg text-slate-400 hover:bg-[#2d3449]/30 hover:text-indigo-200 transition-colors" href="#">
            <span className="material-symbols-outlined mr-3" data-icon="group">group</span>DAOs
          </a>
          <a className="flex items-center px-4 py-2.5 rounded-lg text-slate-400 hover:bg-[#2d3449]/30 hover:text-indigo-200 transition-colors" href="#">
            <span className="material-symbols-outlined mr-3" data-icon="storefront">storefront</span>Marketplace
          </a>
          <a className="flex items-center px-4 py-2.5 rounded-lg text-slate-400 hover:bg-[#2d3449]/30 hover:text-indigo-200 transition-colors" href="#">
            <span className="material-symbols-outlined mr-3" data-icon="confirmation_number">confirmation_number</span>Lottery
          </a>
          <a className="flex items-center px-4 py-2.5 rounded-lg text-slate-400 hover:bg-[#2d3449]/30 hover:text-indigo-200 transition-colors" href="#">
            <span className="material-symbols-outlined mr-3" data-icon="business_center">business_center</span>Business
          </a>
          <a className="flex items-center px-4 py-2.5 rounded-lg text-slate-400 hover:bg-[#2d3449]/30 hover:text-indigo-200 transition-colors" href="#">
            <span className="material-symbols-outlined mr-3" data-icon="school">school</span>Academy
          </a>
        </nav>
        <div className="mt-auto px-3 space-y-1">
          <a className="flex items-center px-4 py-2.5 rounded-lg text-slate-400 hover:bg-indigo-500/5 transition-colors" href="#">
            <span className="material-symbols-outlined mr-3" data-icon="help">help</span>Support
          </a>
          <a className="flex items-center px-4 py-2.5 rounded-lg text-slate-400 hover:bg-indigo-500/5 transition-colors" href="#">
            <span className="material-symbols-outlined mr-3" data-icon="description">description</span>Docs
          </a>
          <div className="px-3 pt-4">
            <button className="w-full py-2.5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-xl active:scale-95 transition-transform text-sm shadow-lg shadow-primary/10">
              Launch App
            </button>
          </div>
        </div>
      </aside>
      {/* TopNavBar Anchor */}
      <header className="fixed top-0 w-full z-50 bg-[#0b1326]/60 backdrop-blur-xl flex justify-between items-center px-6 py-3 font-['Inter'] tracking-tight bg-gradient-to-b from-[#131b2e] to-transparent md:pl-72">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-semibold tracking-tighter text-indigo-100 md:hidden">Axodus DEX</span>
          <nav className="hidden lg:flex items-center gap-6">
            <a className="text-indigo-300 border-b-2 border-indigo-500 pb-1" href="#">Swap</a>
            <a className="text-slate-400 hover:text-indigo-200 transition-colors" href="#">Pools</a>
            <a className="text-slate-400 hover:text-indigo-200 transition-colors" href="#">Hooks</a>
            <a className="text-slate-400 hover:text-indigo-200 transition-colors" href="#">Explore</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" data-icon="search">search</span>
            <input className="bg-surface-container-lowest border-none rounded-full pl-9 pr-4 py-1.5 text-sm w-48 focus:ring-1 focus:ring-primary/30 transition-all" placeholder="Search tokens..." type="text"/>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:bg-[#2d3449]/50 rounded-full transition-all active:scale-95">
              <span className="material-symbols-outlined" data-icon="history">history</span>
            </button>
            <button className="p-2 text-slate-400 hover:bg-[#2d3449]/50 rounded-full transition-all active:scale-95">
              <span className="material-symbols-outlined" data-icon="settings">settings</span>
            </button>
          </div>
          <button className="bg-primary-container/20 border border-primary/30 text-primary px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-primary-container/30 transition-all active:scale-95">
            Connect Wallet
          </button>
        </div>
      </header>
      {/* Main Content Area */}
      <main className="pt-24 pb-12 px-6 md:pl-72 max-w-[1600px] mx-auto bg-background">
        {/* Hero Section: Trading Dashboard */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left: Swap & Chart (Editorial Centerpiece) */}
          <div className="xl:col-span-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Swap Card */}
              <div className="glass-card rounded-3xl p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold tracking-tight">Swap</h2>
                  <div className="flex gap-2">
                    <span className="material-symbols-outlined text-primary cursor-pointer hover:rotate-180 transition-transform duration-500" data-icon="autorenew">autorenew</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {/* From Token */}
                  <div className="bg-surface-container-lowest p-4 rounded-2xl border border-white/5">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">From</span>
                      <span className="text-xs text-slate-400">Balance: 14,250.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <input className="bg-transparent border-none focus:ring-0 text-2xl font-bold p-0 w-full text-on-surface" placeholder="0" type="number" defaultValue="1000"/>
                      <button className="flex items-center gap-2 bg-surface-container-highest px-3 py-1.5 rounded-xl hover:bg-surface-bright transition-colors">
                        <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-on-secondary">N</div>
                        <span className="font-bold text-sm">$NEURONS</span>
                        <span className="material-symbols-outlined text-sm" data-icon="expand_more">expand_more</span>
                      </button>
                    </div>
                  </div>
                  {/* Swap Middle Icon */}
                  <div className="flex justify-center -my-3 relative z-10">
                    <div className="w-10 h-10 bg-surface-container-highest rounded-xl border-4 border-[#0b1326] flex items-center justify-center text-primary cursor-pointer hover:scale-110 transition-transform shadow-xl">
                      <span className="material-symbols-outlined" data-icon="arrow_downward">arrow_downward</span>
                    </div>
                  </div>
                  {/* To Token */}
                  <div className="bg-surface-container-lowest p-4 rounded-2xl border border-white/5">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">To (Estimated)</span>
                      <span className="text-xs text-slate-400">Balance: 0.42</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <input className="bg-transparent border-none focus:ring-0 text-2xl font-bold p-0 w-full text-on-surface opacity-80" placeholder="0" readOnly={true} type="number" defaultValue="1.24"/>
                      <button className="flex items-center gap-2 bg-surface-container-highest px-3 py-1.5 rounded-xl hover:bg-surface-bright transition-colors">
                        <img alt="ETH" className="w-6 h-6 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWEKPPCF0Qgl4Y5Pl8Tni0LT35AZhKQh5WM2bBuzAOwn7S1F-IvfgUgS6mFtwn9WAzJW4Z67s7u4U7FDZRMEn_yq74yCvzgCl0xtSGXpsUODLzflyNTWdn8Pku56_3yfbqFVNCzWwXQslcNZFs75VdJtpturU0s0iffT0NcM19AVC7hux1y3bO1pwSX49Cm4O1XB3OontZd2twDTd-vg6bbjN0qpzPrk_KONKVpXu4hw4zS6qTrRopQr4AnJZP2gsEWfMoyDSGNNo"/>
                        <span className="font-bold text-sm">ETH</span>
                        <span className="material-symbols-outlined text-sm" data-icon="expand_more">expand_more</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Price Impact & Details */}
                <div className="mt-6 space-y-3 px-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Exchange Rate</span>
                    <span className="text-on-surface font-medium">1 ETH = 806.45 $NEURONS</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Price Impact</span>
                    <span className="text-secondary font-medium">{"<"}0.01%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Slippage Tolerance</span>
                    <span className="text-on-surface font-medium">0.5%</span>
                  </div>
                </div>
                <button className="mt-6 w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-extrabold rounded-2xl active:scale-[0.98] transition-all text-lg shadow-xl shadow-primary/20">
                  Swap Tokens
                </button>
              </div>
              {/* Mini Chart */}
              <div className="glass-card rounded-3xl p-6 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">NEURONS / ETH</h3>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-extrabold tracking-tight">$3,421.90</span>
                      <span className="text-secondary text-sm font-bold mb-1">+4.2%</span>
                    </div>
                  </div>
                  <div className="flex bg-surface-container-lowest p-1 rounded-lg">
                    <button className="px-2 py-1 text-[10px] font-bold text-primary bg-primary/10 rounded-md">1D</button>
                    <button className="px-2 py-1 text-[10px] font-bold text-slate-500 hover:text-slate-300">1W</button>
                    <button className="px-2 py-1 text-[10px] font-bold text-slate-500 hover:text-slate-300">1M</button>
                  </div>
                </div>
                <div className="flex-1 w-full relative group">
                  {/* Visual representation of a sparkline chart */}
                  <svg className="w-full h-full min-h-[180px]" preserveAspectRatio="none" viewBox="0 0 400 200">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#41e4b8" stopOpacity="0.2"></stop>
                        <stop offset="100%" stopColor="#41e4b8" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                    <path d="M0,150 Q40,140 80,160 T160,120 T240,80 T320,100 T400,40" fill="none" stroke="#41e4b8" strokeLinecap="round" strokeWidth="3"></path>
                    <path d="M0,150 Q40,140 80,160 T160,120 T240,80 T320,100 T400,40 L400,200 L0,200 Z" fill="url(#chartGradient)"></path>
                    {/* Animated-like point */}
                    <circle className="animate-pulse" cx="400" cy="40" fill="#41e4b8" r="4"></circle>
                  </svg>
                  {/* Chart Overlay info */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/20 pointer-events-none">
                    <div className="bg-surface-bright px-3 py-1.5 rounded-lg border border-white/10 shadow-2xl">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Volume 24h</p>
                      <p className="text-sm font-bold">$12.4M</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="text-center py-2 bg-surface-container-lowest rounded-xl border border-white/5">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Low</p>
                    <p className="text-xs font-semibold">$3,210</p>
                  </div>
                  <div className="text-center py-2 bg-surface-container-lowest rounded-xl border border-white/5">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">High</p>
                    <p className="text-xs font-semibold">$3,580</p>
                  </div>
                  <div className="text-center py-2 bg-surface-container-lowest rounded-xl border border-white/5">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">MCap</p>
                    <p className="text-xs font-semibold">$4.2B</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Top Pools Section (Asymmetric Data Table) */}
            <section className="glass-card rounded-3xl overflow-hidden mt-6 xl:col-span-8">
              <div className="p-6 flex justify-between items-end border-b border-white/5">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Top Liquidity Pools</h2>
                  <p className="text-sm text-slate-400">Discover deep liquidity with premium incentives.</p>
                </div>
                <button className="text-primary text-xs font-bold hover:underline">View All Pools</button>
              </div>
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5">
                      <th className="px-6 py-4">Pair</th>
                      <th className="px-6 py-4">TVL</th>
                      <th className="px-6 py-4">Volume (24h)</th>
                      <th className="px-6 py-4">APY</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-white/5">
                    <tr className="hover:bg-white/5 transition-colors cursor-pointer group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full border-2 border-background bg-secondary text-[10px] font-bold flex items-center justify-center text-on-secondary">N</div>
                            <img alt="USDT" className="w-8 h-8 rounded-full border-2 border-background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4p9SE07dFyy-v8ul4cBdkWKrFag7r6vIzWF_1OocqoVrAKDJ_Qq4HxLLLNmzT193oJpNxVLa6ctfHHPZoGson7LmYLHi1pJoQebcjeeU0WBGKBUkSleWQ-0Txb4mkQVhmhsva1vwnD-OkKTBCE6lGrDZJIfakw41BjaPNpneE2V0J0P7SmAG1P-ksbbI-7hge89qEdUEJoD8XFLiGEA5JhoJTcw_L-ozc-i6WfONFfiGb6Aq0UB_1sMnaRbL0qoB_rf2tvQLzSss"/>
                          </div>
                          <div>
                            <p className="font-bold text-on-surface">NEURONS / USDT</p>
                            <p className="text-[10px] text-slate-500">0.05% Fee</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">$42.8M</td>
                      <td className="px-6 py-4 text-slate-300">$8.4M</td>
                      <td className="px-6 py-4">
                        <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded-full text-xs font-bold">124.5%</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="opacity-0 group-hover:opacity-100 bg-surface-container-highest px-3 py-1 rounded-lg text-xs font-bold transition-opacity">Add</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors cursor-pointer group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            <img alt="ETH" className="w-8 h-8 rounded-full border-2 border-background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiGkWAxxnjuKOHaQHDQTCHyVGMEaONOdaB-IhLF-QJ8D1Br6c5ShBkyJTh7ODeMBiNEPBEGo9uyrkGWqt5yrrEAHTHQQ3R4tgotefh0kIFUUHNrleo3_fvf8J2qZ7InDAYHhAz0k1zUztCxbT4ysMauLmTxBAKUtsMHp61e9Q73Bhy2g1D_fF30aSvDr9lUG7Oou8NaWo0UC6ajwpumXqHm4zUidLtGvSrvE4fejuSBBosx03i9gHim1otDAIMiHYXGG4dSlNnqEs"/>
                            <img alt="BTC" className="w-8 h-8 rounded-full border-2 border-background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB37J1LBy6eMZA_B7BA5JtwFuz_LetSKekLAKCNeFUOCDbdseazzK5BKTwV8yVKTz5oGzescAZ_0flLXHg9e2hlRHHaeBkbJ9Vy_B4oN8zRS1jPyx1awc0PaJgszP_x-AkrqHRO2MLbndncVmOQaDejYsM3bnle2yquYQ0I8wCKrWPsUwRqG-JHcC680rmmLIMMlA1Lblg21eqNWk5j6IbL9ZnDvrJ0JQin_I7aIeNwEmXWakuvdjWvV3glk1Dvr2m097icCDZ0Lxg"/>
                          </div>
                          <div>
                            <p className="font-bold text-on-surface">ETH / WBTC</p>
                            <p className="text-[10px] text-slate-500">0.3% Fee</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">$156.2M</td>
                      <td className="px-6 py-4 text-slate-300">$12.1M</td>
                      <td className="px-6 py-4">
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-bold">12.8%</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="opacity-0 group-hover:opacity-100 bg-surface-container-highest px-3 py-1 rounded-lg text-xs font-bold transition-opacity">Add</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors cursor-pointer group border-none">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            <img alt="SOL" className="w-8 h-8 rounded-full border-2 border-background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeVbB86HS0UkeQ08oPHilfXlXPwDQuPjjjppc5fRieHRa2vVClxRFWQKJWR_67Ik9rl7yIaHJY8NrbbdmOkcZ937lVuv-KgOztYeFqPwLukv95ZLJ9zAp5m4U_1tVPlKzKlj8XHdvATLZEn05J_KCSkbPWXjylwa3rjA-BfZrcsiADf947TPU2X0znf8zM2UI7dM8eeOeJMTUuQV1038Je9mkJmSbt2OFMIxO7ITnPbt6lyN2WNTkYQ-h2ry1nIw5RquOkJHHFmng"/>
                            <img alt="USDC" className="w-8 h-8 rounded-full border-2 border-background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASm8cetxvR5Z0A0caNKvqSLnm7rVTI8pC6catON1bXBqVutFkDZazukT2szP67RuQbT8s4zI4Jhh2Ya6pMtEfbxzRXl_zA5dhDe6g8Ay9iIc8AvPZ8eEd_3oQzfi4f5eENs-QYIjY4wKoklV0WyRzs76qC2i40hzf7fHuSGTGsut5zAyezaWSWnwQaQjeBriNWrZT27FkDmW189paK8d_4aN9HDRWmQVQY7vKcG3j7o-SotFTwdFWNxMb6e0NwixxUblZQhfjZ73w"/>
                          </div>
                          <div>
                            <p className="font-bold text-on-surface">SOL / USDC</p>
                            <p className="text-[10px] text-slate-500">0.01% Fee</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">$89.4M</td>
                      <td className="px-6 py-4 text-slate-300">$4.5M</td>
                      <td className="px-6 py-4">
                        <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded-full text-xs font-bold">45.2%</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="opacity-0 group-hover:opacity-100 bg-surface-container-highest px-3 py-1 rounded-lg text-xs font-bold transition-opacity">Add</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
          {/* Right: Hooks & My Liquidity (The Precision Stack) */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            {/* Uniswap v4 Hooks Module */}
            <div className="relative group rounded-3xl p-[1px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-secondary opacity-20"></div>
              <div className="relative glass-card rounded-[23px] p-6 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-primary" data-icon="auto_fix_high">auto_fix_high</span>
                  <h2 className="text-lg font-bold tracking-tight">Active Hooks</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-surface-container-lowest p-4 rounded-2xl border border-primary/10">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-lg" data-icon="monitoring">monitoring</span>
                        <span className="text-sm font-bold">Dynamic Fee Engine</span>
                      </div>
                      <span className="bg-secondary/20 text-secondary text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase">Verified</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">Adjusts pool fees based on 5min volatility windows. Currently optimized for $NEURONS volatility.</p>
                  </div>
                  <div className="bg-surface-container-lowest p-4 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-lg" data-icon="account_tree">account_tree</span>
                        <span className="text-sm font-bold">Oracle Guard</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">Cross-checks Chainlink price feeds before trade execution to prevent sandwich attacks.</p>
                  </div>
                  <div className="bg-surface-container-lowest p-4 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-indigo-400 text-lg" data-icon="polyline">polyline</span>
                        <span className="text-sm font-bold">Custom Curve V1</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">Implementing concentrated liquidity within specific bands for better capital efficiency.</p>
                  </div>
                </div>
                <button className="mt-6 w-full py-3 bg-surface-container-highest text-primary font-bold rounded-xl text-sm border border-primary/20 hover:bg-primary/5 transition-colors">
                  Browse Hooks Marketplace
                </button>
              </div>
            </div>
            {/* My Liquidity (Inset Style) */}
            <div className="glass-card rounded-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold tracking-tight">My Liquidity</h2>
                <button className="bg-surface-container-highest p-2 rounded-xl">
                  <span className="material-symbols-outlined text-sm" data-icon="add">add</span>
                </button>
              </div>
              <div className="space-y-4">
                {/* Position 1 */}
                <div className="p-4 bg-surface-container-lowest rounded-2xl border border-white/5 group hover:border-primary/20 transition-all cursor-pointer">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        <div className="w-5 h-5 rounded-full bg-secondary text-[8px] font-bold flex items-center justify-center text-on-secondary">N</div>
                        <img alt="USDT" className="w-5 h-5 rounded-full border border-background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4p9SE07dFyy-v8ul4cBdkWKrFag7r6vIzWF_1OocqoVrAKDJ_Qq4HxLLLNmzT193oJpNxVLa6ctfHHPZoGson7LmYLHi1pJoQebcjeeU0WBGKBUkSleWQ-0Txb4mkQVhmhsva1vwnD-OkKTBCE6lGrDZJIfakw41BjaPNpneE2V0J0P7SmAG1P-ksbbI-7hge89qEdUEJoD8XFLiGEA5JhoJTcw_L-ozc-i6WfONFfiGb6Aq0UB_1sMnaRbL0qoB_rf2tvQLzSss"/>
                      </div>
                      <span className="text-xs font-bold">NEURONS / USDT</span>
                    </div>
                    <span className="bg-secondary/10 text-secondary text-[10px] px-2 py-0.5 rounded-full font-bold">Active</span>
                  </div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Value</span>
                    <span className="text-on-surface font-bold">$12,450.80</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full w-[75%] rounded-full"></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-slate-500">Fee Earned: <span className="text-secondary">$142.40</span></span>
                    <span className="text-[10px] text-slate-400">In-range</span>
                  </div>
                </div>
                {/* Position 2 */}
                <div className="p-4 bg-surface-container-lowest rounded-2xl border border-white/5 group hover:border-primary/20 transition-all cursor-pointer">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        <img alt="ETH" className="w-5 h-5 rounded-full border border-background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiGkWAxxnjuKOHaQHDQTCHyVGMEaONOdaB-IhLF-QJ8D1Br6c5ShBkyJTh7ODeMBiNEPBEGo9uyrkGWqt5yrrEAHTHQQ3R4tgotefh0kIFUUHNrleo3_fvf8J2qZ7InDAYHhAz0k1zUztCxbT4ysMauLmTxBAKUtsMHp61e9Q73Bhy2g1D_fF30aSvDr9lUG7Oou8NaWo0UC6ajwpumXqHm4zUidLtGvSrvE4fejuSBBosx03i9gHim1otDAIMiHYXGG4dSlNnqEs"/>
                        <img alt="BTC" className="w-5 h-5 rounded-full border border-background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB37J1LBy6eMZA_B7BA5JtwFuz_LetSKekLAKCNeFUOCDbdseazzK5BKTwV8yVKTz5oGzescAZ_0flLXHg9e2hlRHHaeBkbJ9Vy_B4oN8zRS1jPyx1awc0PaJgszP_x-AkrqHRO2MLbndncVmOQaDejYsM3bnle2yquYQ0I8wCKrWPsUwRqG-JHcC680rmmLIMMlA1Lblg21eqNWk5j6IbL9ZnDvrJ0JQin_I7aIeNwEmXWakuvdjWvV3glk1Dvr2m097icCDZ0Lxg"/>
                      </div>
                      <span className="text-xs font-bold">ETH / WBTC</span>
                    </div>
                    <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">Pending</span>
                  </div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Value</span>
                    <span className="text-on-surface font-bold">$3,102.15</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[40%] rounded-full"></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-slate-500">Fee Earned: <span className="text-primary">$12.90</span></span>
                    <span className="text-[10px] text-slate-400">Concentrating...</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Total Equity</p>
                  <p className="text-xl font-bold tracking-tight">$15,552.95</p>
                </div>
                <span className="material-symbols-outlined text-slate-500 hover:text-primary cursor-pointer" data-icon="open_in_full">open_in_full</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Bottom Navigation (Mobile Only) */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0b1326]/90 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex justify-around items-center">
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" data-icon="swap_horiz" data-weight="fill">swap_horiz</span>
          <span className="text-[10px] font-bold">Swap</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-500">
          <span className="material-symbols-outlined" data-icon="layers">layers</span>
          <span className="text-[10px] font-bold">Pools</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-500">
          <span className="material-symbols-outlined" data-icon="auto_fix_high">auto_fix_high</span>
          <span className="text-[10px] font-bold">Hooks</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-500">
          <span className="material-symbols-outlined" data-icon="account_balance_wallet">account_balance_wallet</span>
          <span className="text-[10px] font-bold">Wallet</span>
        </button>
      </footer>
    </>
  );
};

export default Dex;
