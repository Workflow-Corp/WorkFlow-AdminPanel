(function ($) {
    //"use strict";

    /*  Data Table
    -------------*/
    let dataTable;

    var tagList = document.getElementById('tagList');
    var tagListData = JSON.parse(tagList.getAttribute('data-flask'));

    if ($.fn.DataTable.isDataTable('#authorizations-bootstrap-data-table')) {
        // DataTable is already initialized, destroy the existing instance
        $('#authorizations-bootstrap-data-table').DataTable().destroy();
    }

    // Initialize DataTable
    dataTable = $('#authorizations-bootstrap-data-table').DataTable({
        lengthMenu: [[5, 10, 20, 50, -1], [5, 10, 20, 50, "All"]],
		columns: [
            { width: '20%' }, // Set wider width for the "Title" column
        	{width: '70%'}, // Use default width for other columns
			{width: '5%'},
            {width: '5%'},
           
           
        ]
    });

	function addRow(TagName, Value, description, EditLink) {
        // Truncate the description to 50 characters
        

        const rowData = [TagName,  description, Value, EditLink];
        dataTable.row.add(rowData).draw();
    }

    // Function to truncate description to a specified number of characters
 
  
    // Add rows using dummy data
    tagListData.forEach(data => addRow(data.name, data.hierarchyPoint , data.description, "<a href=\"#\"><i class=\"fa fa-edit\" style=\"color: blue\"></i></a>"));

    // Draw the table after adding rows
    dataTable.draw();

    $('#authorizations-bootstrap-data-table-export').DataTable({
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
