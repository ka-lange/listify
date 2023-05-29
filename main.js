const form = document.querySelector('#todoForm')
const input = document.querySelector('#todoInput')
const list = document.querySelector('#todoList');
let todoItems = []

form.addEventListener('submit', event => {
    event.preventDefault();  //prevents page from refreshing on enter
    addItem(input.value)
})

function addItem(text) {
    if(text !== ''){
        const todo = {
            name: text,
            id: Date.now(),  //this adds a unique id to the item based on the date/time
            completed: false
        }
        todoItems.push(todo); //add new todo item to array list
        addToLocalStorage(todoItems);
        input.value = '';  //resets input value to blank after submit
    }
}

// function to add todo items to local storage
function addToLocalStorage(todoItems) {
    localStorage.setItem('todoItemsReference', JSON.stringify(todoItems));
    renderItems(todoItems);
}

function renderItems(todoItems) {
    list.innerHTML = '';
    todoItems.forEach(item => {
        const checked = item.completed ? 'checked': null;
        const li = document.createElement('li');
        li.setAttribute('data-key', item.id);
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${checked}> 
            ${item.name}
        `;
        list.append(li);
    });
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todoItemsReference');
    if (reference) {
      todoItems = JSON.parse(reference);
      renderItems(todoItems);
    }
  }
getFromLocalStorage(); //initializes on page refresh
