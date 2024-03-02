import React, { useRef, useEffect, useState } from 'react';
import { useThemeProvider } from '../utils/ThemeContext';

import { chartColors } from './ChartjsConfig';
import {
    Chart, BarController, BarElement, LinearScale, TimeScale, Tooltip, Legend,
} from 'chart.js';
import 'chartjs-adapter-moment';
import {age_sex_district_data, labels, labels_districts} from '../data/age_sex_district/data';

// Import utilities
import { tailwindConfig, formatValue } from '../utils/Utils';

Chart.register(BarController, BarElement, LinearScale, TimeScale, Tooltip, Legend);

function BarChart01({
    data,
    width,
    height
}) {

    const [chart, setChart] = useState(null)
    const [padding, setPadding] = useState({ top: 12, bottom: 16, left: 27, right: 20 }); // New state for padding
    const [updated_data, setData] = useState(data); // New state for padding
    const [updated_scaleYMin, setScaleYMin] = useState(0); // New state for padding
    const [updated_scaleYMax, setScaleYMax] = useState(600000); // New state for padding
    const canvas = useRef(null);
    const legend = useRef(null);
    const picker = useRef(null);
    const { currentTheme } = useThemeProvider();
    const darkMode = currentTheme === 'dark';
    const { textColor, gridColor, tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors;

    useEffect(() => {
        const ctx = canvas.current;
        // eslint-disable-next-line no-unused-vars
        const newChart = new Chart(ctx, {
            type: 'bar',
            data: updated_data,
            options: {
                layout: {
                    padding: padding,
                },
                scales: {
                    y: {
                        min: updated_scaleYMin,
                        max: updated_scaleYMax,
                        border: {
                            display: false,
                        },
                        ticks: {
                            maxTicksLimit: 5,
                            // callback: (value) => formatValue(value),
                            color: darkMode ? textColor.dark : textColor.light,
                        },
                        grid: {
                            color: darkMode ? gridColor.dark : gridColor.light,
                        },
                    },
                    x: {
                        // type: 'time',
                        // time: {
                        //   parser: 'MM-DD-YYYY',
                        //   unit: 'month',
                        //   displayFormats: {
                        //     month: 'MMM YY',
                        //   },
                        // },
                        border: {
                            display: false,
                        },
                        grid: {
                            display: false,
                        },
                        ticks: {
                            color: darkMode ? textColor.dark : textColor.light,
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            title: () => false, // Disable tooltip title
                            // label: (context) => formatValue(context.parsed.y),
                        },
                        bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
                        backgroundColor: darkMode ? tooltipBgColor.dark : tooltipBgColor.light,
                        borderColor: darkMode ? tooltipBorderColor.dark : tooltipBorderColor.light,
                    },
                },
                interaction: {
                    intersect: false,
                    mode: 'nearest',
                },
                animation: {
                    duration: 1000,
                },
                maintainAspectRatio: false,
                resizeDelay: 200,
            },
            plugins: [
                {
                    id: 'htmlLegend',
                    afterUpdate(c, args, options) {
                        const ul = legend.current;
                        if (!ul) return;
                        // Remove old legend items
                        while (ul.firstChild) {
                            ul.firstChild.remove();
                        }
                        // Reuse the built-in legendItems generator

                        const items = c.options.plugins.legend.labels.generateLabels(c);
                        items.forEach((item) => {
                            const li = document.createElement('li');
                            li.style.marginRight = tailwindConfig().theme.margin[10];
                            // Button element
                            const button = document.createElement('button');
                            button.style.display = 'inline-flex';
                            button.style.alignItems = 'center';
                            button.style.opacity = item.hidden ? '.3' : '';
                            button.onclick = () => {
                                c.setDatasetVisibility(item.datasetIndex, !c.isDatasetVisible(item.datasetIndex));
                                c.update();
                            };
                            // Color box
                            const box = document.createElement('span');
                            box.style.display = 'block';
                            box.style.width = tailwindConfig().theme.width[4];
                            box.style.height = tailwindConfig().theme.height[4];
                            box.style.borderRadius = tailwindConfig().theme.borderRadius.full;
                            box.style.marginRight = tailwindConfig().theme.margin[2];
                            box.style.borderWidth = '3px';
                            box.style.borderColor = item.fillStyle;
                            box.style.backgroundColor = item.fillStyle;
                            box.style.pointerEvents = 'none';

                            // Label
                            const labelContainer = document.createElement('span');
                            labelContainer.style.display = 'flex';
                            labelContainer.style.alignItems = 'center';
                            const value = document.createElement('span');
                            value.classList.add('text-slate-800', 'dark:text-slate-100');
                            value.style.fontSize = tailwindConfig().theme.fontSize['3xl'][0];
                            value.style.lineHeight = tailwindConfig().theme.fontSize['3xl'][1].lineHeight;
                            value.style.fontWeight = tailwindConfig().theme.fontWeight.bold;
                            value.style.marginRight = tailwindConfig().theme.margin[2];
                            value.style.pointerEvents = 'none';
                            const label = document.createElement('span');
                            label.classList.add('text-slate-500', 'dark:text-slate-400');
                            label.style.fontSize = tailwindConfig().theme.fontSize.sm[0];
                            label.style.lineHeight = tailwindConfig().theme.fontSize.sm[1].lineHeight;
                            const theValue = c.data.datasets[item.datasetIndex].data.reduce((a, b) => a + b, 0);
                            const valueText = document.createTextNode(theValue.toLocaleString());
                            const labelText = document.createTextNode(item.text);
                            value.appendChild(valueText);
                            label.appendChild(labelText);
                            li.appendChild(button);
                            button.appendChild(box);
                            button.appendChild(labelContainer);
                            labelContainer.appendChild(value);
                            labelContainer.appendChild(label);
                            ul.appendChild(li);
                        });
                    },
                },
            ],
        });
        setChart(newChart);


        return () => newChart.destroy();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updated_data]);

    useEffect(() => {
        if (!chart) return;

        if (darkMode) {
            chart.options.scales.x.ticks.color = textColor.dark;
            chart.options.scales.y.ticks.color = textColor.dark;
            chart.options.scales.y.grid.color = gridColor.dark;
            chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
            chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
            chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
        } else {
            chart.options.scales.x.ticks.color = textColor.light;
            chart.options.scales.y.ticks.color = textColor.light;
            chart.options.scales.y.grid.color = gridColor.light;
            chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
            chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
            chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
        }
        chart.update('none');
    }, [currentTheme]);

    // Handler for changing padding
    const handleDataClick = (value) => {
        // Assuming the value is a string like "small", "medium", "large"
        let newDistrict = age_sex_district_data[value];

        const new_data = {
            labels: labels,
            datasets: [
                {
                    label: 'žen',
                    data: newDistrict['data']['women'],
                    backgroundColor: tailwindConfig().theme.colors.pink[400],
                    hoverBackgroundColor: tailwindConfig().theme.colors.pink[500],
                    barPercentage: 0.66,
                    categoryPercentage: 0.66,
                },
                {
                    label: 'mužů',
                    data: newDistrict['data']['men'],
                    backgroundColor: tailwindConfig().theme.colors.indigo[500],
                    hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
                    barPercentage: 0.66,
                    categoryPercentage: 0.66,
                },
            ],
        };

        document.getElementById("dropdownDefaultButton").innerHTML = newDistrict['name'];
        setData(new_data);
        if (value == 1)
        {
            setScaleYMax(600000);
        }
        else
        {
            setScaleYMax(80000);
        }
    };

    return (
        <React.Fragment>
            <div className="px-5 py-3">
                <ul ref={legend} className="flex flex-wrap justify-center"></ul>
            </div>
            <div className="grow">
                <canvas ref={canvas} width={width} height={height}></canvas>
            </div>
            <button id="dropdownDefaultButton" data-dropdown-placement="top" data-dropdown-toggle="dropdown" className="text-black bg-indigo-200 hover:bg-indigo-400 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Česká republika
                <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                </svg>
            </button>

            <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <div class="py-2">
                    <a href="#" onClick={(e) => { e.preventDefault(); handleDataClick(1); }} class="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Česká republika</a>
                </div>
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleDataClick(3026); }} class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Středočeský kraj</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleDataClick(3018); }} class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Hlavní město Praha</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleDataClick(3115); }} class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Jihomoravský kraj</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleDataClick(3140); }} class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Moravskoslezský kraj</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleDataClick(3069); }} class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Ústecký kraj</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleDataClick(3034); }} class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Jihočeský kraj</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleDataClick(3123); }} class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Olomoucký kraj</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleDataClick(3042); }} class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Plzeňský kraj</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleDataClick(3131); }} class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Zlínský kraj</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleDataClick(3085); }} class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Královéhradecký kraj</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleDataClick(3093); }} class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Pardubický kraj</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleDataClick(3107); }} class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Kraj Vysočina</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleDataClick(3077); }} class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Liberecký kraj</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleDataClick(3051); }} class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Karlovarský kraj</a></li>
                </ul>
            </div>
        </React.Fragment>
    );
}

export default BarChart01;
