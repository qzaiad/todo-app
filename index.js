import {
  appElement,
  DarkThemeToggleElement,
  addTaskButtonElement,
} from './scripts/elements.js'

import {addTask} from './scripts/utils.js'

DarkThemeToggleElement.onclick = () => { appElement.classList.toggle('App--isDark');}

addTaskButtonElement.onclick = addTask;