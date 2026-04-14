import React from 'react';
import '../../styles/Global.css';

const Academy = () => {
  return (
    <>
      {/* TopNavBar Implementation */}
      <header className="flex justify-between items-center w-full px-6 h-16 sticky top-0 z-50 bg-[#0b1326] dark:bg-[#0b1326] border-b-0 tonal-shift bg-[#131b2e]">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tighter text-slate-50 dark:text-slate-50">Axodus Academy</span>
          <nav className="hidden md:flex gap-6">
            <a className="text-slate-400 font-medium hover:text-white hover:bg-white/5 transition-colors text-sm uppercase font-semibold" href="#">Market</a>
            <a className="text-slate-400 font-medium hover:text-white hover:bg-white/5 transition-colors text-sm uppercase font-semibold" href="#">Community</a>
          </nav>
        </div>
        {/* Central Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input className="w-full bg-surface-container-lowest border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary/20 transition-all" placeholder="Search courses, assets, or tutorials..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* $NEURONS Price Widget */}
          <div className="hidden xl:flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-full border border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">$NEURONS</span>
            <span className="text-sm font-semibold">$1.42</span>
            <span className="text-[10px] text-secondary font-medium">+4.2%</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            </button>
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <span className="material-symbols-outlined" data-icon="account_balance_wallet">account_balance_wallet</span>
            </button>
          </div>
          <button className="kinetic-gradient text-on-primary px-5 py-2 rounded-lg text-sm font-semibold active:scale-95 transition-transform duration-150">
            Connect Wallet
          </button>
        </div>
      </header>
      <div className="flex">
        {/* SideNavBar Implementation */}
        <aside className="fixed left-0 top-0 h-full flex flex-col z-40 border-r-0 bg-[#131b2e] dark:bg-[#131b2e] w-64 pt-16 transition-all">
          <div className="px-6 py-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container" style={{fontVariationSettings: "'FILL' 1"}}>school</span>
              </div>
              <div>
                <h3 className="text-slate-50 font-semibold text-sm">Learning Path</h3>
                <p className="text-xs text-slate-400">Master Web3 Ecosystems</p>
              </div>
            </div>
            <nav className="space-y-1">
              <p className="px-4 text-[10px] font-bold text-outline uppercase tracking-widest mb-2">Main</p>
              <a className="flex items-center gap-3 text-[#c0c1ff] bg-[#2d3449] font-semibold rounded-lg px-4 py-2 translate-x-1 transition-transform" href="#">
                <span className="material-symbols-outlined text-sm">school</span>
                <span className="text-sm">Courses</span>
              </a>
              <a className="flex items-center gap-3 text-slate-400 hover:text-slate-200 px-4 py-2 hover:bg-[#2d3449]/50 transition-all" href="#">
                <span className="material-symbols-outlined text-sm">local_library</span>
                <span className="text-sm">Library</span>
              </a>
              <a className="flex items-center gap-3 text-slate-400 hover:text-slate-200 px-4 py-2 hover:bg-[#2d3449]/50 transition-all" href="#">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span className="text-sm">Certifications</span>
              </a>
              <div className="pt-6 pb-2">
                <p className="px-4 text-[10px] font-bold text-outline uppercase tracking-widest mb-2">Categories</p>
              </div>
              <a className="flex items-center gap-3 text-slate-400 hover:text-slate-200 px-4 py-2 hover:bg-[#2d3449]/50 transition-all" href="#">
                <span className="material-symbols-outlined text-sm">hub</span>
                <span className="text-sm">Blockchain</span>
              </a>
              <a className="flex items-center gap-3 text-slate-400 hover:text-slate-200 px-4 py-2 hover:bg-[#2d3449]/50 transition-all" href="#">
                <span className="material-symbols-outlined text-sm">show_chart</span>
                <span className="text-sm">Trading</span>
              </a>
              <a className="flex items-center gap-3 text-slate-400 hover:text-slate-200 px-4 py-2 hover:bg-[#2d3449]/50 transition-all" href="#">
                <span className="material-symbols-outlined text-sm">account_balance</span>
                <span className="text-sm">DeFi</span>
              </a>
              <a className="flex items-center gap-3 text-slate-400 hover:text-slate-200 px-4 py-2 hover:bg-[#2d3449]/50 transition-all" href="#">
                <span className="material-symbols-outlined text-sm">security</span>
                <span className="text-sm">Security</span>
              </a>
            </nav>
          </div>
          <div className="mt-auto p-6 space-y-4">
            <div className="bg-surface-container-high rounded-xl p-4 border border-white/5">
              <p className="text-xs text-slate-400 mb-2">Ready for the next level?</p>
              <button className="w-full py-2 bg-surface-bright text-primary text-xs font-bold rounded-lg border border-primary/20 hover:bg-primary/10 transition-colors">
                Upgrade to Pro
              </button>
            </div>
            <a href="index.html" className="flex items-center gap-3 text-slate-400 hover:text-slate-200 px-4 py-2 hover:bg-[#2d3449]/50 transition-all">
              <span className="material-symbols-outlined text-sm">dashboard</span>
              <span className="text-sm">Dashboard</span>
            </a>
          </div>
        </aside>
        {/* Main Content Canvas */}
        <main className="flex-1 ml-64 min-h-screen p-8 bg-background">
          {/* Hero Banner Section */}
          <section className="relative h-72 rounded-3xl overflow-hidden mb-10 group">
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="abstract digital connection network with flowing glowing lines and deep purple background in high tech futuristic style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVZT6ukL8Y1qRhKKMhU48Ko5mYrFddoSmR8c5ryNgRZHsBoJ25zITGiQC25cXbhpHl7az1xBgfwHVlHWpZSVrxWce7RIGTdxOp5-QXpj9IC2bzjrrda-Zi3oHzmRfP2N_RdOqirvBF_T4Z2exuW7oWFfIyT30dHcJhr47pM5QBdFD9acf4NGGfZX9baa5HB0dLZfonZWMKv0SPYkAwixj7wdOxavMXjIkZEcW69Sa6WfJeJPx3uqyopneaoO72F-pyyJq4sMh860Q"/>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1326] via-[#0b1326]/60 to-transparent"></div>
            <div className="relative h-full flex flex-col justify-center px-12 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-widest mb-4 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                Featured Course
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-white mb-4">Master the Decentralized Future</h1>
              <p className="text-on-surface-variant mb-6 text-lg">A comprehensive guide to understanding blockchain architecture, smart contracts, and the new economy.</p>
              <div className="flex items-center gap-4">
                <button className="kinetic-gradient text-on-primary px-8 py-3 rounded-xl font-bold text-sm shadow-xl shadow-primary/10">Start Learning</button>
                <button className="glass-effect text-white px-8 py-3 rounded-xl font-bold text-sm border border-white/10">View Syllabus</button>
              </div>
            </div>
          </section>
          {/* Stats Grid (Editorial Layout) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-surface-container-low rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl">trending_up</span>
              </div>
              <p className="text-xs font-bold text-outline uppercase tracking-widest mb-1">Weekly Progress</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">74%</span>
                <span className="text-secondary text-xs font-medium">↑ 12%</span>
              </div>
              <div className="mt-4 w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-3/4 rounded-full"></div>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-2xl p-6 group">
              <p className="text-xs font-bold text-outline uppercase tracking-widest mb-1">Knowledge Points</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">12,480</span>
                <span className="text-primary text-xs font-medium">KP</span>
              </div>
              <div className="mt-4 flex items-center -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-low bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">BK</div>
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-low bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">DF</div>
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-low bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">SC</div>
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-low bg-primary text-on-primary flex items-center justify-center text-[10px] font-bold">+5</div>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-2xl p-6 group">
              <p className="text-xs font-bold text-outline uppercase tracking-widest mb-1">Active Certifications</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">03</span>
                <span className="text-tertiary text-xs font-medium">In Progress</span>
              </div>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">Nex-gen Smart Contract Auditor exam scheduled for Friday.</p>
            </div>
          </section>
          {/* Course Grid */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-white">Continue Learning</h2>
              <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Browse All <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Course Card 1 */}
              <div className="bg-surface-container-low rounded-2xl overflow-hidden ghost-border hover:bg-surface-container transition-all group cursor-pointer">
                <div className="h-40 relative">
                  <img className="w-full h-full object-cover" alt="glowing neon purple and blue 3d geometric shapes floating in dark space with professional studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1aiP6E_hh2er8G_z_g2qmA_-_sCSvcnBa4SVJ0lNkrro1NxHhc7d3d-fbgIFCc6GsGHFE8Bf_r8iWyGujoUCYTLudymHb9jVeQeNJStXy6Xvdyk_snuO3qA7-8zi3t5vA96dCG2u5dGtnF_euHEiNanCx13LdCFcH5zfpDfBQfwA299UWmXMdV5K-nclJsRH2WFZrheyiCY4Sfa8WSsEQaFaeZGyLCwrjkDjTO-H7O15LS3UZhF2osaea4qTtlMD3JPNo5Rr1vio"/>
                  <div className="absolute top-3 left-3 px-2 py-1 bg-surface-container-highest/80 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase">Beginner</div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-semibold text-base group-hover:text-primary transition-colors">Intro to $NEURONS</h3>
                    <span className="material-symbols-outlined text-outline text-lg">more_vert</span>
                  </div>
                  <p className="text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">Understanding the tokenomics and utility of the Axodus ecosystem core asset.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-surface-container-highest"></div>
                      <span className="text-[10px] text-outline font-medium">Dr. Aris V.</span>
                    </div>
                    <span className="text-[10px] font-bold text-secondary">40% COMPLETED</span>
                  </div>
                </div>
              </div>
              {/* Course Card 2 */}
              <div className="bg-surface-container-low rounded-2xl overflow-hidden ghost-border hover:bg-surface-container transition-all group cursor-pointer">
                <div className="h-40 relative">
                  <img className="w-full h-full object-cover" alt="complex digital smart contract interface with lines of code glowing in blue and orange over dark texture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdpZ2UK7FphkpBQ0ileUeNgqcY3Qsz6MjVXZC7P4P6iAkK6P6h0sKkNIx0SJ2Kl9T2IIOuaqX7Sr-91rXuarVGlty-6iZN6hxo_sFmyONUN8gScVGhLP_jQBBvNPT1IurhI7xxfg-w6bQwU66x1w1Ggx4zMYJoDH1npAZGmeLnuMCph924TmjrEmJQ1TBTETqKHQse4JnOkLzRKNu_trI8nCie4iUhAP-cVP1VMUJcjfmwNTLmqcEbr8llkzCrFt-70Jh_3VKlyfg"/>
                  <div className="absolute top-3 left-3 px-2 py-1 bg-surface-container-highest/80 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase">Advanced</div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-semibold text-base group-hover:text-primary transition-colors">Smart Contract Auditing</h3>
                    <span className="material-symbols-outlined text-outline text-lg">more_vert</span>
                  </div>
                  <p className="text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">Professional security analysis of Solidity contracts and vulnerability identification.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-surface-container-highest"></div>
                      <span className="text-[10px] text-outline font-medium">Sarah Chen</span>
                    </div>
                    <span className="text-[10px] font-bold text-tertiary">NOT STARTED</span>
                  </div>
                </div>
              </div>
              {/* Course Card 3 */}
              <div className="bg-surface-container-low rounded-2xl overflow-hidden ghost-border hover:bg-surface-container transition-all group cursor-pointer">
                <div className="h-40 relative">
                  <img className="w-full h-full object-cover" alt="abstract visualization of liquid gold data streams flowing through a dark corridor with atmospheric light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRsuLLHbTm4lXma4TJ81Acd6e7GXcVzJO5xsu8z5HfIbfMzuwrTAyhoiMlQUPF98ge0EAL5wfQDCmQto36sdG1_4G1Kp4RnMrc7GasMShsYkshKwjiW7JSEw5Lrc7pePJb4lVBrBAXVx4F2fz6P_NmggkY21nMhLthfSnVlKFatNA8d_YvFcaCeaKaPjvP_R0M4hVti8weqt8nv0Db28zQAFAG8Qbz2KgVlAsZVcrLLEf3xYJYO5njV7aFcoN1enmkaPgAIJcnn9o"/>
                  <div className="absolute top-3 left-3 px-2 py-1 bg-surface-container-highest/80 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase">Intermediate</div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-semibold text-base group-hover:text-primary transition-colors">DeFi Yield Strategies</h3>
                    <span className="material-symbols-outlined text-outline text-lg">more_vert</span>
                  </div>
                  <p className="text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">Advanced liquidity provision and farming strategies across multiple chains.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-surface-container-highest"></div>
                      <span className="text-[10px] text-outline font-medium">Marcus Aurel</span>
                    </div>
                    <span className="text-[10px] font-bold text-secondary">15% COMPLETED</span>
                  </div>
                </div>
              </div>
              {/* Course Card 4 */}
              <div className="bg-surface-container-low rounded-2xl overflow-hidden ghost-border hover:bg-surface-container transition-all group cursor-pointer">
                <div className="h-40 relative">
                  <img className="w-full h-full object-cover" alt="high contrast digital security padlock symbol with circuit board patterns and neon green highlights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg80LVCZVidQ_9uasErmrdk6qIEAXeHKh8ChYK5bFYsw_h2aWozdU1-1EM9aiNnM1m9vp4iN7qvyTUPtZLL1syXWcAQhbobmy4eCvm8HKz6nESOOFbx_xW9m_7CsYEnXkG4ZM-MLZTR8il6w6N4jUyWQaDkJ-Wx9ZPPgM8ZnUCoJaXejR9A_1o8JoN7srBjtcLAgW3ImniyQE-MNxvUdZGGR1EoFQU1D056G29xkD7EQIqBnwQVMxd4H1T4lCd_T5OWmZuSVuGqe0"/>
                  <div className="absolute top-3 left-3 px-2 py-1 bg-surface-container-highest/80 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase">Pro</div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-semibold text-base group-hover:text-primary transition-colors">Cybersecurity Protocol</h3>
                    <span className="material-symbols-outlined text-outline text-lg">more_vert</span>
                  </div>
                  <p className="text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">Protecting digital assets from advanced persistent threats and phishing.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-surface-container-highest"></div>
                      <span className="text-[10px] text-outline font-medium">Leo Knight</span>
                    </div>
                    <span className="text-[10px] font-bold text-on-surface-variant">LOCKed</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      {/* FAB for Quick Learning */}
      <button className="fixed bottom-8 right-8 w-14 h-14 kinetic-gradient rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20 hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-on-primary text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
      </button>
    </>
  );
};

export default Academy;
