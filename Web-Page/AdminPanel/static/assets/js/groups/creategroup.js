const chBoxes2 = document.querySelectorAll('#dropdown2 input[type="checkbox"]');
const dpBtn2 = document.getElementById('multiSelectDropdown2');
let mySelectedListItems2 = [];

function handleCB() {
    mySelectedListItems2 = [];
    let mySelectedListItems2Text = '';

    chBoxes2.forEach((checkbox) => {
        if (checkbox.checked) {
            mySelectedListItems2.push(checkbox.value);
            mySelectedListItems2Text += checkbox.getAttribute('data-firstname') + ', ';
        }
    });

    if (mySelectedListItems2.length > 0) {
        if (mySelectedListItems2.length > 3) {
            dpBtn2.innerText = mySelectedListItems2Text.slice(0, -2).split(',').slice(0, 3).join(', ') + '...';
        } else {
            dpBtn2.innerText = mySelectedListItems2Text.slice(0, -2);
        }
    } else {
        dpBtn2.innerText = 'Select';
    }
}

chBoxes2.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCB);
});

$(document).ready(function () {

    
    var selectedUsers = [];


    // Part 2: Fetch selected items
    function fetchSelectedItems() {
        // Clear the existing options in the dropdown
        $('#groupleader').empty();

        // Now, get selected users from the dropdown
        $('#dropdown2 input[type="checkbox"]:checked').each(function () {
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
        selectedUsers.forEach(function (user) {
            $('#groupleader').append('<option value="' + user.userId + '">' + user.firstName + '</option>');
        });
    }

    // Listen for changes in checkboxes
    $('#dropdown2 input[type="checkbox"]').change(function () {
        fetchSelectedItems();
    });
});
