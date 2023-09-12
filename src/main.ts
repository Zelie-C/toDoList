import './style.css'

const btnSubmit = document.querySelector("#submit") as HTMLButtonElement;
const writtenText = document.querySelector("#written-text") as HTMLInputElement;
const toDoDiv = document.querySelector(".tasks-list") as HTMLElement;
const deleteBtn = document.querySelector("#delete") as HTMLButtonElement;

let count: number = 0;

reloadTasks();

async function task(value: string, taskContainer: HTMLDivElement) {
  const response = await fetch(`http://localhost:3002/todo/${value}`, {
    method: "POST"})
  const message = await response.text();
  let taskElement = document.createElement("p") as HTMLDivElement;
  taskContainer.appendChild(taskElement);
  taskElement.innerText = message;
}

async function checked(divContainer: HTMLDivElement){
  let textElementValue = divContainer.getAttribute("id");
  const response = await fetch(`http://localhost:3002/true/${textElementValue}`, {
    method: "PUT"})
  const message = await response.text();
  console.log(message);
}

async function unchecked(parentCheckbox: HTMLDivElement){
  let textElementValue = parentCheckbox.getAttribute("id");
  const response = await fetch(`http://localhost:3002/false/${textElementValue}`, {
    method: "PUT"})
  const message = await response.text();
  console.log(message);
}

async function deleteTask(parentCheckbox: HTMLDivElement){
  let textElementValue = parentCheckbox.getAttribute("id");
  const response = await fetch(`http://localhost:3002/delete/${textElementValue}`, {
    method: "DELETE"})
  const message = await response.text();
  console.log(message);
}

async function reloadTasks(){
  const response = await fetch(`http://localhost:3002/getall`);
  const message = await response.text();
  let messageArray: {id: number; nomTache: string; status: boolean}[] = JSON.parse(message);
  console.log(messageArray)
  for (const tache of messageArray) {
    let taskElement: HTMLElement = document.createElement("p")
    taskElement.innerText = tache.nomTache;
    const taskDiv = document.createElement("div") as HTMLDivElement;
    taskDiv.classList.add("task-div");
    taskDiv.setAttribute("id", tache.nomTache)
    
    toDoDiv.appendChild(taskDiv);
    const checkboxElement = document.createElement("input") as HTMLInputElement;
    checkboxElement.setAttribute("type", "checkbox");
    if (tache.status === true) {
      taskDiv.classList.add("task-checked")
    }
    taskDiv.appendChild(checkboxElement);
    taskDiv.appendChild(taskElement)
    const removeTaskButton = document.createElement("button") as HTMLButtonElement;
    removeTaskButton.classList.add("remove-button");
    removeTaskButton.innerText = "Supprimer";
    taskDiv.appendChild(removeTaskButton)
    removeTaskButton.addEventListener("click", () => {
      const parent = removeTaskButton.parentElement as HTMLDivElement;
      deleteTask(parent)
      parent?.remove();
    })
    console.log(tache.nomTache, tache.status)
  }
 
}




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
    taskDiv.setAttribute("id", myTask)
    const checkboxParent = checkboxElement.parentElement as HTMLDivElement;
    checkboxElement.addEventListener("click", () => {
      taskDiv.classList.toggle("task-checked");
      if (taskDiv.classList.contains("task-checked")) {
        checked(checkboxParent)
      } else {
        unchecked(checkboxParent)
      }
    })
    task(myTask, taskDiv);

    const removeTaskButton = document.createElement("button") as HTMLButtonElement;
    removeTaskButton.classList.add("remove-button");
    removeTaskButton.innerText = "Supprimer";
    taskDiv.appendChild(removeTaskButton);
    removeTaskButton.addEventListener("click", () => {
      const parent = removeTaskButton.parentElement as HTMLDivElement;
      deleteTask(parent)
      parent?.remove();
    })
    writtenText.value = "";
  });
};




createTask();