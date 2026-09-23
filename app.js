//Onjective
//You will create a dynamic task management app that lets users:

//Add new tasks with details such as the task name, category, deadline, and status.
//Update the status of tasks to reflect their progress (e.g., “In Progress,” “Completed,” “Overdue”).
//Automatically update task status based on the current date (tasks past their deadline will be marked as “Overdue”).
//Filter tasks by status or category.
//Persist task data using local storage so tasks are saved even after refreshing the page.

// DOM
const tasks = document.querySelector('#tasks');


//Use an array to store tasks, each represented as an object.
let storeTasks = [];

//Write functions to add tasks, update task status, check overdue tasks, and filter tasks.
function addTask(task) { //needs parameter because tasks could change on input
    storeTasks.push(task);
}
//Use DOM manipulation to display the task list dynamically.
//Implement local storage to persist task data.