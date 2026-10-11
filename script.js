let todos = JSON.parse(localStorage.getItem('todo_manifest')) || [];

// Active DOM Nodes Identification
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const categorySelect = document.getElementById('category-select');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');

/**
 * Synchronize Application Array Data with User Interface Map
 */
function renderTodos() {
    // Purge existing interface elements to prepare clean state mapping
    todoList.innerHTML = '';

    // Empty state interface logical handler
    if (todos.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }

    // Engine Loop: Translate Object Array structure into valid UI DOM tree elements
    todos.forEach((todo) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.category}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'todo-content';

        const textSpan = document.createElement('span');
        textSpan.className = 'todo-text';
        textSpan.textContent = todo.text;

        const tagSpan = document.createElement('span');
        tagSpan.className = 'todo-tag';
        tagSpan.textContent = todo.category;

        contentDiv.appendChild(textSpan);
        contentDiv.appendChild(tagSpan);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.setAttribute('aria-label', 'Delete task');
        deleteBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
        `;
        
        // Context preservation encapsulation for functional callback
        deleteBtn.onclick = () => deleteTodo(todo.id);

        li.appendChild(contentDiv);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    // Mirror array mutations instantly to persistent hardware layer
    localStorage.setItem('todo_manifest', JSON.stringify(todos));
}

/**
 * Capture Form Interception Event to push data models
 */
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskText = todoInput.value.trim();
    const taskCategory = categorySelect.value;

    // Fail-safe protection validation checks
    if (!taskText || !taskCategory) return;

    // Build formal object structural signature
    const newTodo = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36), 
        text: taskText,
        category: taskCategory
    };

    // Array manipulation execution via direct element insertion pushing
    todos.push(newTodo);

    // Refresh rendering sequence cycle & UI forms cleanup resets
    renderTodos();
    todoInput.value = '';
    categorySelect.value = '';
});

/**
 * Filter engine logic target identifier removal processing function
 * @param {string|number} id - Target identification configuration signature
 */
function deleteTodo(id) {
    // Re-assign memory scope reference targeting array objects filtration filtering
    todos = todos.filter(todo => todo.id !== id);
    
    // UI redraw operation cycle
    renderTodos();
}

// Global initialization initial boot call compilation execution triggers
renderTodos();
