(function ($) {
    "use strict";

    var ctx = document.getElementById("user-line-chart");

    if (ctx) {
        ctx.height = 150;

        // Initial datasets
        var initialDatasets = [{
            label: "Employee Workload Rate",
            data: [9, 7, 8, 5, 4, 3, 2, 6, 5, 4, 2, 8],
            backgroundColor: 'transparent',
            borderColor: 'rgba(220,53,69,0.75)',
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'rgba(220,53,69,0.75)',
            id:1
        },
        {
            label: "Workload Per Revision",
            data: [3, 9, 7, 1, 8, 7, 6, 3, 9, 1, 10, 6],
            backgroundColor: 'transparent',
            borderColor: 'rgba(245, 68, 173, 0.75)',
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'rgba(245, 68, 173, 0.75)',
            id: 2

        },
        {
            label: "Workload Per Unit Time",
            data: [5, 8, 7, 10, 6, 9, 3, 2, 4, 8, 5, 2],
            backgroundColor: 'transparent',
            borderColor: 'rgba(56, 34, 221, 0.75)',
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'rgba(56, 34, 221, 0.75)',
            id: 3
        },
        {
            label: "Average Task Score",
            data: [9, 4, 7, 2, 3, 6, 1, 8, 7, 4, 6, 3],
            backgroundColor: 'transparent',
            borderColor: 'rgba(11, 187, 42, 0.75)',
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'rgba(11, 187, 42, 0.75)',
            id: 4
        },
        {
            label: "Employee Rating",
            data: [6, 7, 7, 5, 5, 6, 3, 5, 6, 4, 6, 5],
            backgroundColor: 'transparent',
            borderColor: 'rgba(255, 193, 7,0.75)',
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'rgba(255, 193, 7,0.75)',
            id: 5
        }
        ];

        // Create chart with initial datasets
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                defaultFontFamily: 'Montserrat',
                datasets: initialDatasets
            },
            options: {
                responsive: true,
                tooltips: {
                    mode: 'index',
                    titleFontSize: 12,
                    titleFontColor: '#000',
                    bodyFontColor: '#000',
                    backgroundColor: '#fff',
                    titleFontFamily: 'Montserrat',
                    bodyFontFamily: 'Montserrat',
                    cornerRadius: 3,
                    intersect: false,
                },
                legend: {
                    display: true,
                    labels: {
                        usePointStyle: true,
                        fontFamily: 'Montserrat',
                    },
                },
                scales: {
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: true,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            display: true,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                },
                title: {
                    display: false,
                }
            }
        });

       
    }
})(jQuery);
