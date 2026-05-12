// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '@/styles/Global.css';

const footerGroups = [
  {
    title: 'Axodus',
    links: [
      { label: 'Home', to: '/dashboard' },
      { label: 'Governance', to: '/dao' },
      { label: 'Marketplace', to: '/marketplace' },
      { label: 'Academy', to: '/academy' },
      { label: 'Business', to: '/account' },
      { label: 'MCP Servers', to: '/mcps' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', to: '#' },
      { label: 'Whitepaper', to: '#' },
      { label: 'Terms', to: '#' },
      { label: 'Privacy', to: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub', to: 'https://github.com/mzfshark/axodus', external: true },
      { label: 'X / Twitter', to: '#' },
      { label: 'Discord / Telegram', to: '#' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="app-footer mt-24 border-t">
      <div className="page-shell grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-10">
        <div className="flex flex-col gap-4">
          <Link to="/dashboard" className="flex items-center gap-3 w-fit">
            <img src="/logo.svg" alt="Axodus" className="h-9 w-auto" />
            <span className="font-bold text-xl text-on-surface">Axodus</span>
          </Link>
          <p className="card-description max-w-sm">
            Modular dashboard for Axodus ecosystem products, infrastructure and market intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="eyebrow mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a className="footer-link" href={link.to} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    ) : link.to === '#' ? (
                      <a className="footer-link" href="#">
                        {link.label}
                      </a>
                    ) : (
                      <Link className="footer-link" to={link.to}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
