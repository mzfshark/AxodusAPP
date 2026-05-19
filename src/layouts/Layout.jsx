// src/layouts/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { getActiveShellItem } from "../config/appShell";
import "@/styles/Global.css";

export default function Layout() {
  const location = useLocation();
  const activeShellItem = getActiveShellItem(location.pathname);

  return (
    <div
      className="app-page app-shell bg-surface text-on-surface font-body h-screen overflow-hidden flex flex-col"
      data-nucleus={activeShellItem.id}
      data-nucleus-tone={activeShellItem.tone}
    >
      <Header activeShellItem={activeShellItem} />
      <div className="app-shell-body flex flex-1 overflow-hidden">
        <Sidebar activeShellItem={activeShellItem} />
        <main className="app-shell-main flex-1 overflow-y-auto flex flex-col relative">
          <div className="app-shell-content">
            <Outlet />
          </div>
          <Footer activeShellItem={activeShellItem} />
        </main>
      </div>
    </div>
  );
}
