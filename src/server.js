const express = require("express");
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static("public"));
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));


let tasks = [
  { id: 1, description: "hacer las compras", complete: true },
  { id: 2, description: "estudiar NodeJs", complete: false },
];

app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/public/index.html");
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));

});

app.get("/tasks", (req, res) => {
  res.json(tasks)
});

app.listen(port, () => {
  console.log(`This server listens on http://localhost:${port}`);
});























































// app.put("/tasks/:id", (req, res) => {
//   const taskId = parseInt(req.params.id);
//   const task = tasks.find((task) => task.id === taskId);

//   if (task) {
//     task.complete = true;
//     res.json(task);
//   } else {
//     res.status(404).json({ error: "Task no found." });
//   }
// });

// app.delete("/tasks/:id", (req, res) => {
//   const taskId = parseInt(req.params.id);
//   tasks = tasks.filter((task) => task.id !== taskId);
//   res.json({ message: "Task delete successfully." });
// });