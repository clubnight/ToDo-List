import { saveToStorage, getFromStorage } from './storage.js';

export const state = [];

const savedTasks = getFromStorage();

if (savedTasks.length > 0) {
    state.push(...savedTasks)
}

export const settings = {
    filter: 'all',
    searchQuery: ''
}

export const addTask = text => {
    const task = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        text,
        completed: false,
    }
    state.push(task);
    saveToStorage(state);
}

export const deleteTask = id => {
    const index = state.findIndex(item => item.id === id);
    if (index !== -1) {
        state.splice(index, 1);
        saveToStorage(state);
    }
}

export const toggleTask = id => {
    const task = state.find(item => item.id === id);
    if (task) {
        task.completed = !task.completed;
        saveToStorage(state);
    }
}

export const clearAll = () => {
    state.length = 0;
    saveToStorage(state);
}

export const reorderStateByIds = (ids) => {
    const newState = [];

    ids.forEach(id => {
        const task = state.find(item => item.id === id);
        if (task) {
            newState.push(task);
        }
    });

    state.length = 0;
    state.push(...newState);

    saveToStorage(state);
}