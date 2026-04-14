import React from 'react';
import '../../styles/Global.css';

const TradingBots = () => {
  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#0b1326] backdrop-blur-xl bg-opacity-60 bg-gradient-to-b from-[#131b2e] to-transparent flex justify-between items-center px-8 h-16 w-full font-['Inter'] tracking-tight">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold tracking-tighter text-[#c0c1ff]"><a href="index.html">Axodus</a></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <span className="text-[#c0c1ff] font-semibold border-b-2 border-[#c0c1ff] pb-1 cursor-pointer">Trading</span>
          <span className="text-[#908fa0] hover:text-white transition-colors duration-200 cursor-pointer">Mining</span>
          <span className="text-[#908fa0] hover:text-white transition-colors duration-200 cursor-pointer">Staking</span>
          <span className="text-[#908fa0] hover:text-white transition-colors duration-200 cursor-pointer">DAOs</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#908fa0] hover:text-white transition-colors cursor-pointer">notifications</span>
            <span className="material-symbols-outlined text-[#908fa0] hover:text-white transition-colors cursor-pointer">settings</span>
          </div>
          <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-5 py-2 rounded-xl text-sm font-semibold active:scale-95 transition-transform">Connect Wallet</button>
        </div>
      </nav>
      <aside className="h-screen w-64 fixed left-0 top-0 bg-[#131b2e] flex flex-col py-6 hidden lg:flex border-r border-outline-variant/10">
        <div className="px-6 mb-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
            <span className="material-symbols-outlined text-primary" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}}>rocket_launch</span>
          </div>
          <div>
            <p className="text-xl font-bold text-white leading-none">Axodus</p>
            <p className="text-[10px] text-outline uppercase tracking-widest mt-1">Kinetic Observatory</p>
          </div>
        </div>
        <div className="flex-1 space-y-1 px-4">
          <div className="flex items-center gap-3 text-[#908fa0] px-4 py-3 hover:bg-[#2d3449]/50 hover:translate-x-1 transition-all duration-300 rounded-lg cursor-pointer">
            <span className="material-symbols-outlined">precision_manufacturing</span>
            <a href="mining.html">
              <span className="font-['Inter'] text-sm font-medium">Mining</span>
            </a>
          </div>
          <div className="flex items-center gap-3 text-[#c0c1ff] bg-[#2d3449] px-4 py-3 rounded-r-full cursor-pointer">
            <span className="material-symbols-outlined">query_stats</span>
            <a href="tradingbots.html">
              <span className="font-['Inter'] text-sm font-medium">Trading</span>
            </a>
          </div>
          <div className="flex items-center gap-3 text-[#908fa0] px-4 py-3 hover:bg-[#2d3449]/50 hover:translate-x-1 transition-all duration-300 rounded-lg cursor-pointer">
            <span className="material-symbols-outlined">layers</span>
            <a href="defi.html">
              <span className="font-['Inter'] text-sm font-medium">Staking</span>
            </a>
          </div>
          <div className="flex items-center gap-3 text-[#908fa0] px-4 py-3 hover:bg-[#2d3449]/50 hover:translate-x-1 transition-all duration-300 rounded-lg cursor-pointer">
            <span className="material-symbols-outlined">account_balance</span>
            <a href="dao.html">
              <span className="font-['Inter'] text-sm font-medium">DAOs</span>
            </a>
          </div>
          <div className="flex items-center gap-3 text-[#908fa0] px-4 py-3 hover:bg-[#2d3449]/50 hover:translate-x-1 transition-all duration-300 rounded-lg cursor-pointer">
            <span className="material-symbols-outlined">business_center</span>
            <a href="business.html">
              <span className="font-['Inter'] text-sm font-medium">Business</span>
            </a>
          </div>
          <div className="flex items-center gap-3 text-[#908fa0] px-4 py-3 hover:bg-[#2d3449]/50 hover:translate-x-1 transition-all duration-300 rounded-lg cursor-pointer">
            <span className="material-symbols-outlined">storefront</span>
            <a href="marketplace.html">
              <span className="font-['Inter'] text-sm font-medium">Marketplace</span>
            </a>
          </div>
          <div className="flex items-center gap-3 text-[#908fa0] px-4 py-3 hover:bg-[#2d3449]/50 hover:translate-x-1 transition-all duration-300 rounded-lg cursor-pointer">
            <span className="material-symbols-outlined">school</span>
            <a href="academy.html">
              <span className="font-['Inter'] text-sm font-medium">Academy</span>
            </a>
          </div>
          <div className="flex items-center gap-3 text-[#908fa0] px-4 py-3 hover:bg-[#2d3449]/50 hover:translate-x-1 transition-all duration-300 rounded-lg cursor-pointer">
            <span className="material-symbols-outlined">dns</span>
            <a href="mcs.html">
              <span className="font-['Inter'] text-sm font-medium">MCP Servers</span>
            </a>
          </div>
        </div>
        <div className="px-4 mt-auto border-t border-outline-variant/10 pt-6">
          <button className="w-full bg-primary/10 text-primary border border-primary/20 py-3 rounded-xl font-semibold hover:bg-primary/20 transition-all mb-6">Launch Bot</button>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 text-[#908fa0] px-4 py-2 hover:bg-[#2d3449]/50 transition-all rounded-lg cursor-pointer">
              <span className="material-symbols-outlined text-sm">help</span>
              <span className="text-xs">Support</span>
            </div>
            <div className="flex items-center gap-3 text-[#908fa0] px-4 py-2 hover:bg-[#2d3449]/50 transition-all rounded-lg cursor-pointer">
              <span className="material-symbols-outlined text-sm">description</span>
              <span className="text-xs">Docs</span>
            </div>
          </div>
        </div>
      </aside>
      <main className="lg:ml-64 pt-24 px-8 pb-12 min-h-screen bg-background">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-label-md uppercase tracking-[0.2em] text-primary/70 font-semibold mb-2">Portfolio Overview</p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white">Trading Bots Dashboard</h1>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface-container-low px-6 py-4 rounded-xl flex items-center gap-4 border border-outline-variant/5">
              <div className="text-right">
                <p className="text-xs text-outline font-medium uppercase tracking-wider">Market Sentiment</p>
                <p className="text-lg font-bold text-secondary">Greed: 72</p>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-surface-container-highest border-t-secondary rotate-45"></div>
            </div>
          </div>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-surface-container px-6 py-8 rounded-xl border border-outline-variant/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl">account_balance_wallet</span>
            </div>
            <p className="text-sm font-medium text-outline mb-4">Total P&L (24h)</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white tracking-tight">+$1,420.55</span>
              <span className="text-sm font-semibold text-secondary">+4.2%</span>
            </div>
          </div>
          <div className="bg-surface-container px-6 py-8 rounded-xl border border-outline-variant/5 relative overflow-hidden group">
            <p className="text-sm font-medium text-outline mb-4">Total ROI</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white tracking-tight">+148.3%</span>
              <span className="text-sm font-semibold text-primary">All Time</span>
            </div>
          </div>
          <div className="bg-surface-container px-6 py-8 rounded-xl border border-outline-variant/5 relative overflow-hidden group">
            <p className="text-sm font-medium text-outline mb-4">Active Bots</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white tracking-tight">08</span>
              <span className="text-sm font-semibold text-outline">/ 12 Slots</span>
            </div>
          </div>
          <div className="bg-surface-container px-6 py-8 rounded-xl border border-outline-variant/5 relative overflow-hidden group">
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
            <div className="bg-surface-container-high rounded-2xl p-6 border border-outline-variant/10 glass-panel hover:bg-surface-container-highest transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
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
                  <p className="text-[10px] text-outline uppercase tracking-wider mb-1">24h P&L</p>
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
                  <div className="h-full bg-primary rounded-full" style={{width: "65%"}}></div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-high rounded-2xl p-6 border border-outline-variant/10 glass-panel hover:bg-surface-container-highest transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center border border-secondary/20">
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
                  <p className="text-[10px] text-outline uppercase tracking-wider mb-1">24h P&L</p>
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
            <div className="bg-surface-container-high rounded-2xl p-6 border border-outline-variant/10 glass-panel hover:bg-surface-container-highest transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center border border-tertiary/20">
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
                  <p className="text-[10px] text-outline uppercase tracking-wider mb-1">Total P&L</p>
                  <p className="text-lg font-bold text-white">+$2,488.00</p>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl">
                  <p className="text-[10px] text-outline uppercase tracking-wider mb-1">Total ROI</p>
                  <p className="text-lg font-bold text-tertiary">+34.5%</p>
                </div>
              </div>
              <div className="p-3 bg-surface-container-lowest/50 rounded-xl flex items-center justify-between border border-outline-variant/5">
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
            <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/5 flex items-center gap-6 hover:bg-surface-container transition-all cursor-pointer">
              <img className="w-24 h-24 rounded-xl object-cover filter grayscale hover:grayscale-0 transition-all" alt="Oracle Grid Master" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUElz2SFLFYY57JStT5LoF-hTLhEHe_1bd_1POTPnVZ2-eD7DOzi5PCslhRKxqTSSq3swDF7VzznEuFvaLVFrXFoFnlzkVksgqU4s-rAEiL7ReRdk-IYFp9wB7MId_AGzFcHuDylHy2IZg6DAivmwC0GtGMJYjh47SS1BA0tAuJrmBt_sgTBcmRaZuJiRzm-6ybrpn398rz5kFMjzYgKZe80ilI1UIihITHcxeeZCyxaHhQ7nmPMW28NPigwdYORu11RJd-ZS-lnU"/>
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
            <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/5 flex items-center gap-6 hover:bg-surface-container transition-all cursor-pointer">
              <img className="w-24 h-24 rounded-xl object-cover filter grayscale hover:grayscale-0 transition-all" alt="Nebula Breakout" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQzlo0zCY2g4umFJfrpYizz4Qq_lbM_aHooXv6ADTTqrUSF9HRpvONcFZGl1CB1y3EX5qVH-JLectV7ZTeBTesrdh3h3ADkgqAAdmxYCv5DNrkzwaGcqKAW8NVGGrSgdHQF_gcS1PtKet1u3yUV4KOJaz1x2XCV91aqxmg4INoLX1vaRALVVu5L6XCYAxAd8eGh5RZeY9TO8c6ZfrsVRTmIPkW3iyi8l9tL58UW7mKsIqLMG2OxfsAhnSZLH4-GyHi5Q5xnl-eNRU"/>
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
      <footer className="lg:ml-64 bg-surface-container-lowest py-8 px-8 border-t border-outline-variant/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">Axodus</span>
            <span className="text-outline text-sm">© 2024 Kinetic Systems LLC</span>
          </div>
          <div className="flex gap-8 text-sm text-outline">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">API Reference</a>
            <a className="hover:text-primary transition-colors" href="#">Security Audit</a>
          </div>
        </div>
      </footer>
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#0b1326] backdrop-blur-xl bg-opacity-90 z-50 px-6 py-3 flex justify-between items-center border-t border-outline-variant/10">
        <div className="flex flex-col items-center gap-1 text-[#908fa0]">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-medium">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-[#c0c1ff]">
          <span className="material-symbols-outlined" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}}>query_stats</span>
          <span className="text-[10px] font-medium">Trade</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-[#908fa0]">
          <span className="material-symbols-outlined">account_balance_wallet</span>
          <span className="text-[10px] font-medium">Wallet</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-[#908fa0]">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-medium">Profile</span>
        </div>
      </nav>
    </>
  );
};

export default TradingBots;
