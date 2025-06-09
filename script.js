document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    
    // Загрузка задач из localStorage
    loadTasks();
    
    // Добавление задачи
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        // Создание элемента задачи
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Удалить';
        deleteBtn.addEventListener('click', function() {
            taskItem.remove();
            saveTasks();
        });
        
        // Отметка как выполненной
        taskSpan.addEventListener('click', function() {
            taskItem.classList.toggle('completed');
            saveTasks();
        });
        
        taskItem.appendChild(taskSpan);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
        
        // Очистка поля ввода и сохранение
        taskInput.value = '';
        saveTasks();
    }
    
    // Сохранение задач в localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(function(taskItem) {
            tasks.push({
                text: taskItem.querySelector('span').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Загрузка задач из localStorage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            
            tasks.forEach(function(task) {
                const taskItem = document.createElement('li');
                taskItem.className = 'task-item';
                
                if (task.completed) {
                    taskItem.classList.add('completed');
                }
                
                const taskSpan = document.createElement('span');
                taskSpan.textContent = task.text;
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = 'Удалить';
                deleteBtn.addEventListener('click', function() {
                    taskItem.remove();
                    saveTasks();
                });
                
                taskSpan.addEventListener('click', function() {
                    taskItem.classList.toggle('completed');
                    saveTasks();
                });
                
                taskItem.appendChild(taskSpan);
                taskItem.appendChild(deleteBtn);
                taskList.appendChild(taskItem);
            });
        }
    }
});