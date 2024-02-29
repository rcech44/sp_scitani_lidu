import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard06() {

  const chartData = {
    labels: ['Děti', 'Dospívající', 'Dospělí', 'Staří'],
    datasets: [
      {
        label: 'Ženy',
        data: [
          541695,522033,2713576,1205997
        ],
        backgroundColor: [
          tailwindConfig().theme.colors.pink[500],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.green[700],
          tailwindConfig().theme.colors.red[700],
          // tailwindConfig().theme.colors.pink[200],
          // tailwindConfig().theme.colors.pink[400],
          // tailwindConfig().theme.colors.pink[600],
          // tailwindConfig().theme.colors.pink[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.pink[600],
          tailwindConfig().theme.colors.blue[600],
          tailwindConfig().theme.colors.green[800],
          tailwindConfig().theme.colors.red[800],
          // tailwindConfig().theme.colors.pink[300],
          // tailwindConfig().theme.colors.pink[500],
          // tailwindConfig().theme.colors.pink[700],
          // tailwindConfig().theme.colors.pink[900],
        ],
        borderWidth: 5,
      },
      {
        label: 'Muži',
        data: [
          568961,548907,2864339,889265
        ],
        backgroundColor: [
          tailwindConfig().theme.colors.pink[300],
          tailwindConfig().theme.colors.blue[300],
          tailwindConfig().theme.colors.green[400],
          tailwindConfig().theme.colors.red[500],
          // tailwindConfig().theme.colors.blue[200],
          // tailwindConfig().theme.colors.blue[400],
          // tailwindConfig().theme.colors.blue[500],
          // tailwindConfig().theme.colors.blue[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.pink[400],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.green[500],
          tailwindConfig().theme.colors.red[600],
          // tailwindConfig().theme.colors.blue[300],
          // tailwindConfig().theme.colors.blue[500],
          // tailwindConfig().theme.colors.blue[700],
          // tailwindConfig().theme.colors.blue[900],
        ],
        borderWidth: 5,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-4 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Počet podle věkových period</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default DashboardCard06;
