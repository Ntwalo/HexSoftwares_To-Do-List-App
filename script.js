document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    loadTasks();

    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskActions);

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => renderTask(task));
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = { text: taskText, completed: false };
            renderTask(task);
            saveTask(task);
            taskInput.value = '';
        }
    }

    function renderTask(task) {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.classList.toggle('completed', task.completed);
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove');
        li.appendChild(removeButton);
        taskList.appendChild(li);
    }

    function handleTaskActions(event) {
        if (event.target.classList.contains('remove')) {
            removeTask(event.target.parentElement);
        } else {
            toggleTaskCompletion(event.target);
        }
    }

    function removeTask(taskItem) {
        taskList.removeChild(taskItem);
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.text !== taskItem.textContent.replace('Remove', '').trim());
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    function toggleTaskCompletion(taskItem) {
        taskItem.classList.toggle('completed');
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.map(task => {
            if (task.text === taskItem.textContent.replace('Remove', '').trim()) {
                task.completed = !task.completed;
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    function saveTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
