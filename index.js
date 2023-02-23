const inputToDo = document.getElementById('addTask');
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
    const taskValue = inputToDo.value;
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
        <button onclick="removeTask('${task}')">
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

const removeTask = (taskTitle) => {
    const index = searchTaskIndex(taskTitle);
    taskStorage.splice(index, 1);
    saveTasks(taskStorage);
};

arrowButton.addEventListener('click', () => {
    window.location.reload();
});

inputToDo.addEventListener('change', addTask);

Sortable.create(containerTask, {
    animation: 150,
    draggable: ".card-style-input",
    handle: ".card-style-input",
    onEnd: updatePosition,
});

renderTasks(taskStorage);

const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl, {
    delay: { "show": 1000, "hide": 0 }
  })
})

const showTooltip = (text) => {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip', 'show');
    tooltip.innerHTML = text;

    const inputGroup = inputToDo.parentElement;
    inputGroup.appendChild(tooltip);

    setTimeout(() => {
        tooltip.remove();
    }, 100);
};

addTaskBtn.addEventListener('click', () => {
    const taskValue = inputToDo.value.trim();

    if (taskValue) {
        const tasks = taskValue.split(',');
        tasks.forEach(task => {
            showTooltip(`Tarefa "${task}" adicionada`);
            // Adicionar a tarefa à lista
        });
        inputToDo.value = '';
    } else {
        showTooltip('Por favor, insira uma tarefa');
    }
});