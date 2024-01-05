(function ($) {
    "use strict";





    var ctx = document.getElementById("groupRadarChart");
    ctx.height = 160;
    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [["Group", "Workload Score"], ["Group Workload Per", "Revision Score"], ["Group Workload Per", "Unit Time Score"], ["Group Average Task", "Score"]],
            datasets: [


                
                {
                    label: "Group",
                    data: [7,8,6,4.5],
                    borderColor: "rgba(147,186,233, 0.6)",
                    borderWidth: "1",
                    backgroundColor: "rgba(147,186,233, 0.6)"
                },



                {
                    label: "Organization",
                    data: [9, 4, 4, 4],
                    borderColor: "rgba(27, 53, 80, 0.6)",
                    borderWidth: "1",
                    backgroundColor: "rgba(27, 53, 80, 0.6)"
                },








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