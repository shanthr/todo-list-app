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
    saveTasks(); // Save updated task list

    taskInput.value = "";
}

function removeTask(button) {
    let li = button.parentElement;
    li.remove();
    saveTasks(); // Update storage after removing a task
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
        tasks.push(li.firstChild.textContent.trim()); // Ensure we only save the text, not the "X" button
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save in local storage
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get tasks from storage

    tasks.forEach((task) => {
        let li = document.createElement("li");
        li.innerHTML = `${task} <button onclick="removeTask(this)">X</button>`;
        taskList.appendChild(li);
    });
}
