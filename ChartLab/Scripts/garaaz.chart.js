let chart;

// Set background color of canvas
Chart.pluginService.register({
    beforeDraw: function (chart) {
        if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
            //var helpers = Chart.helpers;
            const ctx = chart.chart.ctx;
            const chartArea = chart.chartArea;

            ctx.save();
            ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);

            ctx.restore();
        }
    }
});

let gChart = {
    DrawLineChart: function (labelsArr, sales, salesToCompare, titleText, xAxisLabel) {

        if (chart != undefined) {
            chart.destroy();
        }

        // Colors
        const red = 'rgb(255, 99, 132)';

        const config = {

            type: 'line',
            data: {
                labels: labelsArr,
                datasets: [{
                    label: 'Sale 1',
                    fill: false,
                    backgroundColor: red,
                    borderColor: red,
                    data: sales
                }]
            },

            // Configuration options go here
            options: {
                responsive: true,
                maintainAspectRatio: true,
                title: {
                    display: true,
                    text: titleText
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: xAxisLabel,
                            fontColor: '#3498DB',
                            fontSize: 15
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Sales (in ₹)',
                            fontColor: '#3498DB',
                            fontSize: 15
                        }
                    }]
                }
            }
        };

        const ctx = $('#salesChart');
        chart = new Chart(ctx, config);

        // If user is comparing, update the chart
        if (salesToCompare.length > 0) {
            const blue = 'rgb(54, 162, 235)';
            const newDataset = {
                label: 'Sale 2',
                fill: false,
                backgroundColor: blue,
                borderColor: blue,
                data: salesToCompare
            };

            config.data.datasets.push(newDataset);
            chart.update();
        }
    },
    DrawBarChart: function (labelsArr, sales) {

        if (chart != undefined) {
            chart.destroy();
        }

        const blue = '#00c7ff';
        const gray = 'rgba(28, 34, 42, 0.08)';

        const config = {
            type: 'bar',
            data: {
                labels: labelsArr,
                datasets: [{
                    label: 'Absence count',
                    fill: false,
                    backgroundColor: blue,
                    borderColor: blue,
                    data: sales
                }]
            },

            // Configuration options go here
            options: {
                responsive: true,
                maintainAspectRatio: true,
                // Custom setting
                //chartArea: {
                //    backgroundColor: 'rgba(251, 85, 85, 0.4)'
                //},
                legend: {
                    display: false, // The Absence count is called legend
                    position: 'bottom',
                    labels: {
                        fontColor: '#333'
                    }
                },
                tooltips: {
                    enabled: false,
                    mode: 'index',
                    intersect: true
                },
                hover: {
                    mode: null
                },
                scales: {
                    xAxes: [{
                        display: true,
                        barThickness: 9, // Controls width of bar
                        maxBarThickness: 10,
                        gridLines: {
                            display: true,
                            color: gray,
                            borderDash: [8, 1]
                        }
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            display: true,
                            color: gray,
                            borderDash: [8, 1]
                        }
                    }]
                }
            }
        };

        const ctx = $('#salesChart');
        chart = new Chart(ctx, config);
    }
};