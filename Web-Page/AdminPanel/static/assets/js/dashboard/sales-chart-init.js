(function ($) {
    "use strict";

    var totalAveragesMonthlyElement = document.getElementById('totalAveragesMonthly');
    var totalAveragesMonthlyData = JSON.parse(totalAveragesMonthlyElement.getAttribute('data-flask'));

     


    
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth(); // Get the current month (0-indexed)

    var labelsDynamic = [];
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Function to get the labels and datasets based on the current month
    function generateChartData(currentMonth) {
        
        var datasets = [];

        for (var i = 0; i < 12; i++) {
            var monthIndex = (currentMonth +1 + i) % 12; // Wrap around to the beginning if needed
            labelsDynamic.push(monthNames[monthIndex]);

    
        } }

    generateChartData(currentMonth);

    var ctx = document.getElementById("workload-chart");
    ctx.height = 150;
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels : labelsDynamic,
            type: 'line',
            defaultFontFamily: 'Montserrat',
            datasets: [ {
                label: "Average Workload",
                data: totalAveragesMonthlyData,
                backgroundColor: 'transparent',
                borderColor: 'rgba(84,105,206,0.75)',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(84,105,206,0.75)',
            }]
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
                display: false,
               
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


})(jQuery);