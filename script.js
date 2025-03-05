// Firebase configuration (Replace with your actual Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyB3nrPuqCXgce6HZHTsFzSe8r0KvwKj-pc",
    authDomain: "task-manager42.firebaseapp.com",
    databaseURL: "https://task-manager42-default-rtdb.firebaseio.com/",
    projectId: "task-manager42",
    storageBucket: "task-manager42.firebasestorage.app",
    messagingSenderId: "373333916044",
    appId: "1:373333916044:web:d053a629a317eeeaff7ea9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("tasks");

// Add task to Firebase
function addTask() {
    let taskInput = document.getElementById("taskInput");
    if (taskInput.value.trim() === "") return alert("Enter a task!");

    db.push({ task: taskInput.value }); // Store in Firebase
    taskInput.value = "";
}

// Remove task from Firebase
function removeTask(key) {
    db.child(key).remove(); // Delete from Firebase
}

// Load tasks in real time
db.on("value", (snapshot) => {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    snapshot.forEach((childSnapshot) => {
        let key = childSnapshot.key;
        let task = childSnapshot.val().task;

        let li = document.createElement("li");
        li.innerHTML = `${task} <button onclick="removeTask('${key}')">X</button>`;
        taskList.appendChild(li);
    });
});
