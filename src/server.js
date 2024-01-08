const express = require("express");
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

let taskIdCounter = 0;

function generateSequentialId() {
  return taskIdCounter++;
}

let tasks = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.get("/all-tasks", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'allTasks.html'));
});

app.get("/tasks", (req, res) => {
  const tasks = readTasksFromJSON();
  console.log(tasks)
  res.json({ tasks });
});

app.post("/tasks", (req, res) => {
  const tasks = readTasksFromJSON();

  const newTask = {
    id: generateSequentialId(),
    description: req.body.modalDescription,
    completed: false,
  }

  tasks.unshift(newTask)
  writeTasksToJSON(tasks);

  return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`This server listens on http://localhost:${port}`);
});

function readTasksFromJSON() {
  try {
    const data = fs.readFileSync('tasks.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeTasksToJSON(tasks) {
  const data = JSON.stringify(tasks, null, 2);
  fs.writeFileSync('tasks.json', data, 'utf-8');
}