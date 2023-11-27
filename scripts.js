document.addEventListener('DOMContentLoaded', () => {
    // Check if there are tasks in local storage and load them
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks(savedTasks);
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    const task = { text: taskText, important: false, completed: false };
    
    // Get existing tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.unshift(task); // Add the new task to the beginning of the array
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTasks(tasks);
    taskInput.value = ''; // Clear the input field
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1); // Remove the task at the specified index
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    renderTasks(tasks);
}

function toggleImportant(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].important = !tasks[index].important;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTasks(tasks);
}

function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the previous tasks

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = `task ${task.important ? 'important' : ''} ${task.completed ? 'completed' : ''}`;

        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);

        const importantButton = document.createElement('button');
        importantButton.textContent = 'Important';
        importantButton.onclick = () => toggleImportant(index);

        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(importantButton);

        taskList.appendChild(taskItem);
    });
}
