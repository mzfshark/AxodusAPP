// src/components/Footer.jsx
import React from 'react';
import '@/styles/Global.css';

const Footer = () => {
  return (
    <footer className=" mt-24 pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-8 pb-12 px-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-on-primary font-bold">A</div>
        <span className="font-bold text-xl">Axodus</span>
      </div>
      <div className="flex gap-6 text-sm text-on-surface-variant">
        <a href="#" className="hover:text-primary transition-colors">Terms</a>
        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
        <a href="#" className="hover:text-primary transition-colors">Docs</a>
        <a href="#" className="hover:text-primary transition-colors">Telegram</a>
      </div>
    </footer>
  );
};

export default Footer;
