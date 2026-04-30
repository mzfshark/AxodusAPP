import React from 'react';

const Marketplace = () => {
  return (
    <>
      
{/*  Hero Featured Section  */}
<section className="relative h-[480px] rounded-3xl overflow-hidden mb-12 group">
<div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="abstract flowing liquid 3d shapes in deep purple and cyan colors with futuristic digital lighting and grainy texture" style={{"backgroundImage":"url('https"}}>
</div>
<div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent"></div>
<div className="relative h-full flex flex-col justify-center px-12 max-w-2xl">
<div className="flex items-center gap-2 mb-4">
<span className="px-3 py-1 bg-secondary/20 text-secondary text-[10px] font-black uppercase tracking-tighter rounded-full border border-secondary/30">Trending Now</span>
<span className="text-outline text-[10px] font-bold uppercase tracking-widest">End in: 04h 22m 10s</span>
</div>
<h1 className="text-6xl font-black text-on-surface tracking-tighter mb-4 leading-tight">
                        Neural <br/>Architect <span className="text-primary">X-1</span>
</h1>
<p className="text-on-surface-variant text-lg mb-8 font-light leading-relaxed">
                        A generative masterpiece utilizing the Axodus Kinetic engine. Own the first evolving AI structure in the ecosystem.
                    </p>
<div className="flex items-center gap-6">
<button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-10 py-4 rounded-xl text-lg font-extrabold active:scale-95 transition-transform flex items-center gap-2">
                            Place a Bid <span className="material-symbols-outlined">trending_up</span>
</button>
<div className="flex flex-col">
<span className="text-outline text-xs uppercase tracking-widest">Current Bid</span>
<span className="text-2xl font-black text-secondary">4,200 $NEURONS</span>
<span className="text-sm text-outline/60">$12,450.00 USD</span>
</div>
</div>
</div>
{/*  Floating Data Card  */}
<div className="absolute bottom-8 right-8 glass-panel p-6 rounded-2xl border border-outline-variant/20 hidden lg:block">
<div className="flex items-center gap-4 mb-4">
<img alt="Creator" className="w-12 h-12 rounded-full border-2 border-primary" data-alt="professional portrait of a digital artist with cool blue lighting and tech accessories" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi0JXBBF9Y0Twat9Ugen55xhQFG4va-1ZGR_4HWKr-BMxfb0dpuV4kRqRwuPDNo5V4prnS6t7TkwG3oIQLG6naqDs-uPnzkgelIo5CHjURTp61oboyBsSNYkg6_hQtv9HJuq6dxBkyv-ep-2mjRjgSXU3L6dR_Pkx1475Lx4qjck3eyxQP__4O3NfQeR6kxC0fSNggoKH1pXsHvjb9R9CzbfdOzTdsGiDb1St4O7xA6RoCsBOXktcJi4qpRzOMi9rrqzWlZxO7O-I"/>
<div>
<p className="text-[10px] text-outline uppercase tracking-widest">Artist</p>
<p className="font-bold">@NeuroSynth</p>
</div>
</div>
<div className="space-y-3">
<div className="flex justify-between gap-12">
<span className="text-outline text-xs">Chain</span>
<span className="text-on-surface text-xs font-bold">Axodus Mainnet</span>
</div>
<div className="flex justify-between">
<span className="text-outline text-xs">Rarity</span>
<span className="text-secondary text-xs font-bold">Mythic</span>
</div>
</div>
</div>
</section>
{/*  Categorized Grid  */}
<div className="space-y-16 mb-10">
{/*  NFTs Section  */}
<section>
<div className="flex items-center justify-between mb-8">
<div>
<h2 className="text-3xl font-black tracking-tighter">Digital Collectibles</h2>
<p className="text-outline text-sm">Curated visual assets and kinetic art.</p>
</div>
<a className="text-primary font-bold hover:underline flex items-center gap-2" href="#">
                            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
{/*  Card 1  */}
<div className="bg-surface-container-low rounded-2xl overflow-hidden group border border-outline-variant/10 hover:border-primary/30 transition-all duration-300">
<div className="relative h-64">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="vibrant 3d abstract shape with chrome textures and neon orange glowing edges on a dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDepEUlHo7rJ9elNvDJcpUaQhUg4IHTYGRf_dWRVyFf4ok2d8LKvuzeTWhJ0hKepOQKpoiMDbvPIqMOxO5l7ExvFbVnQrb_6oQLJ1PriS5LpaNAymup-KQhnxSQFlDTknDyWKpv7d2YPXyRRfzrzmVtBLh1WOF76g5E11WMBEA0HPTVtA1c3d5i0GnWVkyp7zby9DHi1m2oGGeZ36xT7naC_TkqNnctlVeWSgeo_YSmaZ5rEK1Jzi0RCgF17GvC2I9IUogYVPQiN58"/>
<div className="absolute top-4 right-4 bg-surface-container-highest/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-secondary">RARE</div>
</div>
<div className="p-5">
<h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Void Shard #02</h3>
<p className="text-outline text-xs mb-4">By CyberRelic</p>
<div className="flex items-end justify-between">
<div>
<p className="text-[10px] text-outline uppercase tracking-widest">Price</p>
<p className="font-black text-on-surface">120 $N <span className="text-[10px] text-outline font-normal ml-1">($450)</span></p>
</div>
<button className="bg-surface-container-highest hover:bg-primary hover:text-on-primary p-2 rounded-xl transition-all active:scale-90">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>shopping_bag</span>
</button>
</div>
</div>
</div>
{/*  Card 2  */}
<div className="bg-surface-container-low rounded-2xl overflow-hidden group border border-outline-variant/10 hover:border-primary/30 transition-all duration-300">
<div className="relative h-64">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="cyberpunk character portrait with neon pink light reflections and futuristic eyewear in soft focus" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeXybBTEotOskrSrvA3QHdJKNrN8-7EsQ4eDRoVGfjTThCDKXaDZ1h56222AJgX3zbLGuqe77-t6eVEzCtilc7_LuvAZOnTuRcdqPfYR5PZcuB_aKjUnUvfblTm-M0WRr4ovywUq7jgWvlNwlXgMz5ZLOtsHcDRiiuyK_8s2iaFKwGPuBeioAg0oIj26TpcRLmNt0dM2-JQbg8ySrVoYFEtGnvWtMTyUMHxBGHN7ZMppcGzNw-_Nc-cP9IjZ5cxRxMoRdyNHpig1g"/>
<div className="absolute top-4 right-4 bg-surface-container-highest/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-primary">LEGENDARY</div>
</div>
<div className="p-5">
<h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Neo Citizen G-14</h3>
<p className="text-outline text-xs mb-4">By AlphaDesign</p>
<div className="flex items-end justify-between">
<div>
<p className="text-[10px] text-outline uppercase tracking-widest">Price</p>
<p className="font-black text-on-surface">450 $N <span className="text-[10px] text-outline font-normal ml-1">($1,280)</span></p>
</div>
<button className="bg-surface-container-highest hover:bg-primary hover:text-on-primary p-2 rounded-xl transition-all active:scale-90">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>shopping_bag</span>
</button>
</div>
</div>
</div>
{/*  Card 3  */}
<div className="bg-surface-container-low rounded-2xl overflow-hidden group border border-outline-variant/10 hover:border-primary/30 transition-all duration-300">
<div className="relative h-64">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="minimalist geometric topography in deep navy and silver colors with sharp shadows and high contrast" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-c34m81HxKuKhwHJ_SFWAmQO7RZtUYEPCwWxwX-BZ51V5SlohmkV8ScwCtDj3GhOk2YsLfVm5N2t9mSk1el4J8OMNWdLkCvdPgP1AmEDqdG6frARCY8v26k9E422tnC46tVKKf285_ukWN_-519riK6B_WO3_0ikyS22D9FMNzojUho7AGHYSmUUIeTqxk9GCOcCe8zoGFFe7-3lYf8pZjXlro2NAuG5OSaVpPsHCcy9vn4agFXDpgQ0Dhbv1w7mIWYMCUNEi5Ho"/>
<div className="absolute top-4 right-4 bg-surface-container-highest/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-outline">COMMON</div>
</div>
<div className="p-5">
<h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Grid Horizon</h3>
<p className="text-outline text-xs mb-4">By Minimalist</p>
<div className="flex items-end justify-between">
<div>
<p className="text-[10px] text-outline uppercase tracking-widest">Price</p>
<p className="font-black text-on-surface">15 $N <span className="text-[10px] text-outline font-normal ml-1">($45)</span></p>
</div>
<button className="bg-surface-container-highest hover:bg-primary hover:text-on-primary p-2 rounded-xl transition-all active:scale-90">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>shopping_bag</span>
</button>
</div>
</div>
</div>
{/*  Card 4  */}
<div className="bg-surface-container-low rounded-2xl overflow-hidden group border border-outline-variant/10 hover:border-primary/30 transition-all duration-300">
<div className="relative h-64">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="shimmering iridescent texture resembling digital oil spill with fluid motion and holographic highlights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAznZdq-RIv8rNm95fKBDpftqOXQ-cwUVpGNl0BuRB2askGYzPLKaPlJfIP9BpHkrDDkcb2xQVL9jYDRwtWeW5WxuFN6UvZn5k_Hay_NQ4ca8URzVZKnUlcg07vTawv9n-Gkvopm939W856hARy5kyr2dY0ePdZ-yWCRq29xWCHl72x56WMZWWkyrDgeNt7tQAofpSsHoMTy9BzZCGjQvDc9jXPZmC2utxdwzTstSCw_soEbZX4pOaBM5I5k02l69G9u-39yg0mZRs"/>
<div className="absolute top-4 right-4 bg-surface-container-highest/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-tertiary">EPIC</div>
</div>
<div className="p-5">
<h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Prism Pulse</h3>
<p className="text-outline text-xs mb-4">By LightStream</p>
<div className="flex items-end justify-between">
<div>
<p className="text-[10px] text-outline uppercase tracking-widest">Price</p>
<p className="font-black text-on-surface">85 $N <span className="text-[10px] text-outline font-normal ml-1">($290)</span></p>
</div>
<button className="bg-surface-container-highest hover:bg-primary hover:text-on-primary p-2 rounded-xl transition-all active:scale-90">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>shopping_bag</span>
</button>
</div>
</div>
</div>
</div>
</section>
{/*  Bento Grid for Courses & Games  */}
<section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
{/*  Premium Courses (2 columns)  */}
<div className="lg:col-span-2">
<div className="flex items-center justify-between mb-8">
<h2 className="text-3xl font-black tracking-tighter">Masterclasses</h2>
<div className="flex gap-2">
<button className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-outline"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
<button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/10 flex flex-col justify-between hover:bg-surface-container-high transition-colors">
<div>
<span className="text-primary text-[10px] font-bold uppercase tracking-widest">Education</span>
<h3 className="text-2xl font-bold mt-2 mb-4 leading-tight">DeFi Architecture: <br/>The Complete Guide</h3>
<div className="flex items-center gap-3 mb-6">
<img alt="instructor" className="w-8 h-8 rounded-full" data-alt="professional photo of a male educator with neutral lighting and a blurred studio background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUDBI2q1PGJetCOLmDfu_Hy9lGYwZyrYMClxinLJw53HQwKFE1IL18GEbNkgGGpQqUw7_EN3puXHyZr8rBrMWal9TSIzK-6ocg6DUgAmQNA7FEv7748itFcARDXwLQbbkbzmJJARSxMGeip3CEQ3Ufbmp53--W03zoNd_xj1tHp0XnS8nVbTJowSx8REV2jkUIIkbC4iLkTd4iX8dOffsXp5lfFTpb4IQnmARUzaS3CWL3UniLZGaUNKUniOcNhSYg8N0L2EtP4Zs"/>
<span className="text-sm text-on-surface-variant">Prof. Julian Vane</span>
</div>
</div>
<div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
<span className="text-2xl font-black text-secondary">50 $N</span>
<button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-xl text-sm font-bold">Enroll Now</button>
</div>
</div>
<div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/10 flex flex-col justify-between hover:bg-surface-container-high transition-colors">
<div>
<span className="text-primary text-[10px] font-bold uppercase tracking-widest">Creative</span>
<h3 className="text-2xl font-bold mt-2 mb-4 leading-tight">3D Motion Design <br/>for Blockchain</h3>
<div className="flex items-center gap-3 mb-6">
<img alt="instructor" className="w-8 h-8 rounded-full" data-alt="friendly headshot of a woman creative director with soft natural lighting and warm colors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlYeNrMYVLgfM_Jl8y2PvviKSeVSsBzdPDLH7UvrwGG9LEeUhKXnfhCbkF3p54yEtCsscrKCgLtWuB5S4F1yEnqp2tfoI8IS3ubGY7LrccpfjUz8Yw-5PYqN78VmITvpgDkjhzZ_-U_iNtKO-HSQ6EBLxDmM5kKR0eesniBe6G6THKFP7qJrXR_jReyolNjMoSw4-1bCSeFgKOSnYUZOAW5hnTwVidud4B05Drzlck-tVTmYPKnsI4pjSb_8KWD7NYQNbIL3AzGdQ"/>
<span className="text-sm text-on-surface-variant">Sara Kinetic</span>
</div>
</div>
<div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
<span className="text-2xl font-black text-secondary">75 $N</span>
<button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-xl text-sm font-bold">Enroll Now</button>
</div>
</div>
</div>
</div>
{/*  Games Sidebar (1 column)  */}
<div className="lg:col-span-1">
<h2 className="text-3xl font-black tracking-tighter mb-8">Top Subscriptions</h2>
<div className="space-y-4">
<div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/10 hover:border-primary/20 transition-all flex items-center gap-4">
<div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
<span className="material-symbols-outlined text-white text-3xl">terminal</span>
</div>
<div className="flex-1">
<h4 className="font-bold">Axodus Dev Pro</h4>
<p className="text-outline text-xs">Monthly access to SDKs</p>
</div>
<div className="text-right">
<p className="font-bold text-secondary">25 $N</p>
<p className="text-[10px] text-outline">/mo</p>
</div>
</div>
<div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/10 hover:border-primary/20 transition-all flex items-center gap-4">
<div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
<span className="material-symbols-outlined text-white text-3xl">insights</span>
</div>
<div className="flex-1">
<h4 className="font-bold">Market Alpha</h4>
<p className="text-outline text-xs">Real-time whale alerts</p>
</div>
<div className="text-right">
<p className="font-bold text-secondary">40 $N</p>
<p className="text-[10px] text-outline">/mo</p>
</div>
</div>
<div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/10 hover:border-primary/20 transition-all flex items-center gap-4">
<div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
<span className="material-symbols-outlined text-white text-3xl">security</span>
</div>
<div className="flex-1">
<h4 className="font-bold">Protocol Shield</h4>
<p className="text-outline text-xs">Smart contract audits</p>
</div>
<div className="text-right">
<p className="font-bold text-secondary">100 $N</p>
<p className="text-[10px] text-outline">/mo</p>
</div>
</div>
</div>
</div>
</section>
</div>
{/*  Footer Meta  */}
/* Removed footer component */

    </>
  );
};

export default Marketplace;
