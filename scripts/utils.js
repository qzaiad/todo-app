import { addTaskButtonElement, appElement, DarkThemeToggleElement, searchInputElement, taskListElement, taskListLinkElement, taskListListElement } from "./elements";

const TASK_KEY = 'tasks';
export const DARKMODE_KEY = "darkmode";

let current_tasks;

const saveData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value)); // array of objects
}

const fetchData = (key) => {
  let data = localStorage.getItem(key); // string
  return data ? JSON.parse(data) : []; // array of objects or null
}

const taskToHtml = (task) => {
return `<li class="TaskList__taskContent${task.isCompleted ? " TaskList__taskContent--isActive" : ""}">
<div class='TaskList__checkbox' tabindex="0" role="button">
  <img class='TaskList__checkboxImg' src="./assets/icon-checkmark.svg" alt="checkmark" />
</div>
<div class='TaskList__valueContent'>
  <p class='TaskList__value'>
    ${task.value}
  </p>
  <img src="./assets/icon-basket.svg"
        class='TaskList__deleteIcon'
        alt="basket-icon"
  />
</div>
</li>`;  
}

const tasksToHtml = (tasks) => {
  let result = '';
  tasks.forEach((task) => {
    result += taskToHtml(task);
  })
  return result;
}

const addEventHandlersForDeleteTasks = () => {
  const deleteIcons = document.querySelectorAll('.TaskList__deleteIcon');
  deleteIcons?.forEach((icon, index) => {
    icon.onclick = (event) => deleteTask(event, index);
  });
}

const addEventHandlersForToggleTasks = () => {
  const checkBoxes = document.querySelectorAll('.TaskList__checkbox');
  checkBoxes?.forEach((box, index) => {
    box.onclick = (event) => toggleTask(event, index);
    // return true iff tab should still work, otherwise use addEventListener() without return true
    box.onkeydown = (event) => { event.key === 'Enter' && toggleTask(event, index); return true; }
  });
}

const loadTasks = (new_task) => {
  current_tasks = fetchData(TASK_KEY);
  if(new_task){
    current_tasks.push(new_task);
  }
  let tasksHtml = tasksToHtml(current_tasks);
  if(!tasksHtml){
    tasksHtml = `<li class="EmptyList">
<img class="EmptyList__img" src="./assets/icon-empty.svg" alt="list is empty" />
<p>Task list is empty</p>
</li>`;
  }
  taskListElement.innerHTML = tasksHtml;
  addEventHandlersForDeleteTasks();
  addEventHandlersForToggleTasks();
}

export const initOnStartup = () => {
  loadTasks();
  null !== localStorage.getItem(DARKMODE_KEY) && appElement.classList.add('App--isDark');

  addTaskButtonElement.onclick = addTask;
  taskListLinkElement.onclick = hideCompletedTasks;

  DarkThemeToggleElement.onclick = () => {
    const isDark = appElement.classList.toggle('App--isDark');
    if(isDark){
      localStorage.setItem(DARKMODE_KEY, '');
    }else{
      localStorage.removeItem(DARKMODE_KEY);
    }
  }
}

export const addTask = (event)=> {
  event.preventDefault();
  const taskValue = searchInputElement.value.trim()
  if(!taskValue){
    return;
  }

  const new_task = {
    value: taskValue,
    isCompleted: false,
  };

  loadTasks(new_task);
  saveData('tasks', current_tasks);
  searchInputElement.value = '';
}

const saveAndLoadTasks = () => {
  saveData(TASK_KEY, current_tasks);
  loadTasks();
}

const deleteTask = (event, index) => {
  if(!confirm(`Are you sure you want to delete take ${current_tasks[index].value}`)){
    return;
  }
  current_tasks.splice(index, 1);
  saveAndLoadTasks();
}

const toggleTask = (event, index) => {
  current_tasks[index].isCompleted = !current_tasks[index].isCompleted;
  event.currentTarget.parentElement.classList.toggle('TaskList__taskContent--isActive');
  /**
   * this will re-renders the task list (rebuilds the DOM),
   * which destroys and recreates all checkboxes ? so focus
   * is lost because the element that had focus no longer exists.
   * -> just save data to localStorage
   */
  // saveAndLoadTasks();
  saveData(TASK_KEY, current_tasks);
}

export const hideCompletedTasks = (e) => {
  taskListListElement.classList.toggle('TaskList__list--hideCompleted');
  event.currentTarget.classList.toggle('TaskList__link--isActive');
}