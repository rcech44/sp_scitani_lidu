import React from 'react';
import BarChart01AgeSex from '../../charts/BarChart01AgeSex';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04AgeSex() {

  const chartData = {
    labels: [
      '0 - 4 roky',
      '5 - 9 let',
      '10 - 14 let',
      '15 - 19 let',
      '20 - 24 let',
      '25 - 29 let',
      '30 - 34 let',
      '35 - 39 let',
      '40 - 44 let',
      '45 - 49 let',
      '50 - 54 let',
      '55 - 59 let',
      '60 - 64 let',
      '65 - 69 let',
      '70 - 74 let',
      '75 - 79 let',
      '80 - 84 let',
      '85 - 89 let',
      '90 - 94 let',
      '95 - 99 let',
      '100 a více let'
    ],
    datasets: [
      // Light blue bars
      {
        label: 'žen',
        data: [
          273743, 267952,283743,238290,231724,290569,333508,347389,414631,426913,337187,331655,315642,356534,345900,249134,153868,92099,38676,7926,536
        ],
        backgroundColor: tailwindConfig().theme.colors.pink[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.pink[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'mužů',
        data: [
          286889,282072,294361,251546,245339,310599,357053,371700,443286,450703,350923,334736,300966,311547,272729,170234,89505,43212,14110,1927,111
        ],
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span:8 xl:col-span-9 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Počet žen a mužů podle pětiletých skupin</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart01AgeSex data={chartData} width={595} height={400} />
      {/* <BarChart data={chartData} width={595} height={248} /> */}
    </div>
  );
}

export default DashboardCard04AgeSex;
