import './style.css'

const btnSubmit = document.querySelector("#submit") as HTMLButtonElement;
const writtenText = document.querySelector("#writtenText") as HTMLInputElement;
const unorderedListOfTask = document.querySelector("ul") as HTMLElement;

function createTask(){
  btnSubmit.addEventListener("click", () => {
    let myTask = writtenText.value;
    let listElement = document.createElement("li");
    unorderedListOfTask.appendChild(listElement);
    listElement.innerText = myTask;
    
    writtenText.value = "";
  });
};

createTask();
