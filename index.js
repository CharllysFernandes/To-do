let inputToDo = document.getElementById("addTask");
let containerTask = document.getElementById('containerTask');
let databaseStorage = JSON.parse(localStorage.getItem('database'));
let arrowButton = document.getElementById("addTaskBtn");

// Initial Array

if (databaseStorage === null) {
    console.log("Array vazia")
    databaseStorage = [];
} else {
    renderTask(databaseStorage)
}
arrowButton.addEventListener('click', function () {
    window.location.reload()
})
inputToDo.addEventListener('change', function () {
    addTask();
})

function addTask() {
    let addTask = document.getElementById("addTask").value;
    databaseStorage.push({ id: `${databaseStorage.length}`, task: `${addTask}`, completed: `${false}` })
    let storage = JSON.stringify(databaseStorage)
    localStorage.setItem('database', storage)
    window.location.reload();
}

function renderTask(databaseArray) {
    if (databaseArray !== null) {
        for (let i = 0; i < databaseArray.length; i++) {
            containerTask.innerHTML +=
                `
            <div class="card-style-input animate__bounceIn animate__animated">
            <button onclick=check(${databaseStorage[i].id})>
            <i id="check_${databaseStorage[i].id}" class="bi ${databaseStorage[i].completed === 'true' ? "bi-check-square" : "bi-square"}"></i>
            </button>
            <h1 id=label_${databaseStorage[i].id} class="${databaseStorage[i].completed === "false" ? "text-light" : "text-decoration-line-through text-muted"}">${databaseStorage[i].task}</h1>
            <button onclick=remove(${databaseStorage[i].id})>
            <i class="bi bi-x-lg"></i>
            </button>
            </div>
            `
        }
    }
}

function save(databaseStorage) {
    let storage = JSON.stringify(databaseStorage)
    localStorage.setItem('database', storage)
    window.location.reload();
}

function remove(param) {
    databaseStorage.splice([param].id, 1);
    save(databaseStorage)
}

function check(id) {
    databaseStorage[id].completed === "false" ? databaseStorage[id].completed = "true" : databaseStorage[id].completed = "false";
    save(databaseStorage)
}
