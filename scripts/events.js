import { state, settings, addTask, deleteTask, toggleTask, clearAll } from './state.js';
import { renderTasks } from './render.js';

export const initEventListeners = () => {
    const formElement = document.querySelector('.todo__form');
    const inputElement = formElement.querySelector('.field__input');
    const deleteAllButton = document.querySelector('.todo__button-delete-all');
    const listElements = document.querySelector('.todo__list');
    const modalElement = document.querySelector('.modal');
    const modalYesButton = document.getElementById('modal-yes');
    const modalNoButton = document.getElementById('modal-no');
    const filterElements = document.querySelector('.todo__filter');
    const searchInput = document.getElementById('search-task');

    formElement.addEventListener('submit', event => {
        event.preventDefault();

        if (!inputElement.value.trim()) return;

        addTask(inputElement.value);
        inputElement.value = '';

        renderTasks(state, settings.filter, settings.searchQuery)
    })

    deleteAllButton.addEventListener('click', event => {
        event.preventDefault();

        modalElement.showModal();
    })

    modalYesButton.addEventListener('click', () => {
        clearAll();
        renderTasks(state, settings.filter, settings.searchQuery)

        modalElement.close()
    })

    modalNoButton.addEventListener('click', () => {
        modalElement.close()
    })

    listElements.addEventListener('pointerup', event => {

        const deleteItemElement = event.target.closest('.todo-item__delete-button');
        const isCheckbox = event.target.classList.contains('todo-item__checkbox');

        if (deleteItemElement) {
            const id = deleteItemElement.dataset.id;
            deleteTask(id)
            renderTasks(state, settings.filter, settings.searchQuery)

            return;
        }

        if (isCheckbox) {
            const id = event.target.dataset.id;
            toggleTask(id);
            renderTasks(state, settings.filter, settings.searchQuery)
        }
    })

    filterElements.addEventListener('click', event => {
        const targetButton = event.target.closest('[data-filter]');

        if (!targetButton) return;

        const filterValue = targetButton.dataset.filter;
        settings.filter = filterValue;

        renderTasks(state, settings.filter, settings.searchQuery)
    })

    searchInput.addEventListener('input', event => {
        settings.searchQuery = event.target.value;
        renderTasks(state, settings.filter, settings.searchQuery)
    })
}