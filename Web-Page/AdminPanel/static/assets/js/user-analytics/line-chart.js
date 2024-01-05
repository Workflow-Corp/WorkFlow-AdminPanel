(function ($) {
    "use strict";

    var ctx = document.getElementById("user-line-chart");

    var performance12 = document.getElementById('performance12');
    var totalAveragesMonthlyData = JSON.parse(performance12.getAttribute('data-flask'));

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth(); // Get the current month (0-indexed)

    var labelsDynamic = [];
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function shiftArray(arr, shiftAmount) {
        return arr.slice(shiftAmount).concat(arr.slice(0, shiftAmount));
    }
    
    // Shift the totalAveragesMonthlyData array based on the current month
    totalAveragesMonthlyData = shiftArray(totalAveragesMonthlyData, 1);
    

    // Function to get the labels and datasets based on the current month
    function generateChartData(currentMonth) {
        
        var datasets = [];

        for (var i = 0; i < 12; i++) {
            var monthIndex = (currentMonth +1 + i) % 12; // Wrap around to the beginning if needed
            labelsDynamic.push(monthNames[monthIndex]);

    
        } }

   

    generateChartData(currentMonth);

    if (ctx) {
        ctx.height = 150;

        // Initial datasets
        var initialDatasets = [
            {
                label: "Employee Workload Score",
                data: totalAveragesMonthlyData.map(item => item.workloadScore),
                backgroundColor: 'transparent',
                borderColor: 'rgba(220,53,69,0.75)',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(220,53,69,0.75)',
                id: 1
            },
            {
                label: "Workload Per Revision Score",
                data: totalAveragesMonthlyData.map(item => item.workloadPerRevisionScore),
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
                label: "Workload Per Unit Time Score",
                data: totalAveragesMonthlyData.map(item => item.workloadPerUnitTimeScore),
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
                data: totalAveragesMonthlyData.map(item => item.averageTaskScore),
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
                data: totalAveragesMonthlyData.map(item => item.employeeRating),
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
                labels: labelsDynamic,
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
