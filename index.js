const card = (id, completed, task) => `
    <div class="card-style-input animate__animated animate__fadeIn">
        <button onclick="check(${id})">
            <i class="bi ${completed === 'true' ? 'bi-check-square' : 'bi-square'}"></i>
        </button>
        <h1 id="label_${id}" class="${completed === 'false' ? '' : 'text-decoration-line-through text-muted'}">${task}</h1>
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
        databaseArray.forEach(({ id, completed, task }) => {
            containerTask.innerHTML += card(id, completed, task);
        });
    }
};

const addTask = () => {
    const addTaskValue = inputToDo.value;
    const id = Math.floor(Math.random() * 100); // create random number 0 to 100
    databaseStorage.push({ id: `${id * 1}`, task: `${addTaskValue}`, completed: `${false}` });
    save(databaseStorage);
};

const searchIndex = (value) => databaseStorage.findIndex(({ id }) => id === `${value}`);

const check = (id) => {
    const index = searchIndex(id);
    databaseStorage[index].completed = databaseStorage[index].completed === 'false' ? 'true' : 'false';
    save(databaseStorage);
};

const save = (databaseArray) => {
    localStorage.setItem('todoDB', JSON.stringify(databaseArray));
    window.location.reload();
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
