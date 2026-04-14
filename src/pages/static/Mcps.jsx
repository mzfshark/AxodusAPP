import React from 'react';
import '../../styles/Global.css';

const Mcps = () => {
  return (
    <>
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-64 hidden lg:flex flex-col bg-[#0b1326] z-50 border-r border-outline-variant/10">
        <div className="flex flex-col p-4 gap-y-1 h-full">
          <div className="text-xl font-bold text-white mb-8 px-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>rocket_launch</span>
            Axodus
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-2">
            <a href="index.html" className="flex items-center gap-3 px-3 py-2 text-[#908fa0] hover:text-white hover:bg-[#131b2e] transition-all duration-300 font-['Inter'] text-sm font-medium">
              <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span> Overview
            </a>
            <a href="mining.html" className="flex items-center gap-3 px-3 py-2 text-[#908fa0] hover:text-white hover:bg-[#131b2e] transition-all duration-300 font-['Inter'] text-sm font-medium">
              <span className="material-symbols-outlined" data-icon="memory">memory</span> Mining
            </a>
            <a href="tradingbots.html" className="flex items-center gap-3 px-3 py-2 text-[#908fa0] hover:text-white hover:bg-[#131b2e] transition-all duration-300 font-['Inter'] text-sm font-medium">
              <span className="material-symbols-outlined" data-icon="show_chart">show_chart</span> Trading
            </a>
            <a href="defi.html" className="flex items-center gap-3 px-3 py-2 text-[#908fa0] hover:text-white hover:bg-[#131b2e] transition-all duration-300 font-['Inter'] text-sm font-medium">
              <span className="material-symbols-outlined" data-icon="account_balance_wallet">account_balance_wallet</span> Staking
            </a>
            <a href="dao.html" className="flex items-center gap-3 px-3 py-2 text-[#908fa0] hover:text-white hover:bg-[#131b2e] transition-all duration-300 font-['Inter'] text-sm font-medium">
              <span className="material-symbols-outlined" data-icon="account_balance">account_balance</span> DAOs
            </a>
            <a href="business.html" className="flex items-center gap-3 px-3 py-2 text-[#908fa0] hover:text-white hover:bg-[#131b2e] transition-all duration-300 font-['Inter'] text-sm font-medium">
              <span className="material-symbols-outlined" data-icon="business_center">business_center</span> Business
            </a>
            <a href="marketplace.html" className="flex items-center gap-3 px-3 py-2 text-[#908fa0] hover:text-white hover:bg-[#131b2e] transition-all duration-300 font-['Inter'] text-sm font-medium">
              <span className="material-symbols-outlined" data-icon="storefront">storefront</span> Marketplace
            </a>
            <a href="academy.html" className="flex items-center gap-3 px-3 py-2 text-[#908fa0] hover:text-white hover:bg-[#131b2e] transition-all duration-300 font-['Inter'] text-sm font-medium">
              <span className="material-symbols-outlined" data-icon="school">school</span> Academy
            </a>
            <a href="dex.html" className="flex items-center gap-3 px-3 py-2 text-[#908fa0] hover:text-white hover:bg-[#131b2e] transition-all duration-300 font-['Inter'] text-sm font-medium">
              <span className="material-symbols-outlined" data-icon="swap_horiz">swap_horiz</span> DEX
            </a>
            <a href="lottery.html" className="flex items-center gap-3 px-3 py-2 text-[#908fa0] hover:text-white hover:bg-[#131b2e] transition-all duration-300 font-['Inter'] text-sm font-medium">
              <span className="material-symbols-outlined" data-icon="confirmation_number">confirmation_number</span> Lottery
            </a>
            {/* Active Item */}
            <a href="mcps.html" className="flex items-center gap-3 px-3 py-2 bg-[#2d3449] text-[#c0c1ff] rounded-lg shadow-[0_0_15px_rgba(192,193,255,0.1)] font-['Inter'] text-sm font-medium translate-x-1">
              <span className="material-symbols-outlined" data-icon="dns" style={{fontVariationSettings: "'FILL' 1"}}>dns</span> MCP Servers
            </a>
          </nav>
          <div className="mt-auto pt-6 border-t border-outline-variant/10">
            <div className="flex items-center gap-3 px-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold overflow-hidden">
                <img alt="User Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj6FdWgOzXVmc22bFeW5Geq9fulNDLoV6FavPkCETRme3BVTnULpMtUx1gOu13Gszcty4FTzs_hmxGMgM3HxC5gnkYFWD95NwS5DKejiY0uN-6M-NHMNory9vLLANF9oLM1B9a6M6UvYxKQInHa_cLkyFHeSj73Ti7wWjvW7_7NlEuEzQk0yg7oVrnqtjfFtCgz9r2tTMd-g5WO6KTPQ0lsmqH3fg5iUWA34UPl3rXz80ElLCBe5j48MhV7LoHNRlY-2gUkMrRbIc"/>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Axodus</p>
                <p className="text-[10px] text-outline uppercase tracking-widest">Kinetic Observatory</p>
              </div>
            </div>
            <button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold py-2 rounded-md active:scale-95 transition-transform text-sm">
              Launch Terminal
            </button>
          </div>
        </div>
      </aside>
      {/* Main Content Area */}
      <div className="lg:ml-64 flex flex-col h-screen overflow-hidden">
        {/* TopAppBar */}
        <header className="bg-[#131b2e]/80 backdrop-blur-xl flex justify-between items-center h-16 px-6 w-full sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-black tracking-tighter text-[#c0c1ff] lg:hidden">Axodus</span>
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
              <input className="bg-surface-container-lowest border-none rounded-md pl-10 pr-4 py-1.5 text-sm w-64 focus:ring-1 focus:ring-primary/20 text-on-surface" placeholder="Search servers..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant/10">
              <span className="text-xs font-bold text-[#c0c1ff]">$NEURONS: $0.42</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-md text-outline hover:bg-[#2d3449] transition-colors duration-200">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 rounded-md text-outline hover:bg-[#2d3449] transition-colors duration-200">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
            <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold px-4 py-1.5 rounded-md text-sm active:scale-95 transition-transform hidden md:block">
              Connect Wallet
            </button>
          </div>
        </header>
        {/* Content Canvas */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar bg-background">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white mb-1">MCP Servers</h1>
              <p className="text-outline text-sm">Real-time monitoring and node orchestration for the Axodus Network.</p>
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-outline uppercase tracking-widest font-bold">Global Uptime</span>
                <span className="text-2xl font-black text-secondary">99.98%</span>
              </div>
            </div>
          </div>
          {/* Server Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Morpheus Server */}
            <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/10 group hover:bg-surface-container transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                    <span className="material-symbols-outlined">hub</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Morpheus</h3>
                    <span className="text-[10px] mono text-outline">ID: AX-001-MRP</span>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse"></span> Online
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-[10px] text-outline uppercase mb-1">Uptime</p>
                  <p className="text-lg font-bold text-white">99.9%</p>
                </div>
                <div>
                  <p className="text-[10px] text-outline uppercase mb-1">Latency</p>
                  <p className="text-lg font-bold text-white">12ms</p>
                </div>
                <div>
                  <p className="text-[10px] text-outline uppercase mb-1">Load</p>
                  <p className="text-lg font-bold text-white">42%</p>
                </div>
                <div className="flex items-end justify-end">
                  <div className="h-8 w-20 flex items-end gap-0.5">
                    <div className="w-1 bg-secondary/20 h-2"></div>
                    <div className="w-1 bg-secondary/40 h-4"></div>
                    <div className="w-1 bg-secondary/30 h-3"></div>
                    <div className="w-1 bg-secondary h-6" style={{boxShadow: '0 0 8px #41e4b8'}}></div>
                    <div className="w-1 bg-secondary/60 h-4"></div>
                    <div className="w-1 bg-secondary/80 h-5"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-surface-container-highest hover:bg-surface-bright text-xs font-bold py-2 rounded-lg transition-colors border border-outline-variant/10">Restart</button>
                <button className="px-3 bg-surface-container-highest hover:bg-error/20 hover:text-error text-xs font-bold py-2 rounded-lg transition-colors border border-outline-variant/10">
                  <span className="material-symbols-outlined text-sm">stop</span>
                </button>
              </div>
            </div>
            {/* Agent Smith Server */}
            <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/10 group hover:bg-surface-container transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                    <span className="material-symbols-outlined">security</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Agent Smith</h3>
                    <span className="text-[10px] mono text-outline">ID: AX-002-ASM</span>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse"></span> Online
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-[10px] text-outline uppercase mb-1">Uptime</p>
                  <p className="text-lg font-bold text-white">100%</p>
                </div>
                <div>
                  <p className="text-[10px] text-outline uppercase mb-1">Latency</p>
                  <p className="text-lg font-bold text-white">8ms</p>
                </div>
                <div>
                  <p className="text-[10px] text-outline uppercase mb-1">Load</p>
                  <p className="text-lg font-bold text-white">18%</p>
                </div>
                <div className="flex items-end justify-end">
                  <div className="h-8 w-20 flex items-end gap-0.5">
                    <div className="w-1 bg-secondary/20 h-1"></div>
                    <div className="w-1 bg-secondary/20 h-2"></div>
                    <div className="w-1 bg-secondary/30 h-1"></div>
                    <div className="w-1 bg-secondary/40 h-2"></div>
                    <div className="w-1 bg-secondary/30 h-1"></div>
                    <div className="w-1 bg-secondary/50 h-2"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-surface-container-highest hover:bg-surface-bright text-xs font-bold py-2 rounded-lg transition-colors border border-outline-variant/10">Restart</button>
                <button className="px-3 bg-surface-container-highest hover:bg-error/20 hover:text-error text-xs font-bold py-2 rounded-lg transition-colors border border-outline-variant/10">
                  <span className="material-symbols-outlined text-sm">stop</span>
                </button>
              </div>
            </div>
            {/* Trading Server */}
            <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/10 group hover:bg-surface-container transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-tertiary/10 text-tertiary">
                    <span className="material-symbols-outlined">trending_up</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Trading</h3>
                    <span className="text-[10px] mono text-outline">ID: AX-003-TRD</span>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-tertiary/20 text-tertiary text-[10px] font-bold uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-tertiary"></span> Warning
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-[10px] text-outline uppercase mb-1">Uptime</p>
                  <p className="text-lg font-bold text-white">98.4%</p>
                </div>
                <div>
                  <p className="text-[10px] text-outline uppercase mb-1">Latency</p>
                  <p className="text-lg font-bold text-white">45ms</p>
                </div>
                <div>
                  <p className="text-[10px] text-outline uppercase mb-1">Load</p>
                  <p className="text-lg font-bold text-white">89%</p>
                </div>
                <div className="flex items-end justify-end">
                  <div className="h-8 w-20 flex items-end gap-0.5">
                    <div className="w-1 bg-tertiary/60 h-4"></div>
                    <div className="w-1 bg-tertiary/80 h-6"></div>
                    <div className="w-1 bg-tertiary h-8" style={{boxShadow: '0 0 8px #ffb783'}}></div>
                    <div className="w-1 bg-tertiary/90 h-7"></div>
                    <div className="w-1 bg-tertiary/70 h-5"></div>
                    <div className="w-1 bg-tertiary/80 h-6"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-surface-container-highest hover:bg-surface-bright text-xs font-bold py-2 rounded-lg transition-colors border border-outline-variant/10">Restart</button>
                <button className="px-3 bg-surface-container-highest hover:bg-error/20 hover:text-error text-xs font-bold py-2 rounded-lg transition-colors border border-outline-variant/10">
                  <span className="material-symbols-outlined text-sm">stop</span>
                </button>
              </div>
            </div>
            {/* RedHat Server */}
            <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/10 group hover:bg-surface-container transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-error/10 text-error">
                    <span className="material-symbols-outlined">terminal</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">RedHat</h3>
                    <span className="text-[10px] mono text-outline">ID: AX-004-RHT</span>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-error/20 text-error text-[10px] font-bold uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-error"></span> Offline
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6 opacity-50">
                <div>
                  <p className="text-[10px] text-outline uppercase mb-1">Uptime</p>
                  <p className="text-lg font-bold text-white">0%</p>
                </div>
                <div>
                  <p className="text-[10px] text-outline uppercase mb-1">Latency</p>
                  <p className="text-lg font-bold text-white">---</p>
                </div>
                <div>
                  <p className="text-[10px] text-outline uppercase mb-1">Load</p>
                  <p className="text-lg font-bold text-white">0%</p>
                </div>
                <div className="flex items-end justify-end">
                  <div className="h-1 w-20 bg-outline-variant/20 rounded-full"></div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-on-primary hover:bg-primary-container text-xs font-bold py-2 rounded-lg transition-colors shadow-[0_0_15px_rgba(192,193,255,0.3)]">Start Server</button>
              </div>
            </div>
          </div>
          {/* Dashboard Bottom Section (Bento) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Terminal Feed */}
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col border border-outline-variant/10">
              <div className="bg-surface-container-low px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-outline">terminal</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Live System Logs</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-error/40"></span>
                  <span className="h-2 w-2 rounded-full bg-tertiary/40"></span>
                  <span className="h-2 w-2 rounded-full bg-secondary/40"></span>
                </div>
              </div>
              <div className="p-4 mono text-xs leading-relaxed h-80 overflow-y-auto custom-scrollbar bg-[#060e20]">
                <div className="flex gap-4 mb-2">
                  <span className="text-outline/40 whitespace-nowrap">[14:02:11]</span>
                  <span className="text-secondary">INFO</span>
                  <span className="text-on-surface-variant">Morpheus connection handshake established. Protocol v4.2.1</span>
                </div>
                <div className="flex gap-4 mb-2">
                  <span className="text-outline/40 whitespace-nowrap">[14:02:15]</span>
                  <span className="text-secondary">INFO</span>
                  <span className="text-on-surface-variant">Agent Smith: Synchronizing biometric identity database...</span>
                </div>
                <div className="flex gap-4 mb-2">
                  <span className="text-outline/40 whitespace-nowrap">[14:02:22]</span>
                  <span className="text-tertiary">WARN</span>
                  <span className="text-on-surface-variant">Trading: High memory pressure detected in sub-process [3391].</span>
                </div>
                <div className="flex gap-4 mb-2">
                  <span className="text-outline/40 whitespace-nowrap">[14:03:01]</span>
                  <span className="text-error">CRIT</span>
                  <span className="text-on-surface-variant">RedHat: Heartbeat lost. Attempting automated recovery...</span>
                </div>
                <div className="flex gap-4 mb-2">
                  <span className="text-outline/40 whitespace-nowrap">[14:03:05]</span>
                  <span className="text-error">FAIL</span>
                  <span className="text-on-surface-variant">RedHat: Recovery failed. Manual intervention required. Node ID AX-004-RHT.</span>
                </div>
                <div className="flex gap-4 mb-2">
                  <span className="text-outline/40 whitespace-nowrap">[14:04:12]</span>
                  <span className="text-secondary">INFO</span>
                  <span className="text-on-surface-variant">Security patch 'ECHO-7' applied to all active nodes.</span>
                </div>
                <div className="flex gap-4 mb-2">
                  <span className="text-outline/40 whitespace-nowrap">[14:04:45]</span>
                  <span className="text-secondary">INFO</span>
                  <span className="text-on-surface-variant">Optimizing network routing tables for low-latency cluster.</span>
                </div>
                <div className="flex gap-4 mb-1">
                  <span className="text-outline/40 whitespace-nowrap">[14:05:00]</span>
                  <span className="text-primary animate-pulse">{">"}</span>
                  <span className="text-primary font-bold">System scanning... Ready for commands.</span>
                </div>
              </div>
              <div className="p-2 bg-surface-container-low border-t border-outline-variant/10 flex items-center">
                <span className="mono text-primary text-xs px-2">$</span>
                <input className="bg-transparent border-none focus:ring-0 text-xs mono text-on-surface w-full p-1" placeholder="Enter command..." type="text"/>
              </div>
            </div>
            {/* Health Trends */}
            <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-6">Cluster Health</h3>
                <div className="space-y-6">
                  {/* CPU Usage */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-on-surface-variant">Global CPU Usage</span>
                      <span className="text-xs mono text-secondary">31.4%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-secondary w-[31%]" style={{boxShadow: "0 0 10px rgba(65, 228, 184, 0.5)"}}></div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span className="text-[9px] text-outline">24h MIN: 12%</span>
                      <span className="text-[9px] text-outline">24h MAX: 92%</span>
                    </div>
                  </div>
                  {/* Memory Usage */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-on-surface-variant">Global RAM Allocation</span>
                      <span className="text-xs mono text-tertiary">78.2%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary w-[78%]" style={{boxShadow: "0 0 10px rgba(255, 183, 131, 0.5)"}}></div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span className="text-[9px] text-outline">TOTAL: 1.2TB</span>
                      <span className="text-[9px] text-outline">FREE: 260GB</span>
                    </div>
                  </div>
                  {/* Network IO */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-on-surface-variant">Network Throughput</span>
                      <span className="text-xs mono text-primary">1.2 GB/s</span>
                    </div>
                    <div className="h-12 w-full flex items-end gap-1 overflow-hidden">
                      {/* Simple Sparkline Representation */}
                      <div className="flex-1 bg-primary/20 h-4 rounded-t-sm"></div>
                      <div className="flex-1 bg-primary/40 h-8 rounded-t-sm"></div>
                      <div className="flex-1 bg-primary/30 h-6 rounded-t-sm"></div>
                      <div className="flex-1 bg-primary/60 h-10 rounded-t-sm"></div>
                      <div className="flex-1 bg-primary h-12 rounded-t-sm shadow-[0_0_10px_#c0c1ff]"></div>
                      <div className="flex-1 bg-primary/80 h-10 rounded-t-sm"></div>
                      <div className="flex-1 bg-primary/40 h-6 rounded-t-sm"></div>
                      <div className="flex-1 bg-primary/20 h-4 rounded-t-sm"></div>
                      <div className="flex-1 bg-primary/30 h-5 rounded-t-sm"></div>
                      <div className="flex-1 bg-primary/50 h-8 rounded-t-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-outline-variant/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-outline">info</span>
                  <p className="text-[10px] text-outline leading-tight">Last full cluster synchronization completed at 14:00:00 UTC. No anomalies detected in Morpheus core.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Mcps;
