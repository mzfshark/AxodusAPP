// src/components/PerformanceGraph.jsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import '../styles/Global.module.css';

const PerformanceGraph = ({ data, title }) => {
  return (
    <div className="performance-graph-container">
      <div className="performance-graph-header">{title || 'Performance Overview'}</div>
      <div className="performance-chart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceGraph;
