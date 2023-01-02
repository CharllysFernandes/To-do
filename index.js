let inputToDo = document.getElementById("addTask");
let containerTask = document.getElementById('containerTask');
let databaseStorage = JSON.parse(localStorage.getItem('database'))

if (databaseStorage !== null) {
    for (let i = 0; i < databaseStorage.length; i++) {
        containerTask.innerHTML +=
            `
        <div class="card-style-input">
        <button onclick=completed(${databaseStorage[i].id})>
        <i class="bi bi-square"></i>
        </button>
        <h1 id=label_${databaseStorage[i].id}>${databaseStorage[i].task}</h1>
        <button>
        <i class="bi bi-x-lg"></i>
        </button>
        </div>
        `
    }

} else {
    databaseStorage = [];
}

inputToDo.addEventListener('change', function () {
    let addTask = document.getElementById("addTask").value;
    containerTask.innerHTML +=
        `
    <div class="card-style-input">
    <button>
        <i class="bi bi-square"></i>
    </button>
    <h1>${addTask}</h1>
    <button>
        <i class="bi bi-x-lg"></i>
    </button>
    </div>
    `
    // console.log(getTaskInput())

    databaseStorage.push({ id: `${databaseStorage.length + 1}`, task: `${addTask}` })
    let storage = JSON.stringify(databaseStorage)
    localStorage.setItem('database', storage)

})

function completed(id) {
    console.log( id)
    let label = document.getElementById(`label_${id}`)

    label.classList.add("text-decoration-line-through");

}