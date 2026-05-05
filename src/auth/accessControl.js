// src/auth/accessControl.js
export const ROLES = {
  guest: 'guest',
  user: 'user',
  admin: 'admin',
};

// Addresses com role admin (env: VITE_ADMIN_ADDRESSES=0xabc,0xdef)
const adminAllowlist = (import.meta?.env?.VITE_ADMIN_ADDRESSES || '')
  .split(',')
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

export function deriveRoles(address) {
  if (!address) return [ROLES.guest];
  const addr = String(address).toLowerCase();
  const roles = [ROLES.user];
  if (adminAllowlist.includes(addr)) roles.push(ROLES.admin);
  return roles;
}

// Mapa opcional por rota (sobrescrevível futuramente)
export const routeAccess = {
  '/dashboard': [ROLES.user],
  '/defi': [ROLES.user],
  '/transactions': [ROLES.user],
  '/settings': [ROLES.user],
  '/trading/bots': [ROLES.user],
  '/trading/portfolio': [ROLES.user],
  '/trading/trade': [ROLES.user],
  '/trading/market': [ROLES.user],
  '/trading/swap': [ROLES.user],
  '/backtesting': [ROLES.user],
  '/controllers': [ROLES.user],
};

export function canAccess(requiredRoles, userRoles) {
  if (!requiredRoles || requiredRoles.length === 0) return true;
  const set = new Set(userRoles || []);
  return requiredRoles.some((r) => set.has(r));
}

export function rolesForPath(pathname) {
  // Match exato ou por prefixo
  if (routeAccess[pathname]) return routeAccess[pathname];
  const entry = Object.entries(routeAccess).find(([p]) => pathname.startsWith(p));
  return entry ? entry[1] : [];
}
