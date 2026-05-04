const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Serves the HTML files from the public folder

// In-memory data storage (No database setup required for the evaluation)
let tasks = [
    { id: 1, title: "Complete Web Assignment" },
    { id: 2, title: "Review for Evaluation" }
];

// --- API ROUTES (CRUD) ---

// 1. GET: Fetch all tasks
app.get('/api/tasks', (req, res) => res.json(tasks));

// 2. POST: Add a new task
app.post('/api/tasks', (req, res) => {
    const newTask = { id: Date.now(), title: req.body.title };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// 3. DELETE: Remove a task
app.delete('/api/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));