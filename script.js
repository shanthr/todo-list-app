// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `${taskInput.value} <button onclick="removeTask(this)">X</button>`;

    taskList.appendChild(li);
    saveTasks(); // Save updated task list to local storage

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
        tasks.push(li.textContent.replace("X", "").trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => {
        let li = document.createElement("li");
        li.innerHTML = `${task} <button onclick="removeTask(this)">X</button>`;
        taskList.appendChild(li);
    });
}
