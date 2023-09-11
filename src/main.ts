import './style.css'

const btnSubmit = document.querySelector("#submit") as HTMLButtonElement;
const writtenText = document.querySelector("#written-text") as HTMLInputElement;
const toDoDiv = document.querySelector(".tasks-list") as HTMLElement;
const deleteBtn = document.querySelector("#delete") as HTMLButtonElement;

// const clearButton = document.querySelector("#clear") as HTMLDivElement;
//const myStorage = window.localStorage;
let count: number = 0;

async function task(value: string, taskContainer: HTMLDivElement) {
  const response = await fetch(`http://localhost:3002/todo/${value}`, {
    method: "POST"})
  const message = await response.text();
  let taskElement = document.createElement("p") as HTMLDivElement;
  taskElement.setAttribute("id", `${value}`);
  taskContainer.appendChild(taskElement);
  taskElement.innerText = message;
}

async function checked(valueContainer: string, divContainer: HTMLDivElement){
  let textElementValue = divContainer.getAttribute(valueContainer)?.valueOf();
  const response = await fetch(`http://localhost:3002/true/${textElementValue}`, {
    method: "PUT"})
  const message = await response.text();
  console.log(message);
}

async function unchecked(valueContainer: string, divContainer: HTMLDivElement){
  let textElementValue = divContainer.getAttribute(valueContainer)?.valueOf();
  const response = await fetch(`http://localhost:3002/false/${textElementValue}`, {
    method: "PUT"})
  const message = await response.text();
  console.log(message);
}

async function deleteTask(valueContainer: string, parentDiv: HTMLDivElement){
  let textElementValue = parentDiv.getAttribute(valueContainer)?.valueOf();
  const response = await fetch(`http://localhost:3002/delete/${textElementValue}`, {
    method: "DELETE"})
  const message = await response.text();
  console.log(message);
}

async function reloadTasks(){
  const response = await fetch(`http://localhost:3002/getall`);
  const message = await response.text();
  console.log(message);
}

window.addEventListener("load", () => {
  reloadTasks();
})

async function deleteTasks(){
  const response = await fetch('http://localhost:3002/removeall', {
    method: "DELETE"});
  const message = await response.text();
  console.log(message)
}

deleteBtn.addEventListener("click", () => {
  deleteTasks();
})




function createTask(){
  btnSubmit.addEventListener("click", () => {
    let myTask = writtenText.value;
    count++;
    const taskDiv = document.createElement("div") as HTMLDivElement;
    taskDiv.classList.add("task-div");
    toDoDiv.appendChild(taskDiv);
    const checkboxElement = document.createElement("input") as HTMLInputElement;
    checkboxElement.setAttribute("type", "checkbox");
    taskDiv.appendChild(checkboxElement);
    checkboxElement.addEventListener("click", () => {
      taskDiv.classList.toggle("task-checked");
      if (taskDiv.classList.contains("task-checked")) {
        checked(myTask, taskDiv)
      } else {
        unchecked(myTask, taskDiv)
      }
    })
    task(myTask, taskDiv);

    const removeTaskButton = document.createElement("button") as HTMLButtonElement;
    removeTaskButton.classList.add("remove-button");
    removeTaskButton.innerText = "Supprimer";
    taskDiv.appendChild(removeTaskButton);
    removeTaskButton.addEventListener("click", () => {
      const parent = removeTaskButton.parentElement as HTMLDivElement;
      deleteTask(myTask, parent)
      parent?.remove();
    })

  });
};


createTask();