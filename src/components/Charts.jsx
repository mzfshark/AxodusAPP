import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Legend,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";
import "../styles/charts.css";

// --- MOCK DATA --------------------------------------------------
const COLORS = ["#00bcd4", "#1e88e5", "#43a047", "#fb8c00", "#8e24aa"];

const productAllocation = [
  { name: "ETH Staking", value: 26 },
  { name: "Polygon Bot", value: 18 },
  { name: "BTC Mining", value: 22 },
  { name: "VC Launch", value: 14 },
  { name: "TRON Yield", value: 20 },
];

const chainDistribution = [
  { name: "Ethereum", value: 40, fullMark: 45 },
  { name: "Polygon", value: 18, fullMark: 45 },
  { name: "Bitcoin", value: 22, fullMark: 45 },
  { name: "Tron", value: 12, fullMark: 45 },
  { name: "Others", value: 8, fullMark: 45 },
];

// --- COMPONENTS -------------------------------------------------
const PieCard = ({ title, data }) => (
  <div className="chart-card half">
    <h3 className="chart-title">{title}</h3>
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"

          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          label={(d) => `${d.name} ${d.value}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        
        <ReTooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const RadarCard = ({ title, data }) => (
  <div className="chart-card half">
    <h3 className="chart-title">{title}</h3>
    <ResponsiveContainer width="100%" height={250}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Radar name="TVL" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);

const monthNames = [
  "Mai", "Jun", "Jul", "Aug", "Sep", "Oct",
  "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"
];

const lineSeries = Array.from({ length: 12 }).map((_, i) => ({
  month: monthNames[i],
  tvl: 100 + i * 15 + Math.random() * 5,
  profit: 2 + i * 14.8 + Math.random() * 5.3,
}));


const LineCard = () => (
  <div className="chart-card full">
    <h3 className="chart-title">TVL vs Profit % (YTD)</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={lineSeries} margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" /> {/* agora funciona corretamente */}
        <YAxis yAxisId="left" tickFormatter={(v) => `$${v}k`} />
        <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v}%`} />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="tvl" stroke="#00bcd4" strokeWidth={2} dot={false} />
        <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#43a047" strokeWidth={2} dot={false} />
        <ReTooltip />
      </LineChart>

    </ResponsiveContainer>
  </div>
);

// --- MAIN EXPORT ----------------------------------------------
export default function OverviewCharts() {
  return (
    <section className="chart-block">
      <div className="charts-grid">
        <div className="chart-card half">
          <PieCard title="Allocation by Product" data={productAllocation} />
        </div>
        <div className="chart-card half">
          <RadarCard title="TVL by Chain" data={chainDistribution} />
        </div>
      </div>

      {/* Abaixo, um gráfico de linha ocupando 100% */}
      <div className="charts-list">
        <div className="chart-card full">
          <LineCard />
        </div>
      </div>
    </section>
  );
}
