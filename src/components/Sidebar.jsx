// src/components/Sidebar.jsx

import { NavLink } from "react-router-dom";
import {
  Moon,
  Sun,
  LayoutDashboard,
  GalleryHorizontalEnd,
  ArrowLeftRight,
  TableOfContents,
  Settings2,
  Mail,
  Bug,
  Github,
  Send,
  Instagram,
  Twitter,
  PlugZap,
  User,
  Bot,
  Briefcase,
  LineChart,
  BarChart3,
  ChartCandlestick,
  Network,
  ServerCog,
  FlaskConical
} from "lucide-react";

import useDarkMode from "../hooks/useDarkMode";
import styles from "../styles/Global.module.css";

export default function Sidebar({ collapsed, onToggle }) {
  /* dark‑mode hook: isDark = bool, toggleTheme = fn */
  const [isDark, toggleTheme] = useDarkMode();

  /* navegação agrupada para expor todos os recursos */
  const navSections = [
    {
      title: "Axodus Core",
      items: [
        { type: "route", path: "/", icon: TableOfContents, label: "Overview" },
        { type: "route", path: "/account", icon: User, label: "Account" },
        { type: "route", path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { type: "route", path: "/portfolio", icon: GalleryHorizontalEnd, label: "Portfolio" },
        { type: "route", path: "/transactions", icon: ArrowLeftRight, label: "Transactions" },
        { type: "route", path: "/settings", icon: Settings2, label: "Settings" }
      ]
    },
    {
      title: "Trading Suite",
      items: [
        { type: "route", path: "/trading/bots", icon: Bot, label: "Bots" },
        { type: "route", path: "/trading/portfolio", icon: Briefcase, label: "Positions" },
        { type: "route", path: "/trading/trade", icon: ChartCandlestick, label: "Trading" },
        { type: "route", path: "/trading/market", icon: LineChart, label: "Market Data" },
        { type: "route", path: "/trading/swap", icon: ArrowLeftRight, label: "Swap" }
      ]
    },
    {
      title: "Quant & Ops",
      items: [
        { type: "route", path: "/backtesting", icon: BarChart3, label: "Backtesting" },
        { type: "route", path: "/controllers", icon: FlaskConical, label: "Controllers" }
      ]
    },
    {
      title: "Integrations",
      items: [
        {
          type: "external",
          href: "http://localhost:8000/docs",
          icon: ServerCog,
          label: "Hummingbot API"
        },
        {
          type: "external",
          href: "http://localhost:15888",
          icon: Network,
          label: "Gateway Console"
        }
      ]
    }
  ];

  const sidebarWidth = collapsed
    ? "var(--sidebar-w-collapsed)"
    : "var(--sidebar-w)";

  return (
    <aside className={styles["app-sidebar"]} style={{ width: sidebarWidth }}>
      {/* botão de colapsar */}
      <button
        onClick={onToggle}
        className={styles['app-sidebar-toggle']}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? "»" : "«"}
      </button>

      {/* navegação */}
      <nav style={{ flex: 1 }}>
        {navSections.map(({ title, items }) => (
          <div key={title} className={styles["app-sidebar-section"]}>
            {!collapsed && (
              <p className={styles["app-sidebar-section-title"]}>{title}</p>
            )}
            <ul>
              {items.map((item) => {
                const Icon = item.icon;

                if (item.type === "external") {
                  return (
                    <li key={item.label}>
                      <a href={item.href} target="_blank" rel="noreferrer">
                        <Icon size={16} style={{ marginRight: collapsed ? 0 : 8 }} />
                        {!collapsed && item.label}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <Icon size={16} style={{ marginRight: collapsed ? 0 : 8 }} />
                      {!collapsed && item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* rodapé */}
      <nav style={{marginBottom: "20px"}}>
        <ul>
          <li>
            <a
              href="https://github.com/Axodus"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={16} /> {!collapsed && "GitHub"}
            </a>
          </li>
          <li>
            <a href="https://github.com/mzfshark/axodus/issues"
            target="_blank"
            rel="noreferrer">
              <Bug size={16} /> {!collapsed && "Support"}
            </a>
          </li>
          <li>
            <a href="https://instagram.com/axodus.finance"
            target="_blank"
            rel="noreferrer">
              <Instagram size={16}/> {!collapsed && "Instagram"}
            </a>
          </li>
          <li>
            <a href="https://t.me/axodusfinance"
            target="_blank"
            rel="noreferrer">
              <Send size={16}/> {!collapsed && "Telegram"}
            </a>
          </li>
          <li>
            <a href="https://x.com/axodus.finance"
            target="_blank"
            rel="noreferrer">
              <Twitter size={16}/> {!collapsed && "X / Twitter"}
            </a>
          </li>
          <li>
            <a href="mailto:axodus.finance@gmail.com">
              <Mail size={16}/> {!collapsed && "Contact"}
            </a>
          </li>
        
          <li>
            <button
              onClick={toggleTheme}
              className={styles["theme-toggle"]}
              title="Toggle theme"
              
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              {!collapsed && ""}
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
