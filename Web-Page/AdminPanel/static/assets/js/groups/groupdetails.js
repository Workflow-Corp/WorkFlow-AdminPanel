$(document).ready(function () {
    $('.table').on('click', '.fa-bars', function () {
        var groupId = $(this).attr('groupId');

        if (groupId) {
            // First AJAX request to get group details
            $.ajax({
                url: 'https://softeng.eskizzart.com/Group/GetGroupDetailByGroupId',
                method: 'GET',
                data: { groupId: groupId },
                success: function (response) {
                    // Handle the successful response
                    console.log(response);

                    // Update the modal body with group details
                    updateModalWithDetails(response);

                    // Second AJAX request to get group members
                    $.ajax({
                        url: 'https://softeng.eskizzart.com/Group/GetGroupMembers',
                        method: 'GET',
                        data: { groupId: groupId },
                        success: function (membersResponse) {
                            // Handle the successful members response
                            console.log(membersResponse);

                            // Build the user list HTML
                            var userListHtml = '<strong>Group Members: </strong>' + '<br>';
                            membersResponse.forEach(function (member) {
                                userListHtml += member.memberName + '<br>';
                            });


                            // Append the user list to the existing modal body
                            appendUserListToModal(userListHtml);
                        },
                        error: function (membersXhr, membersStatus, membersError) {
                            // Handle errors in fetching group members
                            console.error('Error fetching group members:', membersError);
                        }
                    });


                },
                error: function (xhr, status, error) {
                    // Handle errors in fetching group details
                    console.error('Error fetching group details:', error);
                }
            });
        } else {
            console.error('groupId attribute not found');
        }
    });

    // Function to update modal body with group details
    function updateModalWithDetails(response) {
        // Build the modal content with group details
        var modalContent =
            '<strong>Group Name: </strong>' + response.name + '<br>' +
            '<strong>Description: </strong>' + response.description + '<br>' +
            '<strong>Creator: </strong>' + response.creatorName + '<br>' +
            '<strong>Leader: </strong>' + response.leaderName + '<br>' +
            '<strong>Workload Performed: </strong>' + response.workloadPerformed;

        // Update the modal body with the group details
        $('#groupDetailsModalBody').html(modalContent);
    }

    // Function to append user list to modal body
    function appendUserListToModal(userListHtml) {
        // Append the user list to the existing modal body
        $('#groupDetailsModalBody').append('<br>' + userListHtml);
    }
});