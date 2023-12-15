document.addEventListener('DOMContentLoaded', function () {
    (function ($) {
        "use strict";



        var ctx = document.getElementById("doughutChart1");
        var ctx2 = document.getElementById("doughutChart2");

        if (ctx) {
            ctx.height = 150;
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [65, 35],
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

        

        if (ctx2) {
            ctx2.height = 150;
            var myChart2 = new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [7.9, 2.1],
                        backgroundColor: [

                            "rgba(255, 193, 7,0.9)",
                            "rgba(0,0,0,0.1)",
                            
                        ],
                        hoverBackgroundColor: [
                            "rgba(255, 193, 7,0.8)",
                            "rgba(0, 0, 0, 0.1)"
                        ]

                    }],
                    labels: [
                        
                        "Employee Rating",

                        
                    ]
                },
                options: {
                    cutoutPercentage: 80,
                    responsive: true
                }
            });
        }



    })(jQuery);
});
