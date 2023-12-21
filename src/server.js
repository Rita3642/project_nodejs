const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

let tasks = [
  { id: 1, description: "hacer las compras", complete: false },
  { id: 2, description: "estudiar NodeJs", complete: false },
];

app.get("/tasks", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
  res.json({ tasks })
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    task.complete = true;
    res.json(task);
  } else {
    res.status(404).json({ error: "Task no found." });
  }
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.json({ message: "Task delete successfully." });
});

app.listen(port, () => {
  console.log(`This server listens on http://localhost:${port}`);
});
