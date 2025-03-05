// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let dueDate = document.getElementById("dueDate");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `
        <span onclick="toggleComplete(this)">${taskInput.value} (Due: ${dueDate.value || "No date"})</span>
        <button onclick="editTask(this)">✏️</button>
        <button onclick="removeTask(this)">X</button>
    `;

    taskList.appendChild(li);
    saveTasks(); 

    taskInput.value = "";
    dueDate.value = "";
}

function toggleComplete(task) {
    task.classList.toggle("completed");
    saveTasks();
}

function editTask(button) {
    let li = button.parentElement;
    let span = li.querySelector("span");
    let newText = prompt("Edit your task:", span.textContent.split(" (Due:")[0]);

    if (newText !== null && newText.trim() !== "") {
        let dueDate = span.textContent.match(/\(Due: (.*?)\)/)[1] || "No date";
        span.innerHTML = `${newText} (Due: ${dueDate})`;
        saveTasks();
    }
}

function removeTask(button) {
    let li = button.parentElement;
    li.remove();
    saveTasks();
}

function clearTasks() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        document.getElementById("taskList").innerHTML = "";
        saveTasks();
    }
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
        tasks.push(li.innerHTML);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((taskHTML) => {
        let li = document.createElement("li");
        li.innerHTML = taskHTML;
        taskList.appendChild(li);
    });
}
