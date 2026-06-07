import { searchInputElement, taskListElement } from "./elements";

export const addTask = (event)=> {
  event.preventDefault();
  const taskValue = searchInputElement.value
  if(!taskValue.trim()){
    return;
  }

  let taskList = taskListElement.innerHTML
  taskList += `<li class="TaskList__taskContent">
    <div class='TaskList__checkbox' tabindex="0" role="button">
      <img class='TaskList__checkboxImg' src="./assets/icon-checkmark.svg" alt="checkmark" />
    </div>
    <div class='TaskList__valueContent'>
      <p class='TaskList__value'>
        ${taskValue}
      </p>
      <img src="./assets/icon-basket.svg"
            class='TaskList__deleteIcon'
            alt="basket-icon"
      />
    </div>
  </li>`;
  taskListElement.innerHTML = taskList;
}