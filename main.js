const itemForm = document.querySelector('#item-form');
const itemList = document.querySelector('.items');
const clearAllBtn = document.querySelector('#clear');
const filter = document.querySelector('.filter');

function createListItem(itemName){
    li = document.createElement('li');
    li.appendChild(document.createTextNode(itemName));

    button = document.createElement('button');
    button.className = 'remove-item btn-link text-red';

    icon = document.createElement('i');
    icon.className = 'fa-solid fa-xmark';

    button.appendChild(icon)
    li.appendChild(button);
    itemList.appendChild(li);
}

function addItem(e){
    e.preventDefault();
    formInput = document.querySelector('.form-input');
    if (formInput.value){
        createListItem(formInput.value);
        formInput.value = '';
        resetUI();
    }
}

function removeItem(e){
    if (e.target.tagName === 'I'){
        e.target.parentElement.parentElement.remove();
        resetUI();
    }
}

function clearAllItems(e){
    while (itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    resetUI();
}

function resetUI(){
    if (itemList.children.length === 0){
        clearAllBtn.style.display = 'none';
        filter.style.display = 'none';
    }else{
        clearAllBtn.style.display = 'block';
        filter.style.display = 'block';
        filter.firstElementChild.value = '';
    }
}

function filterItems(e){
    const items = document.querySelectorAll('li');
    items.forEach(item=>{
        if (!item.textContent.toLowerCase().includes(e.target.value.toLowerCase())){
            item.style.display = 'none';
        }else{
            item.style.display = 'flex';
        }
    })
}

itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)
clearAllBtn.addEventListener('click', clearAllItems)
filter.addEventListener('input', filterItems);

resetUI();