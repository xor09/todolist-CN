// Initialize variables
let currentId = 0; //unique id for every taks
let tasks = []; //all tasks array
let types = ['ALL', 'COMPLETED', 'INCOMPLETE'] //type array
let typesIndex = 0; //index for type array

// Get DOM elements
const input = document.getElementById('input-box');
const addbtn = document.getElementById('add-btn')
const cointainer = document.getElementById('list-cointainer');
const totalTasksCnt = document.querySelector('#task-count');
const completeTasksCnt = document.querySelector('#completed-task-count');
const incompleteTasksCnt = document.querySelector('#incomplete-task-count');
const allTaskBtn = document.querySelector('#all-task-btn');
const completeTaskBtn = document.querySelector('#complete-task-btn');
const incompleteTaskBtn = document.querySelector('#incomplete-task-btn');

// Event listener for adding a new task
addbtn.addEventListener("click", addItem);

//  constructer function to add create an object 
//  we can also use a class for this ...
function createTaskObject(text){
    this.id = ++currentId;
    this.value = text;
    this.isComplete = false;
}

/**
 * Adds a new task to the tasks array.
 */
function addItem(){
    let text = input.value.trim();
    input.value = '';
    if(text === ''){
        showToast('Enter a valid task!', 'red');
        return;
    }
    let task = new createTaskObject(text)
    tasks.push(task);
    printItemsToList();
    showToast('Item created successfully', 'green')
}

/**
 * Prints the tasks to the list container based on the selected type.
 */
function printItemsToList(){
    cointainer.innerHTML = ''
    tasks.map((task) => {
        const list = createElement(task, types[typesIndex])
        if(list) cointainer.append(list)
    })
    updateCount();
    changeBtnColor();
}

// Creates a list element for a task.
function createElement(task, type){
    if(type === types[1] && task.isComplete===false) return null;
    if(type === types[2] && task.isComplete===true) return null;

    let list = document.createElement('li');

    let checkbtn = document.createElement('img');
    checkbtn.classList.add('check-btn')
    checkbtn.src = (task && task.isComplete ? './images/undo.png' : './images/check.png')
    checkbtn.addEventListener('click', () => toogleCheckItem(task.id));
    checkbtn.style.height = '25px'

    let div = document.createElement('div');
    div.textContent = task.value;
    div.style.fontSize = '20px'
    div.classList.add('todo-text-container')
    if(task.isComplete){
        div.classList.toggle('completed')
    }

    let deletebtn = document.createElement('img');
    deletebtn.classList.add('delete-btn')
    deletebtn.src = './images/delete.png'
    deletebtn.addEventListener('click', () => deleteItem(task.id));
    deletebtn.style.height = '25px'

    list.append(checkbtn)
    list.append(div);
    list.append(deletebtn);
    return list;
}

// Deletes a task with the specified ID.
function deleteItem(id){
    tasks = tasks.filter((task)=> task.id !== id );
    printItemsToList();
    showToast('Item deleted successfully', 'green')
}

// Toggles the completion status of a task with the specified ID.
function toogleCheckItem(id, e){
    tasks.map((task) => {
        if(task.id === id){
            task.isComplete = !task.isComplete;
        }
    })
    printItemsToList();
    showToast('List Updated Successfully', '#cf670d')
}

// Updates the task counts displayed on the page.
function updateCount() {
    let totalcnt = tasks.length;
    let cntCompleted = tasks.filter(task => task.isComplete).length;
    totalTasksCnt.innerHTML = `Task Count: ${totalcnt}`
    completeTasksCnt.innerHTML = `Completed Task: ${cntCompleted}`
    incompleteTasksCnt.innerHTML = `Incomplete Task: ${totalcnt - cntCompleted}`
}

allTaskBtn.addEventListener('click', ()=>{
    typesIndex = 0;
    printItemsToList();
})

completeTaskBtn.addEventListener('click', ()=>{
    typesIndex = 1;
    printItemsToList();
})

incompleteTaskBtn.addEventListener('click', ()=>{
    typesIndex = 2;
    printItemsToList();
})

//change the type(all, complete, incomplete) button according to selection
function changeBtnColor(){
    allTaskBtn.style.backgroundColor = typesIndex===0 ? 'green' : 'red'
    completeTaskBtn.style.backgroundColor = typesIndex===1 ? 'green' : 'red'
    incompleteTaskBtn.style.backgroundColor = typesIndex===2 ? 'green' : 'red'
}



// Displays a toast message with the specified message and background color.
function showToast(message, color) {
    const toastContainer = document.getElementById('toast-container');
    toastContainer.style.backgroundColor = color;
    const toast = document.getElementById('toast');
    toast.innerText = message
    toastContainer.classList.remove('hidden');
    toastContainer.classList.add('visible');
    
    setTimeout(() => {
        toastContainer.classList.remove('visible');
        toastContainer.classList.add('hidden');
    }, 3000); // Display the toast for 3 seconds
}


// Change button color based on the selected type initially
changeBtnColor();