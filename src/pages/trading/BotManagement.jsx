import React from 'react';

export default function BotManagement() {
  return (
    <>

<main className="flex-1 app-view-shell">   
<header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">

        <div>
          <span className="text-xs font-bold text-primary tracking-[0.2em] uppercase mb-2 block">Trading</span>
          <h1 className="text-4xl font-extrabold text-on-surface tracking-tighter">Overview</h1>
        </div>

<div className="flex gap-4">
<div className="bg-surface-container-low px-6 py-4 rounded-xl flex items-center gap-4 border-outline-variant/5">
<div className="text-right">
<p className="text-xs text-outline font-medium uppercase tracking-wider">Market Sentiment</p>
<p className="text-lg font-bold text-secondary">Greed: 72</p>
</div>
<div className="w-12 h-12 rounded-full border-4 border-surface-container-highest border-t-secondary rotate-45"></div>
</div>
</div>
</header>
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
<div className="bg-surface-container px-6 py-8 rounded-xl border-outline-variant/5 relative overflow-hidden group">
<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span className="material-symbols-outlined text-6xl">account_balance_wallet</span>
</div>
<p className="text-sm font-medium text-outline mb-4">Total P&amp;L (24h)</p>
<div className="flex items-baseline gap-2">
<span className="text-3xl font-bold text-white tracking-tight">+$1,420.55</span>
<span className="text-sm font-semibold text-secondary">+4.2%</span>
</div>
</div>
<div className="bg-surface-container px-6 py-8 rounded-xl border-outline-variant/5 relative overflow-hidden group">
<p className="text-sm font-medium text-outline mb-4">Total ROI</p>
<div className="flex items-baseline gap-2">
<span className="text-3xl font-bold text-white tracking-tight">+148.3%</span>
<span className="text-sm font-semibold text-primary">All Time</span>
</div>
</div>
<div className="bg-surface-container px-6 py-8 rounded-xl border-outline-variant/5 relative overflow-hidden group">
<p className="text-sm font-medium text-outline mb-4">Active Bots</p>
<div className="flex items-baseline gap-2">
<span className="text-3xl font-bold text-white tracking-tight">08</span>
<span className="text-sm font-semibold text-outline">/ 12 Slots</span>
</div>
</div>
<div className="bg-surface-container px-6 py-8 rounded-xl border-outline-variant/5 relative overflow-hidden group">
<p className="text-sm font-medium text-outline mb-4">Overall Win Rate</p>
<div className="flex items-baseline gap-2">
<span className="text-3xl font-bold text-white tracking-tight">68.4%</span>
<span className="text-sm font-semibold text-secondary">Optimal</span>
</div>
</div>
</section>
<section className="mb-12">
<div className="flex items-center justify-between mb-8">
<h2 className="text-2xl font-bold text-white">Active Strategies</h2>
<button className="text-primary text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all">View All Performance <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
</div>
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
<div className="bg-surface-container-high rounded-2xl p-6 border-outline-variant/10 glass-panel hover:bg-surface-container-highest transition-all group">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center border-primary">
<span className="material-symbols-outlined text-primary">psychology</span>
</div>
<div>
<h3 className="font-bold text-white text-lg">Morpheus Arbitrage</h3>
<div className="flex items-center gap-2 mt-1">
<span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#41e4b8]"></span>
<span className="text-[10px] uppercase tracking-wider text-secondary font-bold">Running</span>
</div>
</div>
</div>
<button className="text-[#908fa0] hover:text-white"><span className="material-symbols-outlined">more_vert</span></button>
</div>
<div className="grid grid-cols-2 gap-4 mb-6">
<div className="bg-surface-container-lowest p-3 rounded-xl">
<p className="text-[10px] text-outline uppercase tracking-wider mb-1">24h P&amp;L</p>
<p className="text-lg font-bold text-secondary">+$422.10</p>
</div>
<div className="bg-surface-container-lowest p-3 rounded-xl">
<p className="text-[10px] text-outline uppercase tracking-wider mb-1">Win Rate</p>
<p className="text-lg font-bold text-white">74.2%</p>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-xs text-outline px-1">
<span>ROI Progress</span>
<span className="text-white font-bold">+18.4%</span>
</div>
<div className="h-1.5 w-full bg-surface-container-lowest rounded-full overflow-hidden">
<div className="h-full bg-progress-bar rounded-full" style={{ width: '65%' }}></div>
</div>
</div>
</div>
<div className="bg-surface-container-high rounded-2xl p-6 border-outline-variant/10 glass-panel hover:bg-surface-container-highest transition-all group">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center border-secondary/20">
<span className="material-symbols-outlined text-secondary">bolt</span>
</div>
<div>
<h3 className="font-bold text-white text-lg">Agent Smith Scalper</h3>
<div className="flex items-center gap-2 mt-1">
<span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#41e4b8]"></span>
<span className="text-[10px] uppercase tracking-wider text-secondary font-bold">Running</span>
</div>
</div>
</div>
<button className="text-[#908fa0] hover:text-white"><span className="material-symbols-outlined">more_vert</span></button>
</div>
<div className="grid grid-cols-2 gap-4 mb-6">
<div className="bg-surface-container-lowest p-3 rounded-xl">
<p className="text-[10px] text-outline uppercase tracking-wider mb-1">24h P&amp;L</p>
<p className="text-lg font-bold text-secondary">+$189.50</p>
</div>
<div className="bg-surface-container-lowest p-3 rounded-xl">
<p className="text-[10px] text-outline uppercase tracking-wider mb-1">Win Rate</p>
<p className="text-lg font-bold text-white">62.8%</p>
</div>
</div>
<div className="h-16 flex items-end gap-1 mb-2">
<div className="flex-1 bg-secondary/20 rounded-t-sm h-[40%]"></div>
<div className="flex-1 bg-secondary/20 rounded-t-sm h-[60%]"></div>
<div className="flex-1 bg-secondary/20 rounded-t-sm h-[45%]"></div>
<div className="flex-1 bg-secondary/50 rounded-t-sm h-[80%] glow-secondary"></div>
<div className="flex-1 bg-secondary/30 rounded-t-sm h-[55%]"></div>
<div className="flex-1 bg-secondary/20 rounded-t-sm h-[70%]"></div>
<div className="flex-1 bg-secondary/60 rounded-t-sm h-[90%] glow-secondary"></div>
</div>
</div>
<div className="bg-surface-container-high rounded-2xl p-6 border-outline-variant/10 glass-panel hover:bg-surface-container-highest transition-all group">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center border-tertiary/20">
<span className="material-symbols-outlined text-tertiary">trending_up</span>
</div>
<div>
<h3 className="font-bold text-white text-lg">Neuro Trend Follower</h3>
<div className="flex items-center gap-2 mt-1">
<span className="w-2 h-2 rounded-full bg-outline shadow-[0_0_8px_#908fa0]"></span>
<span className="text-[10px] uppercase tracking-wider text-outline font-bold">Paused</span>
</div>
</div>
</div>
<button className="text-[#908fa0] hover:text-white"><span className="material-symbols-outlined">more_vert</span></button>
</div>
<div className="grid grid-cols-2 gap-4 mb-6">
<div className="bg-surface-container-lowest p-3 rounded-xl">
<p className="text-[10px] text-outline uppercase tracking-wider mb-1">Total P&amp;L</p>
<p className="text-lg font-bold text-white">+$2,488.00</p>
</div>
<div className="bg-surface-container-lowest p-3 rounded-xl">
<p className="text-[10px] text-outline uppercase tracking-wider mb-1">Total ROI</p>
<p className="text-lg font-bold text-tertiary">+34.5%</p>
</div>
</div>
<div className="p-3 bg-surface-container-lowest/50 rounded-xl flex items-center justify-between border-outline-variant/5">
<span className="text-[10px] text-outline uppercase font-bold">Auto-Resume at</span>
<span className="text-xs font-mono text-primary">$3,240.00 ETH</span>
</div>
</div>
</div>
</section>
<section>
<div className="flex items-center gap-4 mb-8">
<h2 className="text-2xl font-bold text-white">Available Strategies</h2>
<div className="h-[1px] flex-1 bg-gradient-to-r from-outline-variant/20 to-transparent"></div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="bg-surface-container-low p-5 rounded-2xl border-outline-variant/5 flex items-center gap-6 hover:bg-surface-container transition-all cursor-pointer">
<img className="w-24 h-24 rounded-xl object-cover filter grayscale hover:grayscale-0 transition-all" data-alt="abstract digital connection network with neon nodes and glowing paths on a dark obsidian background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUElz2SFLFYY57JStT5LoF-hTLhEHe_1bd_1POTPnVZ2-eD7DOzi5PCslhRKxqTSSq3swDF7VzznEuFvaLVFrXFoFnlzkVksgqU4s-rAEiL7ReRdk-IYFp9wB7MId_AGzFcHuDylHy2IZg6DAivmwC0GtGMJYjh47SS1BA0tAuJrmBt_sgTBcmRaZuJiRzm-6ybrpn398rz5kFMjzYgKZe80ilI1UIihITHcxeeZCyxaHhQ7nmPMW28NPigwdYORu11RJd-ZS-lnU"/>
<div className="flex-1">
<div className="flex items-center justify-between mb-1">
<h4 className="font-bold text-white">Oracle Grid Master</h4>
<span className="px-2 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded uppercase tracking-wider">Low Risk</span>
</div>
<p className="text-xs text-outline mb-4 line-clamp-1">Optimized for sideways markets with tight volatility protection.</p>
<div className="flex gap-6">
<div>
<p className="text-[10px] text-outline font-bold uppercase">Backtested ROI</p>
<p className="text-sm font-bold text-white">12.5% / mo</p>
</div>
<div>
<p className="text-[10px] text-outline font-bold uppercase">Asset</p>
<p className="text-sm font-bold text-white">BTC/USDT</p>
</div>
</div>
</div>
<button className="bg-surface-container-highest p-3 rounded-full hover:bg-primary hover:text-on-primary transition-all">
<span className="material-symbols-outlined">add</span>
</button>
</div>
<div className="bg-surface-container-low p-5 rounded-2xl border-outline-variant/5 flex items-center gap-6 hover:bg-surface-container transition-all cursor-pointer">
<img className="w-24 h-24 rounded-xl object-cover filter grayscale hover:grayscale-0 transition-all" data-alt="vibrant abstract explosion of electric blue and violet energy waves in a deep cosmic void" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQzlo0zCY2g4umFJfrpYizz4Qq_lbM_aHooXv6ADTTqrUSF9HRpvONcFZGl1CB1y3EX5qVH-JLectV7ZTeBTesrdh3h3ADkgqAAdmxYCv5DNrkzwaGcqKAW8NVGGrSgdHQF_gcS1PtKet1u3yUV4KOJaz1x2XCV91aqxmg4INoLX1vaRALVVu5L6XCYAxAd8eGh5RZeY9TO8c6ZfrsVRTmIPkW3iyi8l9tL58UW7mKsIqLMG2OxfsAhnSZLH4-GyHi5Q5xnl-eNRU"/>
<div className="flex-1">
<div className="flex items-center justify-between mb-1">
<h4 className="font-bold text-white">Nebula Breakout</h4>
<span className="px-2 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded uppercase tracking-wider">High Risk</span>
</div>
<p className="text-xs text-outline mb-4 line-clamp-1">Aggressive momentum tracking for high-volatility altcoin pairings.</p>
<div className="flex gap-6">
<div>
<p className="text-[10px] text-outline font-bold uppercase">Backtested ROI</p>
<p className="text-sm font-bold text-white">42.8% / mo</p>
</div>
<div>
<p className="text-[10px] text-outline font-bold uppercase">Asset</p>
<p className="text-sm font-bold text-white">SOL/USDT</p>
</div>
</div>
</div>
<button className="bg-surface-container-highest p-3 rounded-full hover:bg-primary hover:text-on-primary transition-all">
<span className="material-symbols-outlined">add</span>
</button>
</div>
</div>
</section>
</main>

    </>
  );
}
