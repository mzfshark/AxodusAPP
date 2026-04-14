// src/pages/Overview.jsx
import React, { useEffect, useState } from "react";
import { getOverviewStats } from "../api/protocolData";
import "../styles/Global.module.css";
import "../styles/overview.css";
import "../styles/charts.css";
import OverviewCharts from "../components/Charts"

const Overview = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      const data = await getOverviewStats();
      setStats(data);
    }
    fetchStats();
  }, []);

  if (!stats) return <p>Loading protocol data...</p>;

  return (
    <div className="overview">
      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-title">Total Users</span>
          <span className="stat-value">{stats.totalUsers}</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">Total Products</span>
          <span className="stat-value">{stats.totalProducts}</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">APR</span>
          <span className="stat-value">{stats.protocolApr} %</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">TVL </span>
          <span className="stat-value">$ {stats.totalValueLocked}</span>
        </div>
        {/* ...mais cards... */}
      </section>
  
      <section className="products">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Model</th>
              <th>Chain</th>
              <th style={{ textAlign: "right" }}>ROI</th>
            </tr>
          </thead>

          <tbody>
            {stats.products.map(({ address, name, type, chain, roi }) => (
              <tr key={address}>
                <td>{name}</td>
                <td>{type}</td>
                <td>{chain}</td>
                <td style={{ textAlign: "right" }}>{roi.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
  
      <section className="chart-block">
        <OverviewCharts />
        
      </section>


    </div>
  );
};
export default Overview;
