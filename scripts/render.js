export const renderTasks = (state, filter, searchQuery) => {
    const listElement = document.querySelector('.todo__list');
    listElement.innerHTML = '';

    let filteredTasks = state;

    if (filter === 'active') {
        filteredTasks = state.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = state.filter(task => task.completed);
    }

    if (searchQuery) {
        const query = searchQuery.toLowerCase().trim();

        filteredTasks = filteredTasks.filter(task => task.text.toLowerCase().includes(query));
    }

    const filterButtons = document.querySelectorAll('[data-filter]');

    filterButtons.forEach(button => {
        if (button.dataset.filter === filter) {
            button.classList.add('button--active');
        } else {
            button.classList.remove('button--active');
        }
    });

    if (filteredTasks.length === 0) {
        listElement.innerHTML = '<li class="todo__empty">Ничего не найдено</li>';
        return;
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'todo__item todo-item';
        li.dataset.id = task.id;

        const checkbox = document.createElement('input');
        checkbox.className = 'todo-item__checkbox';
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.dataset.id = task.id;
        const checkboxId = `task-${task.id}`;
        checkbox.id = checkboxId;
        li.appendChild(checkbox);

        const label = document.createElement('label');
        label.className = 'todo-item__label';
        label.textContent = task.text;
        label.setAttribute('for', checkboxId);
        li.appendChild(label);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'todo-item__delete-button';
        deleteButton.type = 'button';
        deleteButton.dataset.id = task.id;
        li.appendChild(deleteButton);

        listElement.appendChild(li);
    })

    const numTasks = document.querySelector('.todo__nums-tasks');
    const allTasks = filteredTasks.length;
    numTasks.textContent = allTasks;
}