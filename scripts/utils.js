import { searchInputElement, taskListElement } from "./elements";

const TASK_KEY = "tasks";

let current_tasks;

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

export const loadTasks = (new_task) => {
  current_tasks = fetchData(TASK_KEY);
  if(new_task){
    current_tasks.push(new_task);
  }
  taskListElement.innerHTML = tasksToHtml(current_tasks);

  const deleteIcons = document.querySelectorAll('.TaskList__deleteIcon');
  console.log(deleteIcons);
  deleteIcons?.forEach((icon, index) => {
    icon.onclick = (event) => deleteTask(event, index);
  });
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

export const deleteTask = (event, index) => {
  if(!confirm(`Are you sure you want to delete take ${current_tasks[index].value}`)){
    return;
  }
  current_tasks.splice(index, 1);
  saveData('tasks', current_tasks);
  loadTasks();
}