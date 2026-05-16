// src/pages/Settings.jsx
import React from 'react';
import "@/styles/Global.css";
import { settingsMock } from '@/data/mock';

const Settings = () => {
  return (
        <main className="flex-1 p-8 space-y-8 min-w-0 bg-background">
          {/* Page Header with Action */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-primary tracking-[0.2em] uppercase mb-2 block">Personalização</span>
              <h1 className="text-4xl font-extrabold text-on-surface tracking-tighter">Configurações</h1>
            </div>
            <button className="primary-gradient flex items-center gap-2 px-6 py-3 text-on-primary font-bold rounded-xl shadow-lg shadow-primary hover:shadow-primary/30 active:scale-95 transition-all">
              <span className="material-symbols-outlined" data-icon="save" style={{fontVariationSettings: "'FILL' 1"}}>save</span>
              Salvar Alterações
            </button>
          </div>
          {/* Bento Grid Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Voting Power */}
            <div className="md:col-span-1 bg-surface-container-low p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl" data-icon="palette">palette</span>
              </div>
              <div className="text-xs font-medium text-outline mb-4">Tema</div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-on-surface">{settingsMock.appSettings.theme}</span>
                <span className="text-sm font-bold text-secondary">padrão</span>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[10px] text-secondary">
                <span className="material-symbols-outlined text-xs">settings_brightness</span>
                Mude para o tema claro
              </div>
            </div>
            {/* Total Staked */}
            <div className="md:col-span-1 bg-surface-container-low p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl" data-icon="notifications">notifications</span>
              </div>
              <div className="text-xs font-medium text-outline mb-4">Notificações</div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-on-surface">{settingsMock.appSettings.riskWarningsEnabled ? 'Ativadas' : 'Desativadas'}</span>
                <span className="text-sm font-bold text-primary">Email</span>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[10px] text-primary">
                <span className="material-symbols-outlined text-xs">toggle_on</span>
                Desativar notificações
              </div>
            </div>
            {/* Treasury Balance */}
            <div className="md:col-span-2 bg-surface-container-low p-6 rounded-2xl relative overflow-hidden group border-outline-variant/10">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
              <div className="relative z-10">
                <div className="text-xs font-medium text-outline mb-4">Conexão da Carteira</div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div>
                    <span className="text-3xl font-black text-on-surface">Metamask</span>
                    <div className="text-[10px] text-outline mt-1 uppercase tracking-widest font-bold">Conectado</div>
                  </div>
                  <div className="h-10 w-px bg-outline-variant/20 hidden sm:block"></div>
                  <div className="flex gap-4">
                    <div>
                      <div className="text-[10px] text-outline">Endereço</div>
                      <div className="text-sm font-bold">0x...1234</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-outline">Rede</div>
                      <div className="text-sm font-bold">Ethereum</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Active Proposals Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" data-icon="security" style={{fontVariationSettings: "'FILL' 1"}}>security</span>
                Configurações de Segurança
              </h2>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-surface-container-highest text-primary border-primary">Todas</button>
                <button className="px-4 py-1.5 rounded-full text-xs font-bold text-outline hover:bg-surface-container-high transition-colors">Autenticação</button>
                <button className="px-4 py-1.5 rounded-full text-xs font-bold text-outline hover:bg-surface-container-high transition-colors">Permissões</button>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Proposal Card 1 */}
              <div className="glass-panel rounded-2xl p-6 border-outline-variant/5 hover:border-primary transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black bg-secondary/10 text-secondary px-2 py-0.5 rounded border-secondary/20 uppercase tracking-tighter">Ativo</span>
                      <span className="text-[10px] text-outline font-bold uppercase tracking-wider">2FA</span>
                    </div>
                    <h3 className="text-lg font-bold text-on-surface leading-snug group-hover:text-primary transition-colors">Autenticação de Dois Fatores</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-outline uppercase font-bold">Status</div>
                    <div className="text-sm font-bold text-on-surface tabular-nums">Ativado</div>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant mb-8 line-clamp-2">Gerencie as configurações da sua autenticação de dois fatores para maior segurança da conta.</p>
                {/* Voting Bars */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm" data-icon="check_circle">check_circle</span> Ativado
                      </span>
                      <span className="text-on-surface">Google Authenticator</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{width: "100%"}}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <img className="w-6 h-6 rounded-full border-2 border-[#0b1326] bg-surface-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnK3rg5Mh7Lp0RvY8pcZaI3mxPGmL9B2XMCGfVBon69ANV6YQl_4I8TQ6bO_WUVkvZoIVk_UmywZxlU2GxzI5Q25vM_lNFlJiT1fZdOm7Wp1CSLPPtc4O9xXwxEC6tR59kDObIrAyIDDT05x7UXky501j9F6nhd-x5M17l37KwbvHkVQYt8bFGnez6sRK-TUoKZPDWk6HpH02xRhSbboLMB2yeOc9RHXylIbYwcejB-zAM-1LWxYMeGbnZ3PLrR-orIDbB6-I6tM8"/>
                    <img className="w-6 h-6 rounded-full border-2 border-[#0b1326] bg-surface-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDitg2kczKb2NoaJFQyUBUKIuRyK9LPtq3RClcq0W01ff4HookP_cYpsoTkb0e-lRrHCUhmfCV5HOvbvABF6BF38RwEVWCl-o8f3PKLo8hGxTkFEsZMrRBhC8275zqHCTv5m-AjryF1dbMoys5BVzWKHYKo2swAHh1XVzHik_dccrKV6VMHMGM4vXENvn7xF-RXEeXoMkOsQ2vqALTVSH6od9xB8MYnQ64_eDxTelEkRlaMkSY5cU9XKNfOyQm6_6veP1HuVG_EMaI"/>
                    <img className="w-6 h-6 rounded-full border-2 border-[#0b1326] bg-surface-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApRIUGli5qOujSQNo3mdWna58QJGwUF9tLHsicIwpRjMdtDyfEnRjF1sQCYHlBQzaNHqu5u71xYiD9OWJqCmdQQQbU-YgUEeTEKVYoOy6996GSo5nDXMO204h5Hw-SYZ62316MmuefXg3NGs2OCi9vDVcpe97-mJj3uNA_bJDGKD8ydLVVs7E0_LCiJC77L_0zgJ1zqbXrjKtn1Cn3qEFrNOJH9FCPcqovoNzIidxndwSQIzvpBG5e8g53vtLJnaOL__ICyGYWYWM"/>
                    <div className="w-6 h-6 rounded-full border-2 border-[#0b1326] bg-surface-container-highest flex items-center justify-center text-[8px] font-bold text-outline">+3</div>
                  </div>
                  <button className="px-6 py-2 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-xs font-bold text-on-surface transition-colors">
                    Gerenciar
                  </button>
                </div>
              </div>
              {/* Proposal Card 2 */}
              <div className="glass-panel rounded-2xl p-6 border-outline-variant/5 hover:border-primary transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black bg-tertiary/10 text-tertiary px-2 py-0.5 rounded border-tertiary/20 uppercase tracking-tighter">Pendente</span>
                      <span className="text-[10px] text-outline font-bold uppercase tracking-wider">Chaves API</span>
                    </div>
                    <h3 className="text-lg font-bold text-on-surface leading-snug group-hover:text-primary transition-colors">Gerenciamento de Chaves API</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-outline uppercase font-bold">Status</div>
                    <div className="text-sm font-bold text-on-surface tabular-nums">Não configurado</div>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant mb-8 line-clamp-2">Crie e gerencie chaves API para integrar aplicativos externos com sua conta Axodus.</p>
                {/* Voting Bars */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm" data-icon="vpn_key">vpn_key</span> Chave Ativa
                      </span>
                      <span className="text-on-surface">Nenhuma</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{width: "0%"}}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-tertiary">
                    <span className="material-symbols-outlined text-sm">info</span>
                    Nenhuma chave API encontrada
                  </div>
                  <button className="px-6 py-2 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-xs font-bold text-on-surface transition-colors">
                    Criar Chave
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Asymmetric Secondary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Delegators List */}
            <div className="lg:col-span-2 bg-surface-container-low rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-bold text-on-surface uppercase tracking-widest">Dispositivos Conectados</h2>
                <button className="text-xs font-bold text-primary hover:underline">Gerenciar Dispositivos</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary font-black text-sm">PC</div>
                    <div>
                      <div className="text-sm font-bold text-on-surface">Meu Desktop</div>
                      <div className="text-[10px] text-outline">Localização: São Paulo, Brasil</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-secondary">Ativo</div>
                    <div className="text-[10px] text-outline">Último Acesso: Agora</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary font-black text-sm">Cel</div>
                    <div>
                      <div className="text-sm font-bold text-on-surface">Meu Celular</div>
                      <div className="text-[10px] text-outline">Localização: Rio de Janeiro, Brasil</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-secondary">Ativo</div>
                    <div className="text-[10px] text-outline">Último Acesso: 10 min atrás</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary font-black text-sm">Tab</div>
                    <div>
                      <div className="text-sm font-bold text-on-surface">Meu Tablet</div>
                      <div className="text-[10px] text-outline">Localização: São Paulo, Brasil</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-outline">Inativo</div>
                    <div className="text-[10px] text-outline">Último Acesso: 2 dias atrás</div>
                  </div>
                </div>
              </div>
            </div>
            {/* System Status / Activity Feed */}
            <div className="bg-surface-container-low rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
              <h2 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-6">Logs de Atividade</h2>
              <div className="space-y-6 relative z-10">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-sm" data-icon="login">login</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-on-surface">Login bem-sucedido de <span className="text-primary">São Paulo</span></p>
                    <span className="text-[10px] text-outline">2 minutos atrás</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-sm" data-icon="password">password</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-on-surface">Senha alterada em <span className="text-primary">Minha Conta</span></p>
                    <span className="text-[10px] text-outline">1 hora atrás</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-tertiary text-sm" data-icon="wallet">wallet</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-on-surface">Carteira <span className="text-tertiary">desconectada</span></p>
                    <span className="text-[10px] text-outline">5 horas atrás</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-sm" data-icon="dark_mode">dark_mode</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-on-surface">Tema alterado para <span className="text-secondary">Escuro</span></p>
                    <span className="text-[10px] text-outline">1 dia atrás</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
  );
};

export default Settings;
