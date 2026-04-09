// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { getUserInvestments, getUserPerformance } from "../api/userData";
import InvestmentCard from '../components/InvestmentCard';
import PerformanceGraph from '../components/PerformanceGraph';
import TokenBalance from '../components/TokenBalance';
import { InfoList } from '../components/InfoList';
import { useWallet } from '../hooks/useWallet';
import styles from '../styles/Global.module.css';

const Dashboard = () => {
  const { address, isConnected } = useWallet();

  const [investments, setInvestments] = useState([]);
  const [performance, setPerformance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isConnected) return;

    async function fetchData() {
      setLoading(true);
      try {
        const [inv, perf] = await Promise.all([
          getUserInvestments(address),
          getUserPerformance(address)
        ]);
        setInvestments(inv);
        setPerformance(perf);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [address, isConnected]);

  if (loading) {
    return <div className={styles["dashboard-container"]}>Loading dashboard data...</div>;
  }

  return (
    <div className={styles["dashboard-container"]}>
      {/* Cards de Investimentos */}
      <div className={styles["dashboard-summary"]}>
        {investments.map((inv) => (
          <InvestmentCard key={inv.productId} {...inv} />
        ))}
      </div>

      {/* Gráfico de performance */}
      <div className={styles["dashboard-section"]}>
        <PerformanceGraph data={performance} title="Portfolio Performance" />
      </div>

      {/* Saldo de Tokens */}
      <div className={styles["dashboard-section"]}>
        <TokenBalance />
      </div>

      {/* Lista de informações adicionais */}
      <div className={styles["dashboard-section"]}>
        <InfoList />
      </div>
    </div>
  );
};

export default Dashboard;
