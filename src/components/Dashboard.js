import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const result = await response.json();
        setData(result);
        renderCharts(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderCharts = (data) => {
    const leadsCtx = document.getElementById('leadsChart').getContext('2d');
    new Chart(leadsCtx, {
      type: 'line',
      data: {
        labels: data.dates,
        datasets: [{
          label: 'Leads',
          data: data.leadsOverTime,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      }
    });

    const flowEntriesCtx = document.getElementById('flowEntriesChart').getContext('2d');
    new Chart(flowEntriesCtx, {
      type: 'line',
      data: {
        labels: data.dates,
        datasets: [{
          label: 'Entradas al flujo',
          data: data.flowEntriesOverTime,
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      }
    });

    const botActivationsCtx = document.getElementById('botActivationsChart').getContext('2d');
    new Chart(botActivationsCtx, {
      type: 'line',
      data: {
        labels: data.dates,
        datasets: [{
          label: 'Activaciones de bots',
          data: data.botActivationsOverTime,
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        }]
      }
    });

    const conversionsCtx = document.getElementById('conversionsChart').getContext('2d');
    new Chart(conversionsCtx, {
      type: 'line',
      data: {
        labels: data.dates,
        datasets: [{
          label: 'Conversiones a pago',
          data: data.conversionsOverTime,
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      }
    });
  };

  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <header>
        <h1>Dashboard en tiempo real</h1>
      </header>
      <main>
        <section>
          <h2>Leads</h2>
          <p>{data.leads}</p>
        </section>
        <section>
          <h2>Entradas al flujo</h2>
          <p>{data.flowEntries}</p>
        </section>
        <section>
          <h2>Activaciones de bots</h2>
          <p>{data.botActivations}</p>
        </section>
        <section>
          <h2>Conversiones a pago</h2>
          <p>{data.conversions}</p>
        </section>
        <section>
          <h2>KPI: $ por lead generado</h2>
          <p>{`$${data.kpi} por lead generado`}</p>
        </section>
        <section>
          <h2>Gráficos</h2>
          <canvas id="leadsChart"></canvas>
          <canvas id="flowEntriesChart"></canvas>
          <canvas id="botActivationsChart"></canvas>
          <canvas id="conversionsChart"></canvas>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
