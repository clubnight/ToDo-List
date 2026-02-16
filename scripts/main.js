import { state, settings } from './state.js';
import { renderTasks } from './render.js';
import { initEventListeners } from './events.js';

initEventListeners();
renderTasks(state, settings.filter, settings.searchQuery);