const card = (id, completed, task) =>
    `
    <div class="card-style-input animate__animated animate__fadeIn">
        <button onclick=check(${id})>
            <i class="bi ${completed === 'true' ? "bi-check-square" : "bi-square"}"></i>
        </button>
        <h1 id=label_${id} class="${completed === "false" ? '' : "text-decoration-line-through text-muted"}">${task}</h1>
        <button onclick=remove(${id})>
            <i class="bi bi-x-lg"></i>
        </button>
    </div> 
    `
const inputToDo = document.getElementById("addTask");
const containerTask = document.getElementById('containerTask');
const arrowButton = document.getElementById("addTaskBtn");
let databaseStorage = JSON.parse(localStorage.getItem('todoDB'));

if (databaseStorage === null) {
    databaseStorage = []; 
} else {
    renderTask(databaseStorage); 
}

arrowButton.addEventListener('click', () => {
    window.location.reload()
})

inputToDo.addEventListener('change', () => {
    addTask();
})

function renderTask(databaseArray) {
    if (databaseArray !== null) {
        for (let i = 0; i < databaseArray.length; i++) {
            let id = databaseStorage[i].id;
            let completed = databaseStorage[i].completed;
            let task = databaseStorage[i].task;

            containerTask.innerHTML += card(id, completed, task)
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
    localStorage.setItem('todoDB', JSON.stringify(databaseStorage))
    window.location.reload();
}

function remove(id) {
    databaseStorage.splice(searchIndex(id), 1);
    save(databaseStorage)
}
