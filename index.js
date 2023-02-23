
const card = (id, completed, task) => `
    <div class="card-style-input animate__animated animate__fadeIn">
        <button onclick="check(${id})">
            <i class="bi ${completed ? 'bi-check-square' : 'bi-square'}"></i>
        </button>
        <h1 id="label_${id}" class="${completed ? 'text-decoration-line-through text-muted' : ''}">${task}</h1>
        <button onclick="remove(${id})">
            <i class="bi bi-x-lg"></i>
        </button>
    </div> 
`;

const inputToDo = document.getElementById('addTask');
const containerTask = document.getElementById('containerTask');
const arrowButton = document.getElementById('addTaskBtn');
const databaseStorage = JSON.parse(localStorage.getItem('todoDB')) || [];

const renderTask = (databaseArray) => {
    if (databaseArray) {
        const tasksHtml = databaseArray.map(({ id, completed, task }) => card(id, completed, task));
        const allTasksHtml = tasksHtml.join('');
        containerTask.innerHTML = allTasksHtml;
    }
};


const addTask = () => {
    const addTaskValue = inputToDo.value;
    const id = Math.floor(Math.random() * 100); // create random number 0 to 100
    databaseStorage.push({ id: `${id * 1}`, task: `${addTaskValue}`, completed: false });
    save(databaseStorage);
};

const searchIndex = id => databaseStorage.findIndex(({ id: taskId }) => taskId === `${id}`);


const check = (id) => {
    const index = searchIndex(id);
    databaseStorage[index].completed = databaseStorage[index].completed === 'false' ? 'true' : 'false';
    save(databaseStorage);
};


const save = (databaseArray, shouldReloadPage = true) => {
    localStorage.setItem('todoDB', JSON.stringify(databaseArray));
    if (shouldReloadPage) {
        window.location.reload();
    }
};


const remove = (id) => {
    const index = searchIndex(id);
    databaseStorage.splice(index, 1);
    save(databaseStorage);
};

arrowButton.addEventListener('click', () => {
    window.location.reload();
});

inputToDo.addEventListener('change', addTask);

renderTask(databaseStorage);
