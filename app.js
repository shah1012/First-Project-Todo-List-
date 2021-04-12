const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filteroption = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filteroption.addEventListener('click', filtertodo);


function addTodo(event){
    event.preventDefault();
    
    const todoDiv = document.createElement('div'); //creates new division
    todoDiv.classList.add('todo');

    const newtodo = document.createElement('li');  //creates new Ul ( ui list layout)
    newtodo.innerText = todoInput.value;
    newtodo.classList.add('todo-item');

    todoDiv.appendChild(newtodo);
    //add todo
    savelocaltodos(todoInput.value);
    //  completed button

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //apend to list

    todoList.appendChild(todoDiv);
    
    //clear the todoinout value
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;

    if(item.classList[0] === 'trash-btn'){
        const parent = item.parentElement;
        // amimation here
        parent.classList.add('fall');
        removelocaltodos(parent);
        parent.addEventListener('transitionend', function(){
            parent.remove();
        });
    }

    //chedk mark

    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function filtertodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}



function savelocaltodos(todo){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div'); //creates new division
        todoDiv.classList.add('todo');

        const newtodo = document.createElement('li');  //creates new Ul ( ui list layout)
        newtodo.innerText = todo;
        newtodo.classList.add('todo-item');

        todoDiv.appendChild(newtodo);
        //  completed button

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //apend to list

        todoList.appendChild(todoDiv);
    });
}


function removelocaltodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('e');
}


