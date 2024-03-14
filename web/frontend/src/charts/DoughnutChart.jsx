import React, { useRef, useEffect, useState } from "react";
import { useThemeProvider } from "../utils/ThemeContext";

import { chartColors } from "./ChartjsConfig";
import {
  Chart,
  DoughnutController,
  ArcElement,
  TimeScale,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-moment";

// Import utilities
import { tailwindConfig } from "../utils/Utils";

Chart.register(DoughnutController, ArcElement, TimeScale, Tooltip);

function DoughnutChart({ data, width, height }) {
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const legend = useRef(null);
  const legend2 = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";
  const {
    tooltipTitleColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor,
  } = chartColors;

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const newChart = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        cutout: "60%",
        layout: {
          padding: 0,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            titleColor: darkMode
              ? tooltipTitleColor.dark
              : tooltipTitleColor.light,
            bodyColor: darkMode
              ? tooltipBodyColor.dark
              : tooltipBodyColor.light,
            backgroundColor: darkMode
              ? tooltipBgColor.dark
              : tooltipBgColor.light,
            borderColor: darkMode
              ? tooltipBorderColor.dark
              : tooltipBorderColor.light,
          },
        },
        interaction: {
          intersect: false,
          mode: "nearest",
        },
        animation: {
          duration: 500,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
      plugins: [
        {
          id: "htmlLegend",
          afterUpdate(c, args, options) {
            // const ul2 = legend2.current;
            // if (!ul2) return;
            // // Remove old legend items
            // while (ul2.firstChild) {
            //   ul2.firstChild.remove();
            // }
            // // Reuse the built-in legendItems generator
            // const items2 = c.options.plugins.legend.labels.generateLabels(c);
            // items2.forEach((item) => {
            //   const li = document.createElement('li');
            //   li.style.marginRight = tailwindConfig().theme.margin[10];
            //   // Button element
            //   const button = document.createElement('button');
            //   button.style.display = 'inline-flex';
            //   button.style.alignItems = 'center';
            //   button.style.opacity = item.hidden ? '.3' : '';
            //   button.onclick = () => {
            //     c.toggleDataVisibility(item.index);
            //     c.update();
            //   };
            //   // Color box
            //   const box = document.createElement('span');
            //   box.style.display = 'block';
            //   box.style.width = tailwindConfig().theme.width[4];
            //   box.style.height = tailwindConfig().theme.height[4];
            //   box.style.borderRadius = tailwindConfig().theme.borderRadius.full;
            //   box.style.marginRight = tailwindConfig().theme.margin[2];
            //   box.style.borderWidth = '3px';
            //   box.style.borderColor = item.fillStyle;
            //   box.style.backgroundColor = item.fillStyle;
            //   box.style.pointerEvents = 'none';

            //   // Label
            //   const labelContainer = document.createElement('span');
            //   labelContainer.style.display = 'flex';
            //   labelContainer.style.alignItems = 'center';
            //   const value = document.createElement('span');
            //   value.classList.add('text-slate-800', 'dark:text-slate-100');
            //   value.style.fontSize = tailwindConfig().theme.fontSize['3xl'][0];
            //   value.style.lineHeight = tailwindConfig().theme.fontSize['3xl'][1].lineHeight;
            //   value.style.fontWeight = tailwindConfig().theme.fontWeight.bold;
            //   value.style.marginRight = tailwindConfig().theme.margin[2];
            //   value.style.pointerEvents = 'none';
            //   const label = document.createElement('span');
            //   label.classList.add('text-slate-500', 'dark:text-slate-400');
            //   label.style.fontSize = tailwindConfig().theme.fontSize.sm[0];
            //   label.style.lineHeight = tailwindConfig().theme.fontSize.sm[1].lineHeight;
            //   console.log(c.data.datasets[0]['data'])
            //   // const theValue = c.data.datasets[item.datasetIndex];
            //   // const valueText = document.createTextNode(theValue.toLocaleString());
            //   // const labelText = document.createTextNode(item.text);
            //   // value.appendChild(valueText);
            //   // label.appendChild(labelText);
            //   li.appendChild(button);
            //   button.appendChild(box);
            //   button.appendChild(labelContainer);
            //   labelContainer.appendChild(value);
            //   labelContainer.appendChild(label);
            //   ul2.appendChild(li);
            // });

            const ul = legend.current;
            if (!ul) return;
            // Remove old legend items
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            // Reuse the built-in legendItems generator
            const items = c.options.plugins.legend.labels.generateLabels(c);
            items.forEach((item) => {
              const li = document.createElement("li");
              li.style.margin = tailwindConfig().theme.margin[1];
              // Button element
              const button = document.createElement("button");
              button.classList.add(
                "btn-xs",
                "bg-white",
                "dark:bg-slate-800",
                "text-slate-500",
                "dark:text-slate-400",
                "border",
                "border-slate-200",
                "dark:border-slate-700",
                "shadow-md"
              );
              button.style.opacity = item.hidden ? ".3" : "";
              button.onclick = () => {
                c.toggleDataVisibility(item.index);
                c.update();
              };
              // Color box
              const box = document.createElement("span");
              box.style.display = "block";
              box.style.width = tailwindConfig().theme.width[2];
              box.style.height = tailwindConfig().theme.height[2];
              box.style.backgroundColor = item.fillStyle;
              box.style.borderRadius = tailwindConfig().theme.borderRadius.sm;
              box.style.marginRight = tailwindConfig().theme.margin[1];
              box.style.pointerEvents = "none";
              // Label
              const label = document.createElement("span");
              label.style.display = "flex";
              label.style.alignItems = "center";
              const labelText = document.createTextNode(item.text);
              label.appendChild(labelText);
              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(label);
              ul.appendChild(li);
            });
          },
        },
      ],
    });
    setChart(newChart);
    return () => newChart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chart) return;

    if (darkMode) {
      chart.options.plugins.tooltip.titleColor = tooltipTitleColor.dark;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
    } else {
      chart.options.plugins.tooltip.titleColor = tooltipTitleColor.light;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
    }
    chart.update("none");
  }, [currentTheme]);

  return (
    <React.Fragment>
      <div className="grow flex flex-col justify-center">
        <div className="px-5 py-3">
          <ul ref={legend2} className="flex flex-wrap"></ul>
        </div>
        <div>
          <canvas ref={canvas} width={width} height={height}></canvas>
        </div>
        <div className="px-5 pt-10 pb-6">
          <ul ref={legend} className="flex flex-wrap justify-center -m-1"></ul>
        </div>
      </div>
      <button id="dropdownDefaultButton" data-dropdown-placement="top" data-dropdown-toggle="dropdown" className="text-black bg-indigo-200 hover:bg-indigo-400 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Muži
                <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                </svg>
            </button>

            <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleDataClick(3026); }} class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Muži</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleDataClick(3018); }} class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Ženy</a></li>
                </ul>
            </div>
    </React.Fragment>
  );
}

export default DoughnutChart;
