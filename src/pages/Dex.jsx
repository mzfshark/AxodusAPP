import React from 'react';

const Dex = () => {
  return (
    <>
      
{/*  Hero Section: Trading Dashboard  */}
<div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
{/*  Left: Swap & Chart (Editorial Centerpiece)  */}
<div className="xl:col-span-8 flex flex-col gap-6">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
{/*  Swap Card  */}
<div className="glass-card rounded-3xl p-6 flex flex-col">
<div className="flex justify-between items-center mb-6">
<h2 className="text-lg font-semibold tracking-tight">Swap</h2>
<div className="flex gap-2">
<span className="material-symbols-outlined text-primary cursor-pointer hover:rotate-180 transition-transform duration-500" data-icon="autorenew">autorenew</span>
</div>
</div>
<div className="space-y-2">
{/*  From Token  */}
<div className="bg-surface-container-lowest p-4 rounded-2xl border-white/5">
<div className="flex justify-between mb-2">
<span className="text-xs font-medium text-slate-500 uppercase tracking-wider">From</span>
<span className="text-xs text-slate-400">Balance: 14,250.00</span>
</div>
<div className="flex justify-between items-center">
<input className="bg-transparent border-none focus:ring-0 text-2xl font-bold p-0 w-full text-on-surface" placeholder="0" type="number" value="1000"/>
<button className="flex items-center gap-2 bg-surface-container-highest px-3 py-1.5 rounded-xl hover:bg-surface-bright transition-colors">
<div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-on-secondary">N</div>
<span className="font-bold text-sm">$NEURONS</span>
<span className="material-symbols-outlined text-sm" data-icon="expand_more">expand_more</span>
</button>
</div>
</div>
{/*  Swap Middle Icon  */}
<div className="flex justify-center -my-3 relative z-10">
<div className="w-10 h-10 bg-surface-container-highest rounded-xl border-4 border-[#0b1326] flex items-center justify-center text-primary cursor-pointer hover:scale-110 transition-transform shadow-xl">
<span className="material-symbols-outlined" data-icon="arrow_downward">arrow_downward</span>
</div>
</div>
{/*  To Token  */}
<div className="bg-surface-container-lowest p-4 rounded-2xl border-white/5">
<div className="flex justify-between mb-2">
<span className="text-xs font-medium text-slate-500 uppercase tracking-wider">To (Estimated)</span>
<span className="text-xs text-slate-400">Balance: 0.42</span>
</div>
<div className="flex justify-between items-center">
<input className="bg-transparent border-none focus:ring-0 text-2xl font-bold p-0 w-full text-on-surface opacity-80" placeholder="0" readonly="" type="number" value="1.24"/>
<button className="flex items-center gap-2 bg-surface-container-highest px-3 py-1.5 rounded-xl hover:bg-surface-bright transition-colors">
<img alt="ETH" className="w-6 h-6 rounded-full" data-alt="Stylized ethereum logo icon with high tech aesthetic and soft glow" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWEKPPCF0Qgl4Y5Pl8Tni0LT35AZhKQh5WM2bBuzAOwn7S1F-IvfgUgS6mFtwn9WAzJW4Z67s7u4U7FDZRMEn_yq74yCvzgCl0xtSGXpsUODLzflyNTWdn8Pku56_3yfbqFVNCzWwXQslcNZFs75VdJtpturU0s0iffT0NcM19AVC7hux1y3bO1pwSX49Cm4O1XB3OontZd2twDTd-vg6bbjN0qpzPrk_KONKVpXu4hw4zS6qTrRopQr4AnJZP2gsEWfMoyDSGNNo"/>
<span className="font-bold text-sm">ETH</span>
<span className="material-symbols-outlined text-sm" data-icon="expand_more">expand_more</span>
</button>
</div>
</div>
</div>
{/*  Price Impact & Details  */}
<div className="mt-6 space-y-3 px-1">
<div className="flex justify-between text-xs">
<span className="text-slate-400">Exchange Rate</span>
<span className="text-on-surface font-medium">1 ETH = 806.45 $NEURONS</span>
</div>
<div className="flex justify-between text-xs">
<span className="text-slate-400">Price Impact</span>
<span className="text-secondary font-medium">&lt;0.01%</span>
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
{/*  Mini Chart  */}
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
{/*  Visual representation of a sparkline chart  */}
<svg className="w-full h-full min-h-[180px]" preserveAspectRatio="none" viewBox="0 0 400 200">
<defs>
<linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#41e4b8" stopOpacity="0.2"></stop>
<stop offset="100%" stopColor="#41e4b8" stopOpacity="0"></stop>
</linearGradient>
</defs>
<path d="M0,150 Q40,140 80,160 T160,120 T240,80 T320,100 T400,40" fill="none" stroke="#41e4b8" strokeLinecap="round" strokeWidth="3"></path>
<path d="M0,150 Q40,140 80,160 T160,120 T240,80 T320,100 T400,40 L400,200 L0,200 Z" fill="url(#chartGradient)"></path>
{/*  Animated-like point  */}
<circle className="animate-pulse" cx="400" cy="40" fill="#41e4b8" r="4"></circle>
</svg>
{/*  Chart Overlay info  */}
<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/20 pointer-events-none">
<div className="bg-surface-bright px-3 py-1.5 rounded-lg border-white/10 shadow-2xl">
<p className="text-[10px] text-slate-400 font-bold uppercase">Volume 24h</p>
<p className="text-sm font-bold">$12.4M</p>
</div>
</div>
</div>
<div className="mt-4 grid grid-cols-3 gap-2">
<div className="text-center py-2 bg-surface-container-lowest rounded-xl border-white/5">
<p className="text-[10px] text-slate-500 font-bold uppercase">Low</p>
<p className="text-xs font-semibold">$3,210</p>
</div>
<div className="text-center py-2 bg-surface-container-lowest rounded-xl border-white/5">
<p className="text-[10px] text-slate-500 font-bold uppercase">High</p>
<p className="text-xs font-semibold">$3,580</p>
</div>
<div className="text-center py-2 bg-surface-container-lowest rounded-xl border-white/5">
<p className="text-[10px] text-slate-500 font-bold uppercase">MCap</p>
<p className="text-xs font-semibold">$4.2B</p>
</div>
</div>
</div>
</div>
{/*  Top Pools Section (Asymmetric Data Table)  */}
<section className="glass-card rounded-3xl overflow-hidden">
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
<img alt="USDT" className="w-8 h-8 rounded-full border-2 border-background" data-alt="Minimalist USDT icon with technical grid background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4p9SE07dFyy-v8ul4cBdkWKrFag7r6vIzWF_1OocqoVrAKDJ_Qq4HxLLLNmzT193oJpNxVLa6ctfHHPZoGson7LmYLHi1pJoQebcjeeU0WBGKBUkSleWQ-0Txb4mkQVhmhsva1vwnD-OkKTBCE6lGrDZJIfakw41BjaPNpneE2V0J0P7SmAG1P-ksbbI-7hge89qEdUEJoD8XFLiGEA5JhoJTcw_L-ozc-i6WfONFfiGb6Aq0UB_1sMnaRbL0qoB_rf2tvQLzSss"/>
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
<img alt="ETH" className="w-8 h-8 rounded-full border-2 border-background" data-alt="Ethereum logo with dark metallic finish and cyan highlights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiGkWAxxnjuKOHaQHDQTCHyVGMEaONOdaB-IhLF-QJ8D1Br6c5ShBkyJTh7ODeMBiNEPBEGo9uyrkGWqt5yrrEAHTHQQ3R4tgotefh0kIFUUHNrleo3_fvf8J2qZ7InDAYHhAz0k1zUztCxbT4ysMauLmTxBAKUtsMHp61e9Q73Bhy2g1D_fF30aSvDr9lUG7Oou8NaWo0UC6ajwpumXqHm4zUidLtGvSrvE4fejuSBBosx03i9gHim1otDAIMiHYXGG4dSlNnqEs"/>
<img alt="BTC" className="w-8 h-8 rounded-full border-2 border-background" data-alt="Bitcoin logo with gold accents on dark technical surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB37J1LBy6eMZA_B7BA5JtwFuz_LetSKekLAKCNeFUOCDbdseazzK5BKTwV8yVKTz5oGzescAZ_0flLXHg9e2hlRHHaeBkbJ9Vy_B4oN8zRS1jPyx1awc0PaJgszP_x-AkrqHRO2MLbndncVmOQaDejYsM3bnle2yquYQ0I8wCKrWPsUwRqG-JHcC680rmmLIMMlA1Lblg21eqNWk5j6IbL9ZnDvrJ0JQin_I7aIeNwEmXWakuvdjWvV3glk1Dvr2m097icCDZ0Lxg"/>
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
<img alt="SOL" className="w-8 h-8 rounded-full border-2 border-background" data-alt="Solana token icon with vibrant violet and teal gradients" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeVbB86HS0UkeQ08oPHilfXlXPwDQuPjjjppc5fRieHRa2vVClxRFWQKJWR_67Ik9rl7yIaHJY8NrbbdmOkcZ937lVuv-KgOztYeFqPwLukv95ZLJ9zAp5m4U_1tVPlKzKlj8XHdvATLZEn05J_KCSkbPWXjylwa3rjA-BfZrcsiADf947TPU2X0znf8zM2UI7dM8eeOeJMTUuQV1038Je9mkJmSbt2OFMIxO7ITnPbt6lyN2WNTkYQ-h2ry1nIw5RquOkJHHFmng"/>
<img alt="USDC" className="w-8 h-8 rounded-full border-2 border-background" data-alt="USDC token icon with clean corporate aesthetic and high gloss" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASm8cetxvR5Z0A0caNKvqSLnm7rVTI8pC6catON1bXBqVutFkDZazukT2szP67RuQbT8s4zI4Jhh2Ya6pMtEfbxzRXl_zA5dhDe6g8Ay9iIc8AvPZ8eEd_3oQzfi4f5eENs-QYIjY4wKoklV0WyRzs76qC2i40hzf7fHuSGTGsut5zAyezaWSWnwQaQjeBriNWrZT27FkDmW189paK8d_4aN9HDRWmQVQY7vKcG3j7o-SotFTwdFWNxMb6e0NwixxUblZQhfjZ73w"/>
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
{/*  Right: Hooks & My Liquidity (The Precision Stack)  */}
<div className="xl:col-span-4 flex flex-col gap-6">
{/*  Uniswap v4 Hooks Module  */}
<div className="relative group rounded-3xl p-[1px] overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-secondary opacity-20"></div>
<div className="relative glass-card rounded-[23px] p-6 h-full">
<div className="flex items-center gap-2 mb-6">
<span className="material-symbols-outlined text-primary" data-icon="auto_fix_high">auto_fix_high</span>
<h2 className="text-lg font-bold tracking-tight">Active Hooks</h2>
</div>
<div className="space-y-4">
<div className="bg-surface-container-lowest p-4 rounded-2xl border-primary/10">
<div className="flex justify-between items-start mb-2">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-lg" data-icon="monitoring" data-weight="fill">monitoring</span>
<span className="text-sm font-bold">Dynamic Fee Engine</span>
</div>
<span className="bg-secondary/20 text-secondary text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase">Verified</span>
</div>
<p className="text-xs text-slate-400 leading-relaxed">Adjusts pool fees based on 5min volatility windows. Currently optimized for $NEURONS volatility.</p>
</div>
<div className="bg-surface-container-lowest p-4 rounded-2xl border-white/5">
<div className="flex justify-between items-start mb-2">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-lg" data-icon="account_tree">account_tree</span>
<span className="text-sm font-bold">Oracle Guard</span>
</div>
</div>
<p className="text-xs text-slate-400 leading-relaxed">Cross-checks Chainlink price feeds before trade execution to prevent sandwich attacks.</p>
</div>
<div className="bg-surface-container-lowest p-4 rounded-2xl border-white/5">
<div className="flex justify-between items-start mb-2">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-indigo-400 text-lg" data-icon="polyline">polyline</span>
<span className="text-sm font-bold">Custom Curve V1</span>
</div>
</div>
<p className="text-xs text-slate-400 leading-relaxed">Implementing concentrated liquidity within specific bands for better capital efficiency.</p>
</div>
</div>
<button className="mt-6 w-full py-3 bg-surface-container-highest text-primary font-bold rounded-xl text-sm border-primary/20 hover:bg-primary/5 transition-colors">
              Browse Hooks Marketplace
            </button>
</div>
</div>
{/*  My Liquidity (Inset Style)  */}
<div className="glass-card rounded-3xl p-6">
<div className="flex justify-between items-center mb-6">
<h2 className="text-lg font-bold tracking-tight">My Liquidity</h2>
<button className="bg-surface-container-highest p-2 rounded-xl">
<span className="material-symbols-outlined text-sm" data-icon="add">add</span>
</button>
</div>
<div className="space-y-4">
{/*  Position 1  */}
<div className="p-4 bg-surface-container-lowest rounded-2xl border-white/5 group hover:border-primary/20 transition-all cursor-pointer">
<div className="flex justify-between items-center mb-3">
<div className="flex items-center gap-2">
<div className="flex -space-x-1">
<div className="w-5 h-5 rounded-full bg-secondary text-[8px] font-bold flex items-center justify-center text-on-secondary">N</div>
<img alt="USDT" className="w-5 h-5 rounded-full border-background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7dP_cZUHJlUtYc2nJ24WueMtf5X1zerk2ylDT7rj4Ga7vxN8yunL3t7jrx3cpvCITmJaHJAsjuIBGNDznXPT4nQADjxqX9H_FWBaM6c4i1O8GmqAq2fa3sxIcl-p494H5wF2CCRxQaM2MRs-TE3Qk6CdRHSl3JlkjCzj2SLAVc8uj6564qBaKV0EjUVGm1jAzXztCqgWpV5LuMiC0ESFZwv6ldSDdIPQc94ilxG0MuRFXpymqRgwNXL8LX-u35JRo2hB64NAzFbc"/>
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
{/*  Position 2  */}
<div className="p-4 bg-surface-container-lowest rounded-2xl border-white/5 group hover:border-primary/20 transition-all cursor-pointer">
<div className="flex justify-between items-center mb-3">
<div className="flex items-center gap-2">
<div className="flex -space-x-1">
<img alt="ETH" className="w-5 h-5 rounded-full border-background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG_4Q6TamCM06y4SgudhgCJzLu0gleXyb4rePgzpYSlHiK_hmQ0n3M1pJOTXleFMv29KMpvdA8fadhSRq_PqmCcGwqW0HPjrEGIOZJwVq_JhDEa4kAWYPEEBgZRhsqjV4n2FY5lnCYVJp9pJmDJp3vU8GzYmxB0uzrT20HAdj3u5Jjkmadl29wDzRjWyFW5TC3uYlosTXa6ViIRdqobdkDC5cWg1PFWM9zUrYPZwY094r09j-yVyFkU03Qpgdd_xRFRgjAFF6DX1I"/>
<img alt="BTC" className="w-5 h-5 rounded-full border-background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgj8aFOlL6GX41g0eJJLoNIo-Z4arg7UKV1UnHSOt09PHroGAGcdE2pByr82jm9ODfmciDL2zCAVQWFVkrSKFx2oAHfwXy63EV5L_2u2Z0BqNwdfwtz8DQ62h1U4yfz3C27UVkihDnFb5UH9c9CsWbcoJXI0hZS-PAfEbKwzfnzAonS8YDtttOB1tQ8ISsA63dkuqhzmI5BfAn9zOqr1vEn0WkwRVIu-3Nbb-ONiRn9q97CU9zNjF9ItVemx2wa_DvmRiZu4T-ooQ"/>
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

    </>
  );
};

export default Dex;
