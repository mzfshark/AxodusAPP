// src/layouts/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "@/styles/Global.css";

export default function Layout() {
  return (
    <div className="bg-surface text-on-surface font-body overflow-hidden min-h-screen">
      <Header />
      <div className="flex h-screen pt-14">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
