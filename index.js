const addTaskInput = document.getElementById('addTask');
const addTaskBtn = document.getElementById('addTaskBtn');
const containerTask = document.getElementById('containerTask');
const arrowButton = document.getElementById('addTaskBtn');
const taskStorage = JSON.parse(localStorage.getItem('taskDB')) || [];

const updatePosition = () => {
    const taskCards = containerTask.querySelectorAll(".card-style-input");
    const updatedTaskStorage = [];

    taskCards.forEach((card, index) => {
        const taskTitle = card.querySelector("h1").textContent;
        const task = taskStorage.find(({ task }) => task === taskTitle);
        task.position = index;
        updatedTaskStorage.push(task);
    });

    saveTasks(updatedTaskStorage);
};

const renderTasks = (taskArray) => {
    if (taskArray) {
        const taskHtml = taskArray.map(({ completed, task }) => createTaskCard(completed, task)).join('');
        containerTask.innerHTML = taskHtml;
    }
};

const addTask = () => {
    const taskValue = addTaskInput.value;
    const tasks = taskValue.split(",").map(task => task.trim());
    tasks.forEach(task => {
        const position = taskStorage.length;
        taskStorage.push({ task, completed: false, position });
    });
    saveTasks(taskStorage);
};

const searchTaskIndex = taskTitle => taskStorage.findIndex(({ task }) => task === taskTitle);

const checkTask = (taskTitle) => {
    const index = searchTaskIndex(taskTitle);
    taskStorage[index].completed = !taskStorage[index].completed;
    saveTasks(taskStorage);
};

const createTaskCard = (completed, task) => `
    <div class="card-style-input animate__animated animate__fadeIn">
        <button onclick="checkTask('${task}')">
            <i class="bi ${completed ? 'bi-check-square' : 'bi-square'}"></i>
        </button>
        <h1 class="${completed ? 'text-decoration-line-through text-muted' : ''}">${task}</h1>
    </div> 
`;

const saveTasks = (taskArray, shouldReloadPage = true) => {
    localStorage.setItem('taskDB', JSON.stringify(taskArray));
    if (shouldReloadPage) {
        window.location.reload();
    }
};

const removeTask = (taskTitle) => {
    const index = searchTaskIndex(taskTitle);
    taskStorage.splice(index, 1);
    saveTasks(taskStorage);
};

arrowButton.addEventListener('click', () => {
    window.location.reload();
});

addTaskInput.addEventListener('change', addTask);

Sortable.create(containerTask, {
    animation: 150,
    draggable: ".card-style-input",
    handle: ".card-style-input",
    onEnd: updatePosition,
});

renderTasks(taskStorage);

const showAddTaskTooltip = () => {
    const addTaskTooltip = new bootstrap.Tooltip(addTaskInput, {
        title: 'Add more than one task by separating them with commas.',
        placement: 'top',
        delay: {
            show: 500,
            hide: 3000,
        },
    });

    addTaskTooltip.show();

    setTimeout(() => {
        addTaskTooltip.dispose();
    }, 2000);
};

addTaskInput.addEventListener('mouseover', showAddTaskTooltip);


const trashIcon = document.getElementById('trash');

trashIcon.addEventListener('dragover', (event) => {
    event.preventDefault();
    trashIcon.classList.add('dragover');
});

trashIcon.addEventListener('dragleave', () => {
    trashIcon.classList.remove('dragover');
});

trashIcon.addEventListener('drop', (event) => {
    event.preventDefault();
    const taskTitle = event.dataTransfer.getData('text/plain').trim().replace(/\n/g, '');
    console.log(taskTitle)
    removeTask(taskTitle);
    trashIcon.classList.remove('dragover');
});
