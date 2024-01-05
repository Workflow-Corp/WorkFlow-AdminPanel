document.addEventListener('DOMContentLoaded', function () {
    (function ($) {
        "use strict";

        

        var ctx = document.getElementById("gaugeChartGroupAnalytics").getContext("2d");


        var gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'red');          // Start with green
        gradient.addColorStop(0.25, 'orange');  // Transition to lightgreen
        gradient.addColorStop(0.5, 'yellow');        // Transition to yellow
        gradient.addColorStop(0.75, 'lightgreen');       // Transition to orange
        gradient.addColorStop(1, 'green');
        var chart = new Chart(ctx, {
          type: 'gauge',
          data: {
            datasets: [{
              value: 7.5,
              data : [2, 4, 6, 8, 10],
              backgroundColor: ["red", "orange", "yellow", "lightgreen", "green"],
            }]
          },
          options: {

            cutoutPercentage: 80,
            needle: {
              radiusPercentage: 1.5,
              widthPercentage: 2,
              lengthPercentage: 80,
              color: 'rgba(27,53,80, 1)'
            },
            valueLabel: {
              display: true,
              color: 'rgba(255, 255, 255, 1)',
              backgroundColor: 'rgba(27,53,80, 1)',
              borderRadius: 8,
              fontSize: 12,

              padding: {
                top: 10,
                bottom: 10
              }
            }
          }
        });
    })(jQuery);
});
