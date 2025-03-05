document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `${taskInput.value} <button class="delete" onclick="removeTask(this)">X</button>`;

    taskList.appendChild(li);
    saveTasks(); // Save tasks to local storage

    taskInput.value = "";
}

function removeTask(button) {
    let li = button.parentElement;
    li.remove();
    saveTasks(); // Update local storage after removing a task
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
        tasks.push(li.firstChild.textContent.trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks in local storage
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Retrieve tasks from local storage

    tasks.forEach((task) => {
        let li = document.createElement("li");
        li.innerHTML = `${task} <button class="delete" onclick="removeTask(this)">X</button>`;
        taskList.appendChild(li);
    });
}
