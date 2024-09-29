'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChartComponent = ({ endpoint, title }) => {
  const [chartData, setChartData] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/dashboard/${endpoint}`)
      .then((response) => setChartData(response.data.chart))
      .catch((error) => console.error('Error fetching chart data:', error));
  }, [endpoint]);

  return (
    <div>
      <h2>{title}</h2>
      {chartData ? <img src={`data:image/png;base64,${chartData}`} alt={title} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default function Graficos() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <ChartComponent endpoint="checkup_time" title="Tempo Total de Check-up" />
      <ChartComponent endpoint="freq_erros" title="Frequência de Erros" />
    </div>
  );
}

