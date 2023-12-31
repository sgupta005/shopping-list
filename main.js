const itemForm = document.querySelector('#item-form');
const itemList = document.querySelector('.items');
const clearAllBtn = document.querySelector('#clear');
const filter = document.querySelector('.filter');

function displayItems(){
    const itemsFromLocalStorage = getItemsFromLocalStorage();
    itemsFromLocalStorage.forEach((item)=> addItemToDom(item));
    resetUI();
}

function addItem(e){
    e.preventDefault();
    formInput = document.querySelector('.form-input');
    if (formInput.value){
        addItemToDom(formInput.value);
        addItemToLocalStorage(formInput.value);
        formInput.value = '';
        resetUI();
    }
}

function addItemToDom(itemName){
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

function addItemToLocalStorage(item){
    const itemsFromLocalStorage = getItemsFromLocalStorage();
    itemsFromLocalStorage.push(item);
    localStorage.setItem('items',JSON.stringify(itemsFromLocalStorage));
}

function getItemsFromLocalStorage(){
    let itemsFromLocalStorage;
    if (localStorage.getItem('items')===null){
        itemsFromLocalStorage = [];
    }else{
        itemsFromLocalStorage = JSON.parse(localStorage.getItem('items'))
    }
    return itemsFromLocalStorage;
}

function onItemClick(e){
    if (e.target.tagName === 'I'){
        removeItem(e.target.parentElement.parentElement);
    }
}

function removeItem(item){
    item.remove();
    removeItemFormLocalStorage(item.textContent);
    resetUI();
}

function removeItemFormLocalStorage(item){
    let itemsFromLocalStorage = getItemsFromLocalStorage();
    itemsFromLocalStorage = itemsFromLocalStorage.filter(i => i!==item);
    localStorage.setItem('items', JSON.stringify(itemsFromLocalStorage));

}

function clearAllItems(e){
    while (itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem('items');
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

document.addEventListener('DOMContentLoaded', displayItems);
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', onItemClick);
clearAllBtn.addEventListener('click', clearAllItems);
filter.addEventListener('input', filterItems);

resetUI();