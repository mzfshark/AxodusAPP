import React from "react";
import "@/styles/Global.css";

const Dao = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-background p-8">
      {/* Page Header with Action */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-primary tracking-[0.2em] uppercase mb-2 block">Governance</span>
          <h1 className="text-4xl font-extrabold text-on-surface tracking-tighter">Proposals</h1>
        </div>
        <button className="primary-gradient flex items-center gap-2 px-6 py-3 text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all">
          <span className="material-symbols-outlined" data-icon="add_circle" style={{fontVariationSettings: "'FILL' 1"}}>add_circle</span>
          Create Proposal
        </button>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        {/* Voting Power */}
        <div className="md:col-span-1 bg-surface-container-low p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-6xl" data-icon="electric_bolt">electric_bolt</span>
          </div>
          <div className="text-xs font-medium text-outline mb-4">Voting Power</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-on-surface">1,420</span>
            <span className="text-sm font-bold text-secondary">VP</span>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[10px] text-secondary">
            <span className="material-symbols-outlined text-xs">trending_up</span>
            +12% from last epoch
          </div>
        </div>

        {/* Total Staked */}
        <div className="md:col-span-1 bg-surface-container-low p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-6xl" data-icon="account_balance_wallet">account_balance_wallet</span>
          </div>
          <div className="text-xs font-medium text-outline mb-4">Total Staked</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-on-surface">12.4M</span>
            <span className="text-sm font-bold text-primary">AXO</span>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[10px] text-primary">
            <span className="material-symbols-outlined text-xs">lock</span>
            84% of circulating supply
          </div>
        </div>

        {/* Treasury Balance */}
        <div className="md:col-span-2 bg-surface-container-low p-6 rounded-2xl relative overflow-hidden group border-outline-variant/10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
          <div className="relative z-10">
            <div className="text-xs font-medium text-outline mb-4">Treasury Balance</div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div>
                <span className="text-3xl font-black text-on-surface">$42,910,204</span>
                <div className="text-[10px] text-outline mt-1 uppercase tracking-widest font-bold">Consolidated Net Worth</div>
              </div>
              <div className="h-10 w-px bg-outline-variant/20 hidden sm:block"></div>
              <div className="flex gap-4">
                <div>
                  <div className="text-[10px] text-outline">USDC</div>
                  <div className="text-sm font-bold">24.1M</div>
                </div>
                <div>
                  <div className="text-[10px] text-outline">ETH</div>
                  <div className="text-sm font-bold">4.2K</div>
                </div>
                <div>
                  <div className="text-[10px] text-outline">SOL</div>
                  <div className="text-sm font-bold">18.9K</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Proposals Section */}
      <div className="space-y-6 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" data-icon="ballot" style={{fontVariationSettings: "'FILL' 1"}}>ballot</span>
            Active Proposals
          </h2>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-surface-container-highest text-primary border-primary/20">All</button>
            <button className="px-4 py-1.5 rounded-full text-xs font-bold text-outline hover:bg-surface-container-high transition-colors">Core</button>
            <button className="px-4 py-1.5 rounded-full text-xs font-bold text-outline hover:bg-surface-container-high transition-colors">Grants</button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Proposal Card 1 */}
          <div className="glass-panel rounded-2xl p-6 border-outline-variant/5 hover:border-primary/20 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black bg-secondary/10 text-secondary px-2 py-0.5 rounded border-secondary/20 uppercase tracking-tighter">Active</span>
                  <span className="text-[10px] text-outline font-bold uppercase tracking-wider">Proposal #084</span>
                </div>
                <h3 className="text-lg font-bold text-on-surface leading-snug group-hover:text-primary transition-colors">
                  Liquidity Mining Rewards Optimization for Q3
                </h3>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-outline uppercase font-bold">Ends In</div>
                <div className="text-sm font-bold text-on-surface tabular-nums">2d 14h 22m</div>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant mb-8 line-clamp-2">
              Adjusting the distribution of $NEURONS rewards across main DEX pools to prioritize deep liquidity in stable pairs and sustainable growth in MCP Server nodes.
            </p>

            {/* Voting Bars */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm" data-icon="check_circle">check_circle</span> For
                  </span>
                  <span className="text-on-surface">8.2M AXO (72%)</span>
                </div>
                <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                  <div className="h-full bg-for rounded-full" style={{width: "72%"}}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-error flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm" data-icon="cancel">cancel</span> Against
                  </span>
                  <span className="text-on-surface">3.1M AXO (28%)</span>
                </div>
                <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                  <div className="h-full bg-against rounded-full" style={{width: "28%"}}></div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant/10 flex items-center justify-between">
              <div className="flex -space-x-2">
                <img className="w-6 h-6 rounded-full border-2 border-[#0b1326] bg-surface-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnK3rg5Mh7Lp0RvY8pcZaI3mxPGmL9B2XMCGfVBon69ANV6YQl_4I8TQ6bO_WUVkvZoIVk_UmywZxlU2GxzI5Q25vM_lNFlJiT1fZdOm7Wp1CSLPPtc4O9xXwxEC6tR59kDObIrAyIDDT05x7UXky501j9F6nhd-x5M17l37KwbvHkVQYt8bFGnez6sRK-TUoKZPDWk6HpH02xRhSbboLMB2yeOc9RHXylIbYwcejB-zAM-1LWxYMeGbnZ3PLrR-orIDbB6-I6tM8" alt="User Avatar"/>
                <img className="w-6 h-6 rounded-full border-2 border-[#0b1326] bg-surface-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDitg2kczKb2NoaJFQyUBUKIuRyK9LPtq3RClcq0W01ff4HookP_cYpsoTkb0e-lRrHCUhmfCV5HOvbvABF6BF38RwEVWCl-o8f3PKLo8hGxTkFEsZMrRBhC8275zqHCTv5m-AjryF1dbMoys5BVzWKHYKo2swAHh1XVzHik_dccrKV6VMHMGM4vXENvn7xF-RXEeXoMkOsQ2vqALTVSH6od9xB8MYnQ64_eDxTelEkRlaMkSY5cU9XKNfOyQm6_6veP1HuVG_EMaI" alt="User Avatar"/>
                <img className="w-6 h-6 rounded-full border-2 border-[#0b1326] bg-surface-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApRIUGli5qOujSQNo3mdWna58QJGwUF9tLHsicIwpRjMdtDyfEnRjF1sQCYHlBQzaNHqu5u71xYiD9OWJqCmdQQQbU-YgUEeTEKVYoOy6996GSo5nDXMO204h5Hw-SYZ62316MmuefXg3NGs2OCi9vDVcpe97-mJj3uNA_bJDGKD8ydLVVs7E0_LCiJC77L_0zgJ1zqbXrjKtn1Cn3qEFrNOJH9FCPcqovoNzIidxndwSQIzvpBG5e8g53vtLJnaOL__ICyGYWYWM" alt="User Avatar"/>
                <div className="w-6 h-6 rounded-full border-2 border-[#0b1326] bg-surface-container-highest flex items-center justify-center text-[8px] font-bold text-outline">+142</div>
              </div>
              <button className="px-6 py-2 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-xs font-bold text-on-surface transition-colors">
                View Details
              </button>
            </div>
          </div>

          {/* Proposal Card 2 */}
          <div className="glass-panel rounded-2xl p-6 border-outline-variant/5 hover:border-primary/20 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black bg-tertiary/10 text-tertiary px-2 py-0.5 rounded border-tertiary/20 uppercase tracking-tighter">Quorum Pending</span>
                  <span className="text-[10px] text-outline font-bold uppercase tracking-wider">Proposal #083</span>
                </div>
                <h3 className="text-lg font-bold text-on-surface leading-snug group-hover:text-primary transition-colors">
                  Expansion into Arweave Storage Network
                </h3>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-outline uppercase font-bold">Ends In</div>
                <div className="text-sm font-bold text-on-surface tabular-nums">12h 45m</div>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant mb-8 line-clamp-2">
              Integrating Arweave to permanently store DAO governance logs and MCP server metadata for verifiable transparency across the Kinetic Observatory.
            </p>

            {/* Voting Bars */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm" data-icon="check_circle">check_circle</span> For
                  </span>
                  <span className="text-on-surface">1.2M AXO (94%)</span>
                </div>
                <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                  <div className="h-full bg-for rounded-full" style={{width: "94%"}}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-error flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm" data-icon="cancel">cancel</span> Against
                  </span>
                  <span className="text-on-surface">75K AXO (6%)</span>
                </div>
                <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                  <div className="h-full bg-against rounded-full" style={{width: "6%"}}></div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-tertiary">
                <span className="material-symbols-outlined text-sm">info</span>
                Quorum: 24% / 30%
              </div>
              <button className="px-6 py-2 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-xs font-bold text-on-surface transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Asymmetric Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Delegators List */}
        <div className="lg:col-span-2 bg-surface-container-low rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-on-surface uppercase tracking-widest">Top Contributors</h2>
            <button className="text-xs font-bold text-primary hover:underline">View Leaderboard</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-sm">0x...aF2</div>
                <div>
                  <div className="text-sm font-bold text-on-surface">Kinetic Labs</div>
                  <div className="text-[10px] text-outline">Delegated: 2.1M AXO</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-secondary">Active</div>
                <div className="text-[10px] text-outline">12 Proposals Voted</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary font-black text-sm">0x...3E4</div>
                <div>
                  <div className="text-sm font-bold text-on-surface">CyberNode Venture</div>
                  <div className="text-[10px] text-outline">Delegated: 1.8M AXO</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-secondary">Active</div>
                <div className="text-[10px] text-outline">10 Proposals Voted</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary font-black text-sm">0x...9B1</div>
                <div>
                  <div className="text-sm font-bold text-on-surface">Alpha Whale</div>
                  <div className="text-[10px] text-outline">Delegated: 840K AXO</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-outline">Inactive</div>
                <div className="text-[10px] text-outline">0 Proposals Voted</div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status / Activity Feed */}
        <div className="bg-surface-container-low rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
          <h2 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-6">Recent Activity</h2>
          <div className="space-y-6 relative z-10">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-sm" data-icon="how_to_vote">how_to_vote</span>
              </div>
              <div>
                <p className="text-xs font-medium text-on-surface">New vote cast on <span className="text-primary">#084</span></p>
                <span className="text-[10px] text-outline">2 minutes ago</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-sm" data-icon="add">add</span>
              </div>
              <div>
                <p className="text-xs font-medium text-on-surface">Proposal <span className="text-primary">#085</span> drafted</p>
                <span className="text-[10px] text-outline">1 hour ago</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary text-sm" data-icon="payments">payments</span>
              </div>
              <div>
                <p className="text-xs font-medium text-on-surface">Treasury payout: <span className="text-tertiary">$12.5K</span></p>
                <span className="text-[10px] text-outline">5 hours ago</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-sm" data-icon="lock_open">lock_open</span>
              </div>
              <div>
                <p className="text-xs font-medium text-on-surface">Staking unlock: <span className="text-secondary">40K AXO</span></p>
                <span className="text-[10px] text-outline">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dao;
