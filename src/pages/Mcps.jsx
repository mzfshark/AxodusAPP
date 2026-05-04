import React from 'react';

const Mcps = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-background">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        
{/*  Page Header  */}
<div className="flex items-end gap-3 mb-6">
  <h1 className="text-3xl font-bold tracking-tight text-on-surface">MCP Servers</h1>
  <span className="text-sm font-label text-outline pb-1 uppercase tracking-widest">Monitoring</span>
</div>
{/*  Server Grid  */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
{/*  Morpheus Server  */}
<div className="bg-surface-container-low rounded-xl p-5 ghost-border group hover:bg-surface-container transition-all duration-300">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-3">
<div className="p-2 rounded-lg bg-secondary/10 text-secondary">
<span className="material-symbols-outlined">hub</span>
</div>
<div>
<h3 className="font-bold text-on-surface">Morpheus</h3>
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
<p className="text-lg font-bold text-on-surface">99.9%</p>
</div>
<div>
<p className="text-[10px] text-outline uppercase mb-1">Latency</p>
<p className="text-lg font-bold text-on-surface">12ms</p>
</div>
<div>
<p className="text-[10px] text-outline uppercase mb-1">Load</p>
<p className="text-lg font-bold text-on-surface">42%</p>
</div>
<div className="flex items-end justify-end">
<div className="h-8 w-20 flex items-end gap-0.5">
<div className="w-1 bg-secondary/20 h-2"></div>
<div className="w-1 bg-secondary/40 h-4"></div>
<div className="w-1 bg-secondary/30 h-3"></div>
<div className="w-1 bg-secondary h-6 shadow-[0_0_8px_#41e4b8]"></div>
<div className="w-1 bg-secondary/60 h-4"></div>
<div className="w-1 bg-secondary/80 h-5"></div>
</div>
</div>
</div>
<div className="flex gap-2">
<button className="flex-1 bg-surface-container-highest hover:bg-surface-bright text-xs font-bold py-2 rounded-lg transition-colors border-outline-variant/10">Restart</button>
<button className="px-3 bg-surface-container-highest hover:bg-error/20 hover:text-error text-xs font-bold py-2 rounded-lg transition-colors border-outline-variant/10">
<span className="material-symbols-outlined text-sm">stop</span>
</button>
</div>
</div>
{/*  Agent Smith Server  */}
<div className="bg-surface-container-low rounded-xl p-5 ghost-border group hover:bg-surface-container transition-all duration-300">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-3">
<div className="p-2 rounded-lg bg-secondary/10 text-secondary">
<span className="material-symbols-outlined">security</span>
</div>
<div>
<h3 className="font-bold text-on-surface">Agent Smith</h3>
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
<p className="text-lg font-bold text-on-surface">100%</p>
</div>
<div>
<p className="text-[10px] text-outline uppercase mb-1">Latency</p>
<p className="text-lg font-bold text-on-surface">8ms</p>
</div>
<div>
<p className="text-[10px] text-outline uppercase mb-1">Load</p>
<p className="text-lg font-bold text-on-surface">18%</p>
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
<button className="flex-1 bg-surface-container-highest hover:bg-surface-bright text-xs font-bold py-2 rounded-lg transition-colors border-outline-variant/10">Restart</button>
<button className="px-3 bg-surface-container-highest hover:bg-error/20 hover:text-error text-xs font-bold py-2 rounded-lg transition-colors border-outline-variant/10">
<span className="material-symbols-outlined text-sm">stop</span>
</button>
</div>
</div>
{/*  Trading Server  */}
<div className="bg-surface-container-low rounded-xl p-5 ghost-border group hover:bg-surface-container transition-all duration-300">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-3">
<div className="p-2 rounded-lg bg-tertiary/10 text-tertiary">
<span className="material-symbols-outlined">trending_up</span>
</div>
<div>
<h3 className="font-bold text-on-surface">Trading</h3>
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
<p className="text-lg font-bold text-on-surface">98.4%</p>
</div>
<div>
<p className="text-[10px] text-outline uppercase mb-1">Latency</p>
<p className="text-lg font-bold text-on-surface">45ms</p>
</div>
<div>
<p className="text-[10px] text-outline uppercase mb-1">Load</p>
<p className="text-lg font-bold text-on-surface">89%</p>
</div>
<div className="flex items-end justify-end">
<div className="h-8 w-20 flex items-end gap-0.5">
<div className="w-1 bg-tertiary/60 h-4"></div>
<div className="w-1 bg-tertiary/80 h-6"></div>
<div className="w-1 bg-tertiary h-8 shadow-[0_0_8px_#ffb783]"></div>
<div className="w-1 bg-tertiary/90 h-7"></div>
<div className="w-1 bg-tertiary/70 h-5"></div>
<div className="w-1 bg-tertiary/80 h-6"></div>
</div>
</div>
</div>
<div className="flex gap-2">
<button className="flex-1 bg-surface-container-highest hover:bg-surface-bright text-xs font-bold py-2 rounded-lg transition-colors border-outline-variant/10">Restart</button>
<button className="px-3 bg-surface-container-highest hover:bg-error/20 hover:text-error text-xs font-bold py-2 rounded-lg transition-colors border-outline-variant/10">
<span className="material-symbols-outlined text-sm">stop</span>
</button>
</div>
</div>
{/*  RedHat Server  */}
<div className="bg-surface-container-low rounded-xl p-5 ghost-border group hover:bg-surface-container transition-all duration-300">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-3">
<div className="p-2 rounded-lg bg-error/10 text-error">
<span className="material-symbols-outlined">terminal</span>
</div>
<div>
<h3 className="font-bold text-on-surface">RedHat</h3>
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
<p className="text-lg font-bold text-on-surface">0%</p>
</div>
<div>
<p className="text-[10px] text-outline uppercase mb-1">Latency</p>
<p className="text-lg font-bold text-on-surface">---</p>
</div>
<div>
<p className="text-[10px] text-outline uppercase mb-1">Load</p>
<p className="text-lg font-bold text-on-surface">0%</p>
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
{/*  Dashboard Bottom Section (Bento)  */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
{/*  Terminal Feed  */}
<div className="lg:col-span-2 bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col border-outline-variant/10">
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
<span className="text-primary animate-pulse">&gt;</span>
<span className="text-primary font-bold">System scanning... Ready for commands.</span>
</div>
</div>
<div className="p-2 bg-surface-container-low border-t border-outline-variant/10 flex items-center">
<span className="mono text-primary text-xs px-2">$</span>
<input className="bg-transparent border-none focus:ring-0 text-xs mono text-on-surface w-full p-1" placeholder="Enter command..." type="text"/>
</div>
</div>
{/*  Health Trends  */}
<div className="bg-surface-container-low rounded-xl p-6 border-outline-variant/10 flex flex-col justify-between">
<div>
<h3 className="text-lg font-bold text-white mb-6">Cluster Health</h3>
<div className="space-y-6">
{/*  CPU Usage  */}
<div>
<div className="flex justify-between items-center mb-2">
<span className="text-xs font-medium text-on-surface-variant">Global CPU Usage</span>
<span className="text-xs mono text-secondary">31.4%</span>
</div>
<div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-secondary w-[31%]" style={{"boxShadow":"0 0 10px rgba(65, 228, 184, 0.5)"}}></div>
</div>
<div className="mt-2 flex justify-between">
<span className="text-[9px] text-outline">24h MIN: 12%</span>
<span className="text-[9px] text-outline">24h MAX: 92%</span>
</div>
</div>
{/*  Memory Usage  */}
<div>
<div className="flex justify-between items-center mb-2">
<span className="text-xs font-medium text-on-surface-variant">Global RAM Allocation</span>
<span className="text-xs mono text-tertiary">78.2%</span>
</div>
<div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-tertiary w-[78%]" style={{"boxShadow":"0 0 10px rgba(255, 183, 131, 0.5)"}}></div>
</div>
<div className="mt-2 flex justify-between">
<span className="text-[9px] text-outline">TOTAL: 1.2TB</span>
<span className="text-[9px] text-outline">FREE: 260GB</span>
</div>
</div>
{/*  Network IO  */}
<div>
<div className="flex justify-between items-center mb-2">
<span className="text-xs font-medium text-on-surface-variant">Network Throughput</span>
<span className="text-xs mono text-primary">1.2 GB/s</span>
</div>
<div className="h-12 w-full flex items-end gap-1 overflow-hidden">
{/*  Simple Sparkline Representation  */}
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

     </div>
   </main>
 );
};


export default Mcps;
