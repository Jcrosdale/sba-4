//Onjective
//You will create a dynamic task management app that lets users:

//Add new tasks with details such as the task name, category, deadline, and status.
//Update the status of tasks to reflect their progress (e.g., “In Progress,” “Completed,” “Overdue”).
//Automatically update task status based on the current date (tasks past their deadline will be marked as “Overdue”).
//Filter tasks by status or category.
//Persist task data using local storage so tasks are saved even after refreshing the page.

//DOM
const tasks = document.getElementById('tasks');
const taskInput = document.getElementById('taskInput');
const categoryInput = document.getElementById('categoryInput');
const deadlineInput = document.getElementById('deadlineInput');
const statusInput = document.getElementById('statusInput');
const addTaskButton = document.getElementById('addTaskButton');
let option = document.createElement("option");

//Use an array to store tasks, each represented as an object.
let taskList = [];
let newTaskId = 1;

//Write functions to add tasks, update task status, check overdue tasks, and filter tasks.

function addTask() {    
    const task = {
        id: newTaskId,
        name: taskInput.value,
        category: categoryInput.value,
        deadline: deadlineInput.value,
        status: statusInput.value
    };

    newTaskId++;
    taskList.push(task);
    displayTasks();
};

function updateTask(taskId, newStatus) {
    const task = taskList.find(task => task.id === taskId);
    task.status = newStatus;
};

function overdueTask() {
    for (let task of taskList) {
        const today = new Date();
        const deadline = new Date(task.deadline);
        if (deadline < today && task.status !== 'Completed'){
            task.status='Overdue';
        }
    }
};

function filterTask() {

};

//Event listeners
addTaskButton.addEventListener('click', addTask);

//Use DOM manipulation to display the task list dynamically.
function displayTasks() {
    tasks.innerHTML = '';
    
    for (let task of taskList) {
        let listItem = document.createElement("li");
        let selectItem = document.createElement("select");
        let status1 = document.createElement("option");
        let status2 = document.createElement("option");
        let status3 = document.createElement("option");
        status1.textContent = 'Not Started';
        status2.textContent = 'In Progress';
        status3.textContent = 'Completed';
        selectItem.appendChild(status1);
        selectItem.appendChild(status2);
        selectItem.appendChild(status3);

        listItem.textContent = `${task.id} | ${task.name} | ${task.category} | ${task.deadline} | ${task.status}`;

        listItem.appendChild(selectItem);
        tasks.appendChild(listItem);

        selectItem.addEventListener('change', function() {
            updateTask(task.id, selectItem.value);

            displayTasks();

        });
    }
}

overdueTask();
displayTasks();

//Implement local storage to persist task data.