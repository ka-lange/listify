const form = document.querySelector('#todoForm')
const input = document.querySelector('#todoInput')
const list = document.querySelector('#todoList');
// let todoItems = []
// const editButton = `<i class="bi bi-pencil"></i>`
// const deleteButton = `<i class="bi bi-trash"></i>`

class Storage {
    static addToStorage(todoArr){
        let storage = localStorage.setItem('todo', JSON.stringify(todoArr))
        return storage;
    }   
    static getStorage(){
        let storage = localStorage.getItem('todo') === null ?
        [] : JSON.parse(localStorage.getItem('todo'));
        return storage
    }
}

//empty array
let todoArr = Storage.getStorage();

form.addEventListener('submit', event => {
    event.preventDefault();  //prevents page from refreshing on enter
    
    // addItem(input.value)
    let id = Date.now();
    const todo = new Todo(id, input.value)
    todoArr = [...todoArr, todo] //adds new Todo to todoArray
    
    //on submit - update and change the user interface based on what is in storage
    Interface.displayTodoArr(); //displays todoArr in user interface
    Interface.clearInput(); //clears form input field after submit
    Interface.removeTodo(); //removes todo item if clicked trash icon
    Interface.editTodo();
    Storage.addToStorage(todoArr); //add updated todoArr to local storage
})

class Todo {
    constructor(id, todo){
        this.id = id;
        this.todo = todo
    }
}

//display todo in the Dom;
class Interface{
    static displayTodoArr(){
        let displayTodoArr = todoArr.map((item)=>{
           return `
            <div class="todo d-flex">
                <p class="flex-grow-1">${item.todo}</p>
                <div class='icon'>
                    <i class='remove bi bi-trash' data-id=${item.id}></i>
                    <i class='edit bi bi-pencil' data-id=${item.id}></i>
                </div>
           </div>
           ` 
        });
        list.innerHTML = (displayTodoArr).join(" ")
    }
    static clearInput(){
        input.value = '';
    }
    static removeTodo(){
        list.addEventListener('click', (e) =>{
            if(e.target.classList.contains('remove')){
                e.target.parentElement.parentElement.remove()
            }
            let btnId = e.target.dataset.id;
            Interface.removeArrayTodo(btnId)
        })
    }
    static removeArrayTodo(id){
        todoArr = todoArr.filter((item)=> item.id !== +id)
        Storage.addToStorage(todoArr)
    }

    static editTodo(){
        let iconChange = false
        list.addEventListener('click', (e) =>{
            if(e.target.classList.contains('edit')){
               let p = e.target.parentElement.parentElement.firstElementChild;
               const btnId = e.target.dataset.id;
               if(iconChange){
                    p.setAttribute('contenteditable', 'true');
                    p.focus()
                    e.target.textContent = 'save'
               } else {
                e.target.textContent = ' ';
                p.removeAttribute('contenteditable');
                const newArr = todoArr.findIndex((item) => item.id === +btnId);
                todoArr[newArr].todo = p.textContent;
                Storage.addToStorage(todoArr);
               }
            }
            iconChange = !iconChange
        })
    }
    // static editTodo(){
    //     list.addEventListener('click', (e)=> {
    //         if(e.target.classList.contains('edit')){
    //             let newTask = prompt('Edit your task: ')    // goal for a future update: avoid prompt(), add a popup or make a new edit form visible instead
    //             e.target.parentElement.innerHTML = newTask
    //             let id = Date.now();
    //             const todo = new Todo(id, newTask.value)
    //             todoArr = [...todoArr, todo] //adds new Todo to todoArray
    //         }
            
    //     })
        
    // }
    // static editArrayTodo(id){
    //     todoArr = todoArr.filter((item)=> item.id !== +id)
    //     Storage.addToStorage(todoArr)
    // }
    
}


window.addEventListener("DOMContentLoaded", () => {
    Interface.displayTodoArr()
    Interface.removeTodo()
    Interface.editTodo()
})


// function addItem(text) {
//     if(text !== ''){
//         const todo = {
//             name: text,
//             id: Date.now(),  //this adds a unique id to the item based on the date/time
//             completed: false
//         }
//         todoItems.push(todo); //add new todo item to array list
//         addToLocalStorage(todoItems);
//         input.value = '';  //resets input value to blank after submit
//     }
// }

// // function to add todo items to local storage
// function addToLocalStorage(todoItems) {
//     localStorage.setItem('todoItemsReference', JSON.stringify(todoItems));
//     renderItems(todoItems);
// }

// function renderItems(todoItems) {
//     list.innerHTML = '';
//     todoItems.forEach(item => {
//         const checked = item.completed ? 'checked': null;
//         const li = document.createElement('li');
//         li.setAttribute('data-key', item.id);
//         li.classList.add('p-2', 'border-bottom', 'd-flex', 'justify-content-between')
//         li.innerHTML = `
//             <input type="radio" class="checkbox" ${checked}> 
//             ${item.name}
//             ${editButton}
//         `;
//         list.append(li);
//         // add delete button to item
//         const delBtn = document.createElement('i');
//         delBtn.classList.add('bi', 'bi-trash')
//         // delBtn.classList.add('delete-Btn')
//         li.appendChild(delBtn);
//         delBtn.addEventListener('click', () => {
//             deleteItem(li.getAttribute('data-key'));
//         });

//     });
//     makeEditFunctional()
// }

// function makeEditFunctional() {
//     const tasks = Array.from(document.querySelectorAll('#todoList li'))

//     for (let i = 0; i < tasks.length; i++) {
//         const edit = tasks[i].querySelector('i')
//         const taskToEdit = todoItems[i]
//         edit.addEventListener('click', () => editItem(taskToEdit, i))
//     }
// }
// function editItem(task, i) {
//     let newTask = prompt('Edit your task: ')    // goal for a future update: avoid prompt(), add a popup or make a new edit form visible instead
//     if (newTask) {
//         task = newTask
//         todoItems[i].name = task
//         addToLocalStorage(todoItems)
//     }
// }

// // function to delete single todo item
// function deleteItem(id) {
//     const numID = Number(id);
//     todoItems = todoItems.filter(item => item.id !== numID); //remove todo item from todoItems array
//     const li = document.querySelector(`li[data-key="${numID}"]`);
//     li.remove(); //remove todo item from page rendering
//     addToLocalStorage(todoItems); //update localStorage
// }

// function getFromLocalStorage() {
//     const reference = localStorage.getItem('todoItemsReference');
//     if (reference) {
//       todoItems = JSON.parse(reference);
//       renderItems(todoItems);
//     }
//   }
// getFromLocalStorage(); //initializes on page refresh



// // function to delete single todo item
// function deleteItem(id) {
//     const numID = Number(id);
//     todoItems = todoItems.filter(item => item.id !== numID); //remove todo item from todoItems array
//     const li = document.querySelector(`li[data-key="${numID}"]`);
//     li.remove(); //remove todo item from page rendering
//     addToLocalStorage(todoItems); //update localStorage
// }




// // Event listener waiting for checked items
// list.addEventListener("change", (item) =>{ updateCheckedItem(item) })



// // Updated the checkbox checked status for the clicked item
// function updateCheckedItem(item){
//     const checkedItemID = Number(item.target.parentElement.getAttribute('data-key'))
//     const checkedItem = todoItems.find( item => item.id === checkedItemID)

//     if(item.target.checked){
//         checkedItem.completed = true
//     } else {
//         checkedItem.completed = false
//     }
//     addToLocalStorage(todoItems)
// }



