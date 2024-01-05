document.addEventListener('DOMContentLoaded', function () {
    (function ($) {
        "use strict";

        var ctx = document.getElementById("userBarChart");
        ctx.height = 150;
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Workload",  "Revisions" ],
                datasets: [
                    {
                        label: "Employee",
                        data: [25, 4],
                        borderColor: "rgba(147,186,233,0.9)",
                        borderWidth: "0",
                        backgroundColor: "rgba(147,186,233, 0.8)"
                    }, {

                        label: "Organization",
                        data: [24,5, 3.5],
                        borderColor: "rgba(27,53,80, 0.9)",
                        borderWidth: "0",
                        backgroundColor: "rgba(27,53,80, 0.8)"

                    }




                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });



    })(jQuery);
});
