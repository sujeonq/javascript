document.addEventListener('DOMContentLoaded', function () {
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');

    // Load todos from local storage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';

            li.innerHTML = `
                <span>${todo}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;

            todoList.appendChild(li);
        });
    }

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            todos.push(todoText);
            todoInput.value = '';
            updateLocalStorage();
            renderTodos();
        }
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        updateLocalStorage();
        renderTodos();
    }

    function updateLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Event listeners
    addTodoBtn.addEventListener('click', addTodo);

    todoList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            deleteTodo(index);
        }
    });

    // Initial render
    renderTodos();
});
