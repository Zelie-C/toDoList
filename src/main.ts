import './style.css'

const btnSubmit = document.querySelector("#submit") as HTMLButtonElement;
const writtenText = document.querySelector("#written-text") as HTMLInputElement;
const toDoDiv = document.querySelector(".tasks-list") as HTMLElement;
const clearButton = document.querySelector("#clear") as HTMLDivElement;
const myStorage = window.localStorage;
let count: number = 0;

/*function getTask(){
  for (let i = 0; i < myStorage.length; i++) {
    const key = myStorage.key(i);
    const value = myStorage.getItem(key);
    let elementOfList = document.createElement("div") as HTMLElement;
    elementOfList.innerText = value;
    taskDiv.appendChild(elementOfList);
  }

}*/

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
    let listElement = document.createElement("div") as HTMLDivElement;
    listElement.setAttribute("id", `task${count}`);
    myStorage.setItem(listElement.getAttribute("id"), myTask);
    listElement.innerText = myStorage.getItem(listElement?.getAttribute("id"));
    taskDiv.appendChild(listElement);
    const removeTaskButton = document.createElement("button") as HTMLButtonElement;
    removeTaskButton.classList.add("remove-button");
    removeTaskButton.innerText = "Supprimer";
    taskDiv.appendChild(removeTaskButton);
  });
};

createTask();

document.querySelector("button")?.addEventListener("click", () => {
  console.log("plouf");
})

/*function removeTask() {
  const removeButton = document.querySelectorAll("remove-button");
  const buttonsArray = Array.from(removeButton);
  buttonsArray.forEach( button => {
    button.addEventListener("click", () => {
      const parentButton = button.parentElement;
      if (parentButton) {console.log(parentButton);}
    })
  })
};*/

function clearList() {
  clearButton.addEventListener("click", () => {
    myStorage.clear();
  })
}


/*getTask();*/
clearList();
/*removeTask();*/
