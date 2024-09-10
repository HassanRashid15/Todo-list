// app.js
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const noTasksMessage = document.getElementById('no-tasks-message');
    const container = document.querySelector('.container');

    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', handleListClick);

    function updateNoTasksMessage() {
        // Show or hide the 'no-tasks-message' based on the number of tasks
        noTasksMessage.style.display = taskList.children.length === 0 ? 'block' : 'none';
    }

    function showMessage(text, isError = false) {
        const message = document.createElement('div');
        message.className = `message ${isError ? 'error' : ''}`;
        message.textContent = text;
        container.appendChild(message);
        setTimeout(() => message.classList.add('show'), 10);
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => container.removeChild(message), 500);
        }, 2000);
    }

    function addTask(event) {
        event.preventDefault();
        const taskValue = taskInput.value.trim();

        if (taskValue === '') {
            showMessage('Task cannot be empty!', true);
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            ${taskValue}
            <button class="remove">Delete</button>
        `;
        li.classList.add('show');
        taskList.appendChild(li);

        // Add animation
        setTimeout(() => li.classList.add('show'), 10);

        showMessage('Task added successfully!');
        taskInput.value = '';

        // Update 'No tasks' message
        updateNoTasksMessage();
    }

    function handleListClick(event) {
        const target = event.target;

        if (target.classList.contains('remove')) {
            const li = target.parentElement;
            li.classList.add('hide');

            // Remove item after animation
            setTimeout(() => {
                taskList.removeChild(li);
                // Update 'No tasks' message
                updateNoTasksMessage();
                showMessage('Task deleted successfully!');
            }, 300);

        } else if (target.tagName === 'LI') {
            target.classList.toggle('active');
        }
    }

    // Initial check
    updateNoTasksMessage();
});
