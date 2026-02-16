import { reorderStateByIds, settings } from './state.js';

export const initDragAndDrop = () => {
    let startY = null;
    let isDragging = false;
    let currentDraggable = null;
    let listElements = null;
    let placeholder = null;
    let cachedItems = null;

    document.addEventListener('pointerdown', event => {

        if (settings.filter !== 'all' || settings.searchQuery) return;

        const { target, clientY } = event;
        listElements = document.querySelector('.todo__list');

        const targetElement = target.closest('.todo__item');
        if (!targetElement || target.closest('.todo-item__checkbox') || target.closest('.todo-item__delete-button')) return;

        currentDraggable = targetElement;

        cachedItems = Array.from(
            listElements.querySelectorAll('.todo__item')
        ).filter(item => item !== currentDraggable);

        placeholder = document.createElement('div');
        placeholder.classList.add('todo-item--placeholder');

        const draggableRect = currentDraggable.getBoundingClientRect();
        placeholder.style.height = `${draggableRect.height}px`;
        currentDraggable.before(placeholder);

        const parentRect = listElements.getBoundingClientRect();
        const initialTop = draggableRect.top - parentRect.top;

        currentDraggable.style.top = `${initialTop}px`;
        currentDraggable.style.left = '0';
        currentDraggable.style.width = `${draggableRect.width}px`;
        currentDraggable.style.pointerEvents = 'none';
        currentDraggable.style.touchAction = 'none';

        currentDraggable.classList.add('todo-item--is-dragging');
        startY = clientY - draggableRect.top;
        isDragging = true;
    })

    document.addEventListener('pointermove', event => {
        if (!isDragging || !currentDraggable) return;

        const { clientY } = event;
        const parentRect = listElements.getBoundingClientRect();
        const y = clientY - parentRect.top - startY;
        currentDraggable.style.top = `${y}px`;

        const nextElement = cachedItems.find(item => {
            const { top, height } = item.getBoundingClientRect();
            return clientY < top + height / 2;
        });

        if (nextElement) {
            listElements.insertBefore(placeholder, nextElement)
        } else {
            listElements.append(placeholder)
        }
    })

    document.addEventListener('pointerup', () => {
        if (!isDragging || !currentDraggable) return;

        if (placeholder) {
            placeholder.replaceWith(currentDraggable);
            placeholder = null;
        }

        currentDraggable.classList.remove('todo-item--is-dragging');
        currentDraggable.style.top = '';
        currentDraggable.style.width = '';
        currentDraggable.style.left = '';
        currentDraggable.style.pointerEvents = 'auto';

        const items = Array.from(listElements.querySelectorAll('.todo__item'));
        const ids = items.map(item => item.dataset.id);

        if (ids.length) {
            reorderStateByIds(ids);
        }

        currentDraggable = null;
        isDragging = false;
    })
}