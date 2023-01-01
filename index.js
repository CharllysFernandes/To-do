let inputToDo = document.getElementById("inputTask");

// console.log(inputToDo);

inputToDo.addEventListener('change', function () {
    console.log(getTaskInput())
})

// function get innerHtml for inputTask

function getTaskInput() {
let inputToDo = document.getElementById("inputTask").value;

    return inputToDo;
}

// function load index and save in Storage.

function loadTask() {
    
}