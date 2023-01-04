let inputToDo = document.getElementById("addTask");
let containerTask = document.getElementById('containerTask');
let databaseStorage = JSON.parse(localStorage.getItem('database'));

// Initial Array

if (databaseStorage === null) {
    console.log("Array vazia")
    databaseStorage = [];
} else {
    renderTask(databaseStorage)
}

inputToDo.addEventListener('change', function () {
    let addTask = document.getElementById("addTask").value;
    
    databaseStorage.push({ id: `${databaseStorage.length}`, task: `${addTask}`, completed: `${false}` })
    let storage = JSON.stringify(databaseStorage)
    localStorage.setItem('database', storage)
    window.location.reload();
})

function renderTask(databaseArray) {
    if (databaseArray !== null) {
        for (let i = 0; i < databaseArray.length; i++) {
            containerTask.innerHTML +=
                `
            <div class="card-style-input">
            <button>
            <i id="check_${databaseStorage[i].id}" class="bi bi-square"></i>
            </button>
            <h1 id=label_${databaseStorage[i].id}>${databaseStorage[i].task}</h1>
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

function remove(index) {
    console.log(index)

    console.log(databaseStorage);
    let newArray = databaseStorage.splice(index, 1);
   
    save(databaseStorage)




    console.log(newArray)


    // document.getElementById(`label_${index}`).classList.add("text-decoration-line-through");
    // document.getElementById(`check_${index}`).classList.remove('bi-square');
    // document.getElementById(`check_${index}`).classList.add('bi-check-square');


}