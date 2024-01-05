document.addEventListener('DOMContentLoaded', function () {
    (function ($) {
        "use strict";

        var groupWorkloadRate = document.getElementById('groupWorkloadRate');
        var groupWorkloadRateData = JSON.parse(groupWorkloadRate.getAttribute('data-flask'));

        var employeeWorkloadRate = document.getElementById('employeeWorkloadRate');
        var employeeWorkloadRateData = JSON.parse(employeeWorkloadRate.getAttribute('data-flask'));


        var ctx = document.getElementById("doughutChart1");
        

        if (ctx) {
            ctx.height = 150;
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [groupWorkloadRateData, employeeWorkloadRateData ],
                        backgroundColor: [
                            "rgba(0, 194, 146,0.9)",
                            "rgba(0,0,0,0.07)"
                        ],
                        hoverBackgroundColor: [
                            "rgba(0, 194, 146,0.9)",
                            "rgba(0, 194, 146,0.7)"
                        ]

                    }],
                    labels: [
                        "Group Workload",
                        "Individual Workload",
                    ]
                },
                options: {
                    responsive: true
                }
            });
        }

        

      


    })(jQuery);
});
