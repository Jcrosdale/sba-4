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

const taskSelect = document.getElementById('task-select');
const filterValue = document.getElementById('filterValue');

//Use an array to store tasks, each represented as an object.
let taskList = JSON.parse(localStorage.getItem('taskList')) || [];
let newTaskId = taskList.reduce((maxId, task) => // .reduce() turns all elements of an array to a single value
    Math.max(maxId, task.id), 0) + 1; // keeps track of the highest task ID

//Write functions to add tasks, update task status, check overdue tasks, and filter tasks.

function addTask() {
    const task = {
        id: newTaskId,
        name: taskInput.value,
        category: categoryInput.value,
        deadline: deadlineInput.value,
        status: statusInput.value
    };

    // Prevent empty tasks
    if (!task.name || !task.category || !task.deadline) {
        alert("Please fill in all fields.");
        return;
    }

    newTaskId++;
    taskList.push(task);

    overdueTask();
    saveTasks();
    displayTasks();

    // Clear input fields
    taskInput.value = '';
    categoryInput.value = '';
    deadlineInput.value = '';

};

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function updateTask(taskId, newStatus) {
    const task = taskList.find(task => task.id === taskId);

    if (!task) return;
    task.status = newStatus;

    // Save changes
    overdueTask();
    saveTasks();
    filterTask(); // Filter applied after status is updated
};

function overdueTask() {
    const today = new Date().toLocaleDateString('en-CA'); // Format: YYYY-MM-DD 

    for (let task of taskList) {
        if (task.deadline < today && task.status !== 'Completed') {
            task.status = 'Overdue';
        }
    }
};

function filterTask() {
    const selectedType = taskSelect.value; // Value from first dropdown
    const selectedValue = filterValue.value; // Value from second dropdown

    let filteredTasks = taskList;

    if (selectedType === 'status' && selectedValue) { // Status was selected and there's a value in the second dropdown
        filteredTasks = taskList.filter(task => task.status === selectedValue);
    } else if (selectedType === 'category' && selectedValue) {
        filteredTasks = taskList.filter(task => task.category === selectedValue);
    };

    displayTasks(filteredTasks);
};

//Event listeners
addTaskButton.addEventListener('click', addTask);
taskSelect.addEventListener('change', filterTask);
filterValue.addEventListener('change', filterTask);

//Use DOM manipulation to display the task list dynamically.
function displayTasks(filteredTasks = taskList) { // Accepts an array of tasks
    tasks.innerHTML = ''; // clears the old list before adding an updated one

    for (let task of filteredTasks) { // Loops through each object in the taskList array
        let listItem = document.createElement("li"); // Creates a new HTML li
        let selectItem = document.createElement("select"); // Creates a new HTML dropdown

        let status1 = document.createElement("option");
        let status2 = document.createElement("option");
        let status3 = document.createElement("option");
        let status4 = document.createElement("option");

        // Assigns values to each option
        status1.value = 'Not Started';
        status2.value = 'In Progress';
        status3.value = 'Completed';
        status4.value = 'Overdue';

        // Sets the text content for each option
        status1.textContent = 'Not Started';
        status2.textContent = 'In Progress';
        status3.textContent = 'Completed';
        status4.textContent = 'Overdue';

        status4.disabled = true; // Prevents overdue from being an option since it needs to be automatic after a deadline

        // Adds options to the dropdown
        selectItem.appendChild(status1);
        selectItem.appendChild(status2);
        selectItem.appendChild(status3);
        selectItem.appendChild(status4);

        // Sets the dropdown to the task's current status
        selectItem.value = task.status;

        // Displays task details
        listItem.textContent = `${task.id} | ${task.name} | ${task.category} | ${task.deadline} | ${task.status}`;

        // Adds dropdown and list item to the list
        listItem.appendChild(selectItem);
        tasks.appendChild(listItem);

        // Dropdown event listener
        selectItem.addEventListener('change', function () {
            updateTask(task.id, selectItem.value);
        });
    }
}

overdueTask();
saveTasks();
displayTasks();

//Implement local storage to persist task data.