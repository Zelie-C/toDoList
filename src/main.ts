import './style.css'

const btnSubmit = document.querySelector("#submit") as HTMLButtonElement;
const writtenText = document.querySelector("#written-text") as HTMLInputElement;
const toDoDiv = document.querySelector(".tasks-list") as HTMLElement;

// const clearButton = document.querySelector("#clear") as HTMLDivElement;
//const myStorage = window.localStorage;
let count: number = 0;

async function task(value: string, taskContainer: HTMLDivElement) {
  const response = await fetch(`http://localhost:3002/todo/${value}`)
  const message = await response.text();
  let taskElement = document.createElement("p") as HTMLDivElement;
  taskContainer.appendChild(taskElement);
  taskElement.innerText = message;
}

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
    })
    task(myTask, taskDiv);

    const removeTaskButton = document.createElement("button") as HTMLButtonElement;
    removeTaskButton.classList.add("remove-button");
    removeTaskButton.innerText = "Supprimer";
    taskDiv.appendChild(removeTaskButton);
    removeTaskButton.addEventListener("click", () => {
      const parent = removeTaskButton.parentElement;
      parent?.remove();
    })

  });
};

createTask();

// function clearList() {
//   clearButton.addEventListener("click", () => {
//     myStorage.clear();

//   })
// }

function isChecked(){
  let checkboxList = document.querySelectorAll("checkbox");
  let checkboxArray = Array.from(checkboxList);
  checkboxArray.forEach( checkbox => checkbox.addEventListener("click", () => {
    console.log("plouf");
  }));
  }

isChecked();


// clearList();
/*removeTask();*/
