// src/layouts/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "@/styles/Global.css";

export default function Layout() {
  return (
    <div className="bg-background text-on-surface font-body min-h-screen flex flex-col">
      <Header />
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
}
