const itemForm = document.querySelector('#item-form');
const itemList = document.querySelector('.items');
const clearAllBtn = document.querySelector('#clear');
const filter = document.querySelector('.filter');
const formInput = document.querySelector('.form-input');


function displayItems(){
    const itemsFromLocalStorage = getItemsFromLocalStorage();
    itemsFromLocalStorage.forEach((item)=> addItemToDom(item));
    resetUI();
}

function onFormSubmit(e){
    e.preventDefault();
    if (e.target.textContent.trim() == 'Add Item'){
        addItem();
    }else{
        updateItem();
    }
}

function updateItem(){
    const oldItem = document.querySelector('.edit-mode');
    oldItem.remove();
    removeItemFormLocalStorage(oldItem.textContent);
    addItem();
    resetUI();
}


function addItem(){
    const formInput = document.querySelector('.form-input');
    if (formInput.value){
        // if (itemExists()){
        //     alert('This item already exists');
        //     return;
        // }
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
    }else {
        setItemToUpdate(e.target)
    }
}

function setItemToUpdate(item){
    const items = document.querySelectorAll('li')
    items.forEach(i =>i.className = '');
    item.className = 'edit-mode';
    formInput.value = item.textContent

    const addItemBtn = document.querySelector('.btn');
    addItemBtn.parentElement.innerHTML = `<button type="submit" class="btn">
        <i class="fa-solid fa-edit"></i> Update Item
    </button>`

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

function resetUI(){
    const addItemBtn = document.querySelector('.btn');
    addItemBtn.parentElement.innerHTML = `<button type="submit" class="btn">
        <i class="fa-solid fa-plus"></i> Add Item
    </button>`
    if (itemList.children.length === 0){
        clearAllBtn.style.display = 'none';
        filter.style.display = 'none';
    }else{
        clearAllBtn.style.display = 'block';
        filter.style.display = 'block';
        filter.firstElementChild.value = '';
    }
}

function init(){
    document.addEventListener('DOMContentLoaded', displayItems);
    itemForm.addEventListener('submit', onFormSubmit);
    itemList.addEventListener('click', onItemClick);
    clearAllBtn.addEventListener('click', clearAllItems);
    filter.addEventListener('input', filterItems);
    resetUI();
}

init();