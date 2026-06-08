import {
  appElement,
  DarkThemeToggleElement,
  addTaskButtonElement,
} from './scripts/elements.js'

import {addTask, DARKMODE_KEY, initOnStartup} from './scripts/utils.js'

// localStorage is single point of truth, i.e. always read/update localStorage tasks

initOnStartup();

DarkThemeToggleElement.onclick = () => {
  const isDark = appElement.classList.toggle('App--isDark');
  if(isDark){
    localStorage.setItem(DARKMODE_KEY, '');
  }else{
    localStorage.removeItem(DARKMODE_KEY);
  }
}

addTaskButtonElement.onclick = addTask;