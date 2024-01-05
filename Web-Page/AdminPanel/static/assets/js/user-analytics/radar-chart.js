(function ($) {
    "use strict";

    var performance12 = document.getElementById('performance12');
    var totalAveragesMonthlyData = JSON.parse(performance12.getAttribute('data-flask'));
    var januaryData = totalAveragesMonthlyData[0];

    var ctx = document.getElementById("radarChart");
    ctx.height = 160;
    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [["Employee ", "Workload Score"], ["Workload Per", "Revision Score"], ["Workload Per", "Unit Time Score"], ["Average Task", "Score"]],
            datasets: [


                {
                    label: "Employee",
                    data: [januaryData.workloadScore, januaryData.workloadPerRevisionScore, januaryData.workloadPerUnitTimeScore, januaryData.averageTaskScore],
                    borderColor: "rgba(147,186,233, 0.6)",
                    borderWidth: "1",
                    backgroundColor: "rgba(147,186,233, 0.6)"
                },
                {
                    label: "Organization",
                    data: [6, 6.5, 6.3, 7],
                    borderColor: "rgba(27, 53, 80, 0.6)",
                    borderWidth: "1",
                    backgroundColor: "rgba(27, 53, 80, 0.6)"
                }







            ]
        },
        options: {
            legend: {
                position: 'top'
            },
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });


})(jQuery);