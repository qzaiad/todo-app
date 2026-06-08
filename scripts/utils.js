import { searchInputElement, taskListElement } from "./elements";

const TASK_KEY = "tasks";

const saveData = (key, value) => {
  console.log(`saveData: ${key} -> ${JSON.stringify(value)}`)
  localStorage.setItem(key, JSON.stringify(value)); // array of objects
}

const fetchData = (key) => {
  let data = localStorage.getItem(key); // string
  console.log(`fetchData: ${key} -> ${data}`);
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

export const loadTasks = () => {
  const tasksArray = fetchData(TASK_KEY);
  taskListElement.innerHTML = tasksToHtml(tasksArray);
  return tasksArray;
}

export const addTask = (event)=> {
  event.preventDefault();
  const taskValue = searchInputElement.value.trim()
  if(!taskValue){
    return;
  }

  const task = {
    value: taskValue,
    isCompleted: false,
  };

  let tasks = loadTasks();
  tasks.push(task);
  saveData('tasks', tasks);

  taskListElement.innerHTML += taskToHtml(task);
  searchInputElement.value = '';
}