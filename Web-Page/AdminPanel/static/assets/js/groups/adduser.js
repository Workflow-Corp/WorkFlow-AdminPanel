const chBoxes3 = document.querySelectorAll('#dropdown3 input[type="checkbox"]');
const dpBtn3 = document.getElementById('multiSelectDropdown3');
let mySelectedListItems3 = [];

function handleCB() {
    mySelectedListItems3 = [];
    let mySelectedListItems3Text = '';

    chBoxes3.forEach((checkbox) => {
        if (checkbox.checked) {
            mySelectedListItems3.push(checkbox.value);
            mySelectedListItems3Text += checkbox.getAttribute('data-firstname') + ', ';
        }
    });

    if (mySelectedListItems3.length > 0) {
        if (mySelectedListItems3.length > 4) {
            dpBtn3.innerText = mySelectedListItems3Text.split(',').slice(0, 4).join(', ') + '...';
        } else {
            dpBtn3.innerText = mySelectedListItems3Text.split(',').slice(0, 4);
        }
    } else {
        dpBtn3.innerText = 'Select';
    }
    
}

chBoxes3.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCB);
});



// Function to handle the click event on the edit icon
$('.stat-group-icon-add .fa-plus').click(function () {
    // Get the userId attribute from the clicked icon
    console.log("31")
    var groupId = $(this).attr('groupId');

    console.log("group ID:" , groupId);
    $('#groupIdAddUserInput').val(groupId);


});
