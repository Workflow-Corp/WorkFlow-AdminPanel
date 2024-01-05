(function ($) {
    //"use strict";

    // Function to format the deadline timestamp
    function formatDeadline(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    var taskList = document.getElementById('taskList');
    var taskListData = JSON.parse(taskList.getAttribute('data-flask'));

    // Now you can use taskListData as a JavaScript object
    console.log(taskListData);

    /*  Data Table
    -------------*/
    let dataTable;

    if ($.fn.DataTable.isDataTable('#userAnalytics-bootstrap-data-table')) {
        // DataTable is already initialized, destroy the existing instance
        $('#userAnalytics-bootstrap-data-table').DataTable().destroy();
    }

    // Initialize DataTable
    dataTable = $('#userAnalytics-bootstrap-data-table').DataTable({
        lengthMenu: [[3, 5, 10, 20, 50, -1], [3, 5, 10, 20, 50, "All"]],
        columns: [
            { width: '30%' }, // Set wider width for the "Title" column
            { width: '30%' }, // Use default width for other columns
            { width: '30%' },
            null,
            null,
        ]
    });

    function addRow(title, status, deadline, workload, taskId) {
        const formattedDeadline = formatDeadline(deadline);
        const rowData = [
            title,
            status,
            formattedDeadline,
            workload,
            `<button type="button" style="background-color: #93BAE9; color: #1b3550;" class="btn  task-btn" data-toggle="modal" data-target="#taskModal" data-task-id="${taskId}">
            ...
            </button>`
        ];
        dataTable.row.add(rowData).draw();

        // Add event listener for the task button inside addRow function
        const button = document.querySelector('.task-btn[data-task-id="' + taskId + '"]');
        button.addEventListener('click', function () {


            // Retrieve the taskId from the button's data-task-id attribute
            const clickedTaskId = this.getAttribute('data-task-id');
            $.ajax({
                url: `https://softeng.eskizzart.com/Task/GetTaskDetail?taskId=${clickedTaskId}`,
                method: 'GET',
                dataType: 'json',
                success: function (taskDetails) {
                    // Update modal content with taskDetails
             
                    const modalBody = document.querySelector('#taskModalBody');
                    modalBody.innerHTML = `
                    <p><strong>Title:</strong> ${taskDetails.title}</p>
                    <p><strong>Description:</strong> ${taskDetails.description}</p>
                    <p><strong>Start Time:</strong> ${formatDeadline(taskDetails.startTime)}</p>
                    <p><strong>End Time:</strong> ${formatDeadline(taskDetails.endTime)}</p>
                    <p><strong>Creator:</strong> ${taskDetails.creatorName}</p>
                    <p><strong>Status:</strong> ${taskDetails.status}</p>
                    <p><strong>Workload:</strong> ${taskDetails.workload}</p>
                    <p><strong>Finished Date:</strong> ${formatDeadline(taskDetails.finishedDate)}</p>
                    <p><strong>Revision Count:</strong> ${taskDetails.revisionCount}</p>
                    <p><strong>Score:</strong> ${taskDetails.score}</p>
                `;

                },
                error: function (error) {
                    console.error('Error fetching task details:', error);
                }
            });


        });
    }




    // Add rows using dummy data
    taskListData.forEach(data => addRow(data.title, data.status, data.endTime, data.workload, data.taskId));


    // Draw the table after adding rows
    dataTable.draw();

    $('#userAnalytics-bootstrap-data-table-export').DataTable({
        dom: 'lBfrtip',
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
    });

    $('#row-select').DataTable({
        initComplete: function () {
            this.api().columns().every(function () {
                var column = this;
                var select = $('<select class="form-control"><option value=""></option></select>')
                    .appendTo($(column.footer()).empty())
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex($(this).val());

                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            });
        }
    });

})(jQuery);
