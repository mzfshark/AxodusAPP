import React from 'react';
import { lotteryMock } from '@/data/mock';

const Lottery = () => {
  return (
    <>
      
<div className="p-8 space-y-8 max-w-7xl mx-auto">
{/*  Hero Section: Super7 Jackpot  */}
<section className="relative overflow-hidden rounded-2xl bg-surface-container-low min-h-[400px] flex items-center ghost-border">
<div className="absolute inset-0 z-0">
<div className="absolute inset-0 bg-gradient-to-r from-surface-container-low via-surface-container-low/80 to-transparent z-10"></div>
<img className="w-full h-full object-cover" data-alt="Abstract 3D rendered neural network structure with glowing nodes and purple connections on a deep space background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNrfu-NRpbAU297igRIXJDv2sQPY4I54Ida48d5dodASr5T6bo6_-i-7B8EWHUtjGvbIJFywBYXy9uTbcl40yM92Lcm2UuF71z72aBvEwzMgsg5KFg7LthXxTcECOQJZWgP9tzi0gHmulb8DU_wzvW0EeCtvZdzz2wt4Evf2D8PDbdR4r3ZNpL0wmGgFz1rUUkXBxJ5eerVj27OnFgbkfYX4sXwlHyOADbA5usG4X5_KKI5B4oUrc5v11M_nuEfou_H1aTZ2hUssA"/>
</div>
<div className="relative z-20 px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
<div className="space-y-6">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest">
<span className="relative flex h-2 w-2">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
</span>
                            Live Draw Soon
                        </div>
<h1 className="text-6xl font-extrabold tracking-tighter text-white">Super7 Jackpot</h1>
<div className="flex items-baseline gap-3">
<span className="text-7xl font-black kinetic-gradient bg-clip-text text-transparent leading-none">8,420,000</span>
<span className="text-xl font-bold text-primary-fixed tracking-widest">$NEURONS</span>
</div>
<div className="flex gap-4 items-center pt-4">
<button disabled={!lotteryMock.draws[0].ticketMintingEnabled} className="kinetic-gradient text-on-primary px-8 py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-primary disabled:cursor-not-allowed disabled:opacity-50">Ticket minting disabled</button>
<div className="flex flex-col">
<span className="text-[10px] text-outline uppercase tracking-widest">Starts In</span>
<span className="text-2xl font-mono font-bold text-white tracking-tighter">04 : 12 : 55</span>
</div>
</div>
</div>
<div className="hidden md:flex flex-col justify-center items-end text-right">
<div className="glass-card p-6 rounded-2xl border-white/5 w-full max-w-xl">
<p className="text-sm text-[#908fa0] mb-4">Last Winning Combination</p>
<div className="flex gap-2">
<span className="w-10 h-10 rounded-full border-primary/30 flex items-center justify-center text-primary font-bold">07</span>
<span className="w-10 h-10 rounded-full border-primary/30 flex items-center justify-center text-primary font-bold">14</span>
<span className="w-10 h-10 rounded-full border-primary/30 flex items-center justify-center text-primary font-bold">22</span>
<span className="w-10 h-10 rounded-full border-primary/30 flex items-center justify-center text-primary font-bold">31</span>
<span className="w-10 h-10 rounded-full border-primary/30 flex items-center justify-center text-primary font-bold">45</span>
<span className="w-10 h-10 rounded-full border-primary/30 flex items-center justify-center text-primary font-bold">52</span>
<span className="w-10 h-10 rounded-full kinetic-gradient flex items-center justify-center text-on-primary font-bold">09</span>
</div>
<p className="mt-4 text-xs text-secondary">Total Payout: 1.2M $NEURONS</p>
</div>
</div>
</div>
</section>
{/*  Game Cards Grid  */}
<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
{/*  Super7 Card  */}
<div className="bg-surface-container-high rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden group">
<div className="absolute -right-16 -top-16 w-48 h-48 bg-primary rounded-full blur-3xl group-hover:bg-primary transition-all"></div>
<div className="flex justify-between items-start">
<div className="p-3 bg-surface-container-highest rounded-xl">
<span className="material-symbols-outlined text-primary text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
</div>
<span className="text-[10px] text-outline font-bold uppercase tracking-widest border-outline/20 px-2 py-1 rounded">Weekly</span>
</div>
<div>
<h3 className="text-2xl font-bold text-white mb-2">Super7</h3>
<p className="text-sm text-[#908fa0] leading-relaxed">High stakes weekly draw with massive multipliers and a guaranteed pool of 5M $NEURONS.</p>
</div>
<div className="mt-auto space-y-4">
<div className="flex justify-between items-center text-sm">
<span className="text-[#908fa0]">Entry Price</span>
<span className="text-white font-semibold">100 $NEURONS</span>
</div>
<button className="w-full bg-surface-container-highest hover:bg-surface-bright text-white py-3 rounded-xl font-bold transition-colors">Select Numbers</button>
</div>
</div>
{/*  EasyLotto Card  */}
<div className="bg-surface-container-high rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden group">
<div className="absolute -right-16 -top-16 w-48 h-48 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all"></div>
<div className="flex justify-between items-start">
<div className="p-3 bg-surface-container-highest rounded-xl">
<span className="material-symbols-outlined text-secondary text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>bolt</span>
</div>
<span className="text-[10px] text-secondary font-bold uppercase tracking-widest border-secondary/20 px-2 py-1 rounded">Every Hour</span>
</div>
<div>
<h3 className="text-2xl font-bold text-white mb-2">EasyLotto</h3>
<p className="text-sm text-[#908fa0] leading-relaxed">Fast-paced draws for quick wins. Perfect for casual players with low entry barriers.</p>
</div>
<div className="mt-auto space-y-4">
<div className="flex justify-between items-center text-sm">
<span className="text-[#908fa0]">Entry Price</span>
<span className="text-white font-semibold">5 $NEURONS</span>
</div>
<button className="w-full bg-surface-container-highest hover:bg-surface-bright text-white py-3 rounded-xl font-bold transition-colors">Quick Pick</button>
</div>
</div>
</div>
{/*  Recent Winners Ticker  */}
<div className="bg-surface-container-low rounded-2xl border-outline-variant/5 flex flex-col">
<div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
<h4 className="font-bold text-white flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-lg">emoji_events</span>
                            Latest Winners
                        </h4>
<span className="text-xs text-primary font-semibold">View All</span>
</div>
<div className="p-2 overflow-y-auto max-h-[340px] space-y-1">
{/*  Winner 1  */}
<div className="flex items-center gap-4 p-4 hover:bg-surface-container-highest/30 rounded-xl transition-colors">
<img alt="Winner Avatar" className="w-10 h-10 rounded-full bg-surface-container-highest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYjVMalRtquaeCrHIAFxoTWlL35EWn7I2FSuoceq_ZnnaSIe2dQTV_-7ETPJRKuLHEXSy7589zHxUwzv_DTWcdNZPgSmWmH1PaiGVSYMRKI23JSzQor-WLnZuNmpKpx7NPb6ecuwnsGrkFlz42DD94XDYwaEpGullTw-Uqm1vUs288OLxcLt9rIsVgOD7N-DX_4Z-Fvx-T-h_7WXLZ2z7qyCsmq5xd8mi7d5TOlbCW9HHBGbXUQsM06M0ht9uCraWjSYwZKI9zHcY"/>
<div className="flex-1">
<p className="text-xs font-mono text-[#908fa0]">0x72...e901</p>
<p className="text-sm font-bold text-white">Won 50,000 $NEURONS</p>
</div>
<span className="text-[10px] text-outline">2m ago</span>
</div>
{/*  Winner 2  */}
<div className="flex items-center gap-4 p-4 hover:bg-surface-container-highest/30 rounded-xl transition-colors">
<img alt="Winner Avatar" className="w-10 h-10 rounded-full bg-surface-container-highest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAocXx3fo_qBZwV5y1s1wKN0CpOnwrlNrEtlA_grggDM9vGsjFR_gleHW0O_oVdk5Bypp0L0ATJF3onk7irePxrRZfyoh3nFS8q_V7LgUzC8W6Q5Cu4mgp_n8ClDZMv12Ulx9Pb02E_g5UMBE86JByuwT2fxI1go-BteM_UpslqDYuCKJEB8JPnDPAfacQ5935qecq3j2GocWkVQopPAjOJxhTjsQ2BRpVvcXRCtVMTH0ZFOOaO-JQChFf5ggj4sBkNNwb6fUShd2Y"/>
<div className="flex-1">
<p className="text-xs font-mono text-[#908fa0]">0x31...f22b</p>
<p className="text-sm font-bold text-white">Won 12,400 $NEURONS</p>
</div>
<span className="text-[10px] text-outline">15m ago</span>
</div>
{/*  Winner 3  */}
<div className="flex items-center gap-4 p-4 hover:bg-surface-container-highest/30 rounded-xl transition-colors">
<img alt="Winner Avatar" className="w-10 h-10 rounded-full bg-surface-container-highest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmQZC8PeFF9PEw4O2ILFu1YdLNfbx8DDOFfeiIS2x1bz7IYDdKWMMe9YNrIUnYzQrJwUN0hRucn_pwJRftKPJ895k0QXMjz3uPE8UvpBYcGB9QyIFTkgLUzgOznwUfrDjhNFDQSGBxOSFYYJfzHZ45vEOUxzOLJKFQKRWiiswj-eun5brcQAVxsN4FQ3jpH5Lz5cDm5IpjnPwYz69YI-LOubV6WuW-mS6PkUN9TIQdbOIXodRBCu4L_N4mW0aNuiqLPSVz8HXAIdc"/>
<div className="flex-1">
<p className="text-xs font-mono text-[#908fa0]">0x99...a104</p>
<p className="text-sm font-bold text-white">Won 250,000 $NEURONS</p>
</div>
<span className="text-[10px] text-outline">1h ago</span>
</div>
{/*  Winner 4  */}
<div className="flex items-center gap-4 p-4 hover:bg-surface-container-highest/30 rounded-xl transition-colors">
<img alt="Winner Avatar" className="w-10 h-10 rounded-full bg-surface-container-highest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbBOOpKA3X4QLoefNEzaFUv9ApiLxF96V4IH6aBXo1n5hkFwBWR1oIS0vqjNk0vew3hUNYNGL9m4W_YxX-PJKWlUoSyF4xgcCK6Lg4hkrV6DkgcRH32nB095uvhTCTM2W4cNeOvtY3i4zy-ODlExqUPkIylMU8s0DAfIvxRDoRnTUTH8WyQpr2B6-7lgxvJ-trF2xbCEvL2SkM-A84ZX7czqO4PKPEuBCvTTml_HwO141sOmDdohmWt90YwD3MSuoihrlCqEy_2dg"/>
<div className="flex-1">
<p className="text-xs font-mono text-[#908fa0]">0xaa...88cc</p>
<p className="text-sm font-bold text-white">Won 2,100 $NEURONS</p>
</div>
<span className="text-[10px] text-outline">3h ago</span>
</div>
</div>
</div>
</section>
{/*  Ticket Management & Transparency  */}
<section className="grid grid-cols-1 md:grid-cols-4 gap-8">
{/*  User Tickets  */}
<div className="md:col-span-3 space-y-6">
<div className="flex justify-between items-end">
<h2 className="text-3xl font-bold tracking-tight text-white">Your Active Tickets</h2>
<div className="flex gap-2">
<button className="bg-surface-container-highest px-4 py-2 rounded-lg text-sm font-medium text-white">All Games</button>
<button className="px-4 py-2 rounded-lg text-sm font-medium text-[#908fa0] hover:text-white transition-colors">Winnings</button>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
{/*  Active Ticket Card  */}
<div className="p-6 rounded-2xl bg-[#060e20] border-l-4 border-primary ghost-border flex items-center justify-between">
<div className="space-y-1">
<p className="text-[10px] text-primary font-bold uppercase tracking-widest">Super7 Weekly</p>
<p className="text-lg font-bold text-white">#TXN-882104</p>
<div className="flex gap-1 mt-2">
<span className="w-6 h-6 rounded bg-surface-container-highest text-[10px] flex items-center justify-center text-white">04</span>
<span className="w-6 h-6 rounded bg-surface-container-highest text-[10px] flex items-center justify-center text-white">12</span>
<span className="w-6 h-6 rounded bg-surface-container-highest text-[10px] flex items-center justify-center text-white">29</span>
<span className="w-6 h-6 rounded bg-surface-container-highest text-[10px] flex items-center justify-center text-white">35</span>
<span className="w-6 h-6 rounded bg-surface-container-highest text-[10px] flex items-center justify-center text-white">40</span>
<span className="w-6 h-6 rounded bg-surface-container-highest text-[10px] flex items-center justify-center text-white">55</span>
<span className="w-6 h-6 rounded kinetic-gradient text-[10px] flex items-center justify-center text-on-primary font-bold">11</span>
</div>
</div>
<div className="text-right">
<p className="text-xs text-[#908fa0]">Draw in</p>
<p className="text-lg font-bold text-white font-mono">14:02:11</p>
</div>
</div>
{/*  EasyLotto Ticket  */}
<div className="p-6 rounded-2xl bg-[#060e20] border-l-4 border-secondary ghost-border flex items-center justify-between">
<div className="space-y-1">
<p className="text-[10px] text-secondary font-bold uppercase tracking-widest">EasyLotto Hourly</p>
<p className="text-lg font-bold text-white">#TXN-901122</p>
<div className="flex gap-1 mt-2">
<span className="w-6 h-6 rounded bg-surface-container-highest text-[10px] flex items-center justify-center text-white">08</span>
<span className="w-6 h-6 rounded bg-surface-container-highest text-[10px] flex items-center justify-center text-white">19</span>
<span className="w-6 h-6 rounded bg-surface-container-highest text-[10px] flex items-center justify-center text-white">33</span>
<span className="w-6 h-6 rounded kinetic-gradient text-[10px] flex items-center justify-center text-on-primary font-bold">04</span>
</div>
</div>
<div className="text-right">
<p className="text-xs text-[#908fa0]">Draw in</p>
<p className="text-lg font-bold text-white font-mono">00:44:05</p>
</div>
</div>
</div>
</div>
{/*  How it Works  */}
<div className="bg-surface-container-high rounded-2xl p-6 space-y-6">
<h4 className="text-lg font-bold text-white">Transparency</h4>
<div className="space-y-4">
<div className="flex gap-4">
<span className="material-symbols-outlined text-primary mt-1">verified_user</span>
<div>
<p className="text-sm font-bold text-white">Provably Fair</p>
<p className="text-xs text-[#908fa0]">Every draw is hashed and verifiable on-chain for 100% fairness.</p>
</div>
</div>
<div className="flex gap-4">
<span className="material-symbols-outlined text-secondary mt-1">account_balance_wallet</span>
<div>
<p className="text-sm font-bold text-white">Instant Payouts</p>
<p className="text-xs text-[#908fa0]">Winnings are automatically sent to your wallet immediately after the draw.</p>
</div>
</div>
<div className="flex gap-4">
<span className="material-symbols-outlined text-tertiary mt-1">token</span>
<div>
<p className="text-sm font-bold text-white">No Hidden Fees</p>
<p className="text-xs text-[#908fa0]">Transparent ticket costs. 98% of pool goes directly to winners.</p>
</div>
</div>
</div>
<div className="pt-4 border-t border-outline-variant/10">
<button className="w-full text-center text-xs font-bold text-primary uppercase tracking-widest hover:underline">Read Whitepaper</button>
</div>
</div>
</section>
</div>

    </>
  );
};

export default Lottery;
