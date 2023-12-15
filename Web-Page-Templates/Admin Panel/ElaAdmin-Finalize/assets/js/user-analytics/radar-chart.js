(function ($) {
    "use strict";

var ctx = document.getElementById("radarChart");
ctx.height = 160;
var myChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: [["Employee ", "Workload Rate"], ["Workload Per", "Revision"], ["Workload Per", "Unit Time"], ["Average Task", "Score"]],
        datasets: [
            {
                label: "     Employee Data",
                data: [5, 6, 8, 7.4 ],
                borderColor: "rgba(27, 53, 80, 0.6)",
                borderWidth: "1",
                backgroundColor: "rgba(27, 53, 80, 0.6)"
            },

           
                {
                    label: "",
                    data: [10, 10, 10, 10],
                    borderColor: "rgba(255, 255, 255, 0)",
                    borderWidth: "1",
                    backgroundColor: "rgba(255, 255, 255, 0)"
                },
           
        ]
    },
    options: {
        legend: {
            position: 'top'
        },
        scale: {
            ticks: {
                beginAtZero: true
            }
        }
    }
});


})(jQuery);