import {
  appElement,
  DarkThemeToggleElement,
  addTaskButtonElement,
} from './scripts/elements.js'

import {addTask, deleteTask, loadTasks} from './scripts/utils.js'

// localStorage is single point of truth, i.e. always read/update localStorage tasks

loadTasks();

DarkThemeToggleElement.onclick = () => { appElement.classList.toggle('App--isDark');}

addTaskButtonElement.onclick = addTask;