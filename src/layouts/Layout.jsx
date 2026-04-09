// src/components/Layout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import styles from "../styles/Global.module.css";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles["app-layout"]}>
      <Header />

      <div className={styles["app-main"]}>
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />

        <main
          className={styles["app-content"]}
          /* ⇩ marginLeft ajustado com token de tema */
          style={{
            marginLeft: collapsed
              ? "var(--sidebar-w-collapsed)"
              : "var(--sidebar-w)",
          }}
        >
          <div style={{ flex: 1 }}>
            <Outlet />
          </div>

          
        </main>
        <Footer />
      </div>
    </div>
  );
}
