// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { getUserInvestments, getUserPerformance } from "../api/userData";
import InvestmentCard from '../components/InvestmentCard';
import PerformanceGraph from '../components/PerformanceGraph';
import TokenBalance from '../components/TokenBalance';
import { InfoList } from '../components/InfoList';
import { useWallet } from '../hooks/useWallet';
import "@/src/styles/Global.module.css";

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
    return <div className="appMain">Loading dashboard data...</div>;
  }

  return (
    <div className="appMain">
      {/* Cards de Investimentos */}
      <div className="stats-grid">
        {investments.map((inv) => (
          <InvestmentCard key={inv.productId} {...inv} />
        ))}
      </div>

      {/* Gráfico de performance */}
      <div className="chart-block">
        <PerformanceGraph data={performance} title="Portfolio Performance" />
      </div>

      {/* Saldo de Tokens */}
      <div className="chart-block">
        <TokenBalance />
      </div>

      {/* Lista de informações adicionais */}
      <div className="chart-block">
        <InfoList />
      </div>
    </div>
  );
};

export default Dashboard;
