const chBoxesAuth = document.querySelectorAll('#dropdownAuth input[type="checkbox"]');
const dpBtnAuth = document.getElementById('multiSelectDropdownAddAuth');
let mySelectedListItemsAuth = [];

function handleCB() {
    mySelectedListItemsAuth = [];
    let mySelectedListItemsAuthText = '';

    chBoxesAuth.forEach((checkbox) => {
        if (checkbox.checked) {
            mySelectedListItemsAuth.push(checkbox.value);
            mySelectedListItemsAuthText += checkbox.getAttribute('tag-name') + ', ';
        }
    });

    console.log(mySelectedListItemsAuth)

    if (mySelectedListItemsAuth.length > 0) {
        if (mySelectedListItemsAuth.length > 4) {
            dpBtnAuth.innerText = mySelectedListItemsAuthText.split(',').slice(0, 4).join(', ') + '...';
        } else {
            dpBtnAuth.innerText = mySelectedListItemsAuthText.split(',').slice(0, 4);
        }
    } else {
        dpBtnAuth.innerText = 'Select';
    }
    
}

chBoxesAuth.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCB);
});
