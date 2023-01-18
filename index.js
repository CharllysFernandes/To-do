let inputToDo = document.getElementById("addTask");
let containerTask = document.getElementById('containerTask');
let arrowButton = document.getElementById("addTaskBtn");
let databaseStorage = JSON.parse(localStorage.getItem('database'));

if (databaseStorage === null) {
    databaseStorage = []; // Initial one array
} else {
    renderTask(databaseStorage); // render databaseStorage
}

arrowButton.addEventListener('click', function () {
    window.location.reload()
})

inputToDo.addEventListener('change', function () {
    addTask();
})

function renderTask(databaseArray) {
    if (databaseArray !== null) {
        for (let i = 0; i < databaseArray.length; i++) {
            containerTask.innerHTML += `
            <div class="card-style-input animate__animated animate__fadeIn">
            <button onclick=check(${databaseStorage[i].id})>
            <i class="bi ${databaseStorage[i].completed === 'true' ? "bi-check-square" : "bi-square"}"></i>
            </button>
            <h1 id=label_${databaseStorage[i].id} class="${databaseStorage[i].completed === "false" ? "text-light" : "text-decoration-line-through text-muted"}">${databaseStorage[i].task}</h1>
            <button onclick=remove(${databaseStorage[i].id})>
            <i class="bi bi-x-lg"></i>
            </button>
            </div> `
        }
    }
}

function addTask() {
    let addTask = document.getElementById("addTask").value;
    let id = Math.floor(Math.random() * 100) // create random number 0 to 100
    databaseStorage.push({ "id": `${id * 1}`, task: `${addTask}`, completed: `${false}` })
    save(databaseStorage);
}

function searchIndex(value) {
    return databaseStorage.findIndex(obj => {
        return obj.id === `${value}`
    })
}

function check(id) {
    let index = searchIndex(id);
    databaseStorage[index].completed === "false" ? databaseStorage[index].completed = "true" : databaseStorage[index].completed = "false";
    save(databaseStorage)
}

function save(databaseStorage) {
    localStorage.setItem('database', JSON.stringify(databaseStorage))
    window.location.reload();
}

function remove(id) {
    databaseStorage.splice(searchIndex(id), 1);
    save(databaseStorage)
}

