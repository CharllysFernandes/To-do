const inputToDo = document.getElementById('addTask');
const containerTask = document.getElementById('containerTask');
const arrowButton = document.getElementById('addTaskBtn');
const taskStorage = JSON.parse(localStorage.getItem('taskDB')) || [];

Sortable.create(containerTask, {
    animation: 150,
    draggable: ".card-style-input",
    handle: ".card-style-input",
    onEnd: () => {
        const tasks = Array.from(containerTask.children).map(task => {
            const id = task.querySelector('h1').id.replace('label_', '');
            const completed = task.querySelector('i').classList.contains('bi-check-square');
            const text = task.querySelector('h1').innerText;
            return { id, completed, task: text };
        });
        taskStorage.splice(0, taskStorage.length, ...tasks);
        saveTasks(taskStorage, false);
    }
});

const renderTasks = (taskArray) => {
    if (taskArray) {
        const taskHtml = taskArray.map(({ id, completed, task }) => createTaskCard(id, completed, task)).join('');
        containerTask.innerHTML = taskHtml;
    }
};

const addTask = () => {
    const taskValue = inputToDo.value;
    const id = Math.floor(Math.random() * 100); // create random number 0 to 100
    taskStorage.push({ id: `${id * 1}`, task: `${taskValue}`, completed: false });
    saveTasks(taskStorage);
};

const searchTaskIndex = id => taskStorage.findIndex(({ id: taskId }) => taskId === `${id}`);

const checkTask = (id) => {
    const index = searchTaskIndex(id);
    taskStorage[index].completed = !taskStorage[index].completed;
    saveTasks(taskStorage);
};

const createTaskCard = (id, completed, task) => `
    <div class="card-style-input animate__animated animate__fadeIn">
        <button onclick="checkTask(${id})">
            <i class="bi ${completed ? 'bi-check-square' : 'bi-square'}"></i>
        </button>
        <h1 id="label_${id}" class="${completed ? 'text-decoration-line-through text-muted' : ''}">${task}</h1>
        <button onclick="removeTask(${id})">
            <i class="bi bi-x-lg"></i>
        </button>
    </div> 
`;

const saveTasks = (taskArray, shouldReloadPage = true) => {
    localStorage.setItem('taskDB', JSON.stringify(taskArray));
    if (shouldReloadPage) {
        window.location.reload();
    }
};

const removeTask = (id) => {
    const index = searchTaskIndex(id);
    taskStorage.splice(index, 1);
    saveTasks(taskStorage);
};

arrowButton.addEventListener('click', () => {
    window.location.reload();
});

inputToDo.addEventListener('change', addTask);

renderTasks(taskStorage);
