// src/layouts/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "@/styles/Global.css";

export default function Layout() {
  return (
    <div className="app-page bg-surface text-on-surface font-body h-screen overflow-hidden flex flex-col">
      <Header />
      <div className="flex flex-1 pt-14 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto flex flex-col relative">
          <div className="flex-1 app-view-shell">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
