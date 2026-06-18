// src/layouts/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { AppShell } from "../components/layout";
import { getActiveShellItem } from "../config/appShell";
import "@/styles/Global.css";

export default function Layout() {
  const location = useLocation();
  const activeShellItem = getActiveShellItem(location.pathname);

  return (
    <AppShell activeShellItem={activeShellItem}>
      <Outlet />
    </AppShell>
  );
}
