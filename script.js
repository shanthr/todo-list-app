document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `<span>${taskInput.value}</span> <button class="delete" onclick="removeTask(this)">X</button>`;

    taskList.appendChild(li);
    saveTasks(); // Save to local storage

    taskInput.value = "";
}

function removeTask(button) {
    let li = button.parentElement;
    li.remove();
    saveTasks(); // Update storage after removing a task
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li span").forEach((span) => {
        tasks.push(span.textContent.trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save in local storage
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear previous entries

    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get tasks from local storage

    tasks.forEach((task) => {
        let li = document.createElement("li");
        li.innerHTML = `<span>${task}</span> <button class="delete" onclick="removeTask(this)">X</button>`;
        taskList.appendChild(li);
    });
}
