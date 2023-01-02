let inputToDo = document.getElementById("addTask");

// console.log(inputToDo);

inputToDo.addEventListener('change', function () {
    let inputToDo = document.getElementById("addTask").value;
    let containerTask = document.getElementById('containerTask');
    
    containerTask.innerHTML +=
    `
    <div class="card-style-input">
    <button>
        <i class="bi bi-square"></i>
    </button>
    <h1>${inputToDo}</h1>
    <button>
        <i class="bi bi-x-lg"></i>
    </button>
    </div>
    `
    // console.log(getTaskInput())
})

// function get innerHtml for inputTask

function getTaskInput() {
    let input = document.getElementById("addTask");


}

// function load index and save in Storage.

function loadTask() {
    
}

// Save

function save(obj) {
    localStorage('')
}