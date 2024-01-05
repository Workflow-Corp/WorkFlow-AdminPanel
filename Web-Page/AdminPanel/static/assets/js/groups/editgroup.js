const chBoxes = document.querySelectorAll('#dropdown1 input[type="checkbox"]');
const dpBtn = document.getElementById('multiSelectDropdown1');
let mySelectedListItems = [];

function handleCB() {
    mySelectedListItems = [];
    let mySelectedListItemsText = '';

    chBoxes.forEach((checkbox) => {
        if (checkbox.checked) {
            mySelectedListItems.push(checkbox.value);
            mySelectedListItemsText += checkbox.getAttribute('data-firstname') + ', ';
        }
    });

    if (mySelectedListItems.length > 0) {
        if (mySelectedListItems.length > 1) {
            dpBtn.innerText = mySelectedListItemsText.slice(0, -2).split(',').slice(0, 1).join(', ') + '...';
        } else {
            dpBtn.innerText = mySelectedListItemsText.slice(0, -2);
        }
    } else {
        dpBtn.innerText = 'Select';
    }
}

chBoxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCB);
});






// Function to handle the click event on the edit icon
$('.stat-group-icon-edit .fa-edit').click(function () {
    // Get the userId attribute from the clicked icon
    var groupId = $(this).attr('groupId');

    $('#groupIdInput').val(groupId);


});




$(document).ready(function () {
    $('#newGroupleader').empty().append('<option value="">Select Group Leader</option>');
    var groupId;
    var selectedUsers = [];

    $('.stat-group-icon-edit').on('click', 'i.fa-edit', function () {
        groupId = $(this).attr('groupId');
        console.log('Group ID:', groupId);

        // Clear the selectedUsers array and the dropdown when the group ID is updated
        selectedUsers = [];
        $('#newGroupleader').empty().append('<option value="">Select Group Leader</option>');

        // Fetch names from API when the group ID is updated
        fetchNamesFromAPI();
    });

    // Part 1: Fetch names from API
    function fetchNamesFromAPI() {
        $.ajax({
            url: 'https://softeng.eskizzart.com/Group/GetGroupMembers',
            method: 'GET',
            data: { groupId: groupId },
            success: function (membersResponse) {
                console.log(membersResponse);

                // Handle successful response
                if (membersResponse && membersResponse.length > 0) {
                    // Process group members
                    membersResponse.forEach(function (member) {
                        // Add each member to the selectedUsers array
                        selectedUsers.push({
                            userId: member.memberId,
                            firstName: member.memberName.split(' ')[0]
                        });
                        console.log(member.memberName);
                    });

                    // Do something with the selectedUsers array, such as pushing to another API or updating UI
                    console.log(selectedUsers);

                    // Proceed to Part 2
                    fetchSelectedItems();
                } else {
                    // Handle empty or invalid response
                    console.error('Empty or invalid response from GetGroupMembers API');
                }
            },
            error: function (membersXhr, membersStatus, membersError) {
                // Handle errors in fetching group members
                console.error('Error fetching group members:', membersError);
            }
        });
    }



    function fetchSelectedItems() {
        // Now, get selected users from the dropdown
        $('#dropdown1 input[type="checkbox"]:checked').each(function () {
            var userId = $(this).val();
            var firstName = $(this).attr('data-firstname');

            // Check if the user is not already in the selectedUsers array
            if (!selectedUsers.some(user => user.userId === userId)) {
                selectedUsers.push({
                    userId: userId,
                    firstName: firstName
                });
            }
        });

        // Populate group leader dropdown with selected users
        $('#newGroupleader').empty().append('<option value="">Select Group Leader</option>');
        selectedUsers.forEach(function (user) {
            $('#newGroupleader').append('<option value="' + user.userId + '">' + user.firstName + '</option>');
        });
    }



    // Listen for changes in checkboxes
    $('#dropdown1 input[type="checkbox"]').change(function () {
        fetchSelectedItems();
    });
});
