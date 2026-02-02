// 1. Import dependencies
const express = require('express');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Title is required'], 
        minlength: [3, 'Title must be at least 3 characters'] // Added this!
    },
    description: { type: String },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});
// 3. Create the Model
const Task = mongoose.model('Task', taskSchema);

const app = express();
app.use(express.json());

// 4. Import local data
const tasks = require('./data');

// --- ROUTES ---

// GET: Local data from data.js
app.get('/data', (req, res) => {
    res.json(tasks);
});

// GET: Fetching with Filtering, Sorting, and Pagination (Slide Pattern)
// GET /api/tasks?completed=true&page=1&limit=10&sortBy=title&order=asc
app.get('/api/tasks', async (req, res, next) => {
    try {
        // 1. Filtering Logic
        const filter = {};
        if (req.query.completed) {
            filter.completed = req.query.completed === 'true';
        }
        if (req.query.search) {
            filter.title = { $regex: req.query.search, $options: 'i' };
        }

        // 2. Sorting Logic (Requirement: by createdAt or title)
        const sortField = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.order === 'asc' ? 1 : -1;

        // 3. Pagination Logic (Using parseInt from slides)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const results = await Task.find(filter)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit);

        // Custom Header X-Total-Count (Requirement from slides)
        const totalCount = await Task.countDocuments(filter);
        res.set('X-Total-Count', totalCount);

        res.status(200).json(results);
    } catch (error) {
        next(error); // Pass to the 500 error handler
    }
});
// GET: Fetch a single task by ID
app.get('/api/tasks/:id', async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Resource not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
});

// POST: Create Task with Validation
app.post('/api/tasks', async (req, res, next) => {
    try {
        const { title, description } = req.body;
        
        // Manual validation check similar to slide
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const newTask = await Task.create({
            title,
            description,
            completed: req.body.completed || false
        });

        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
});

// PUT: Update Task with Validation
app.put('/api/tasks/:id', async (req, res, next) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Resource not found' }); // Slide error message
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
});

// DELETE: Remove Task with Validation
app.delete('/api/tasks/:id', async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Resource not found" });
        }
        res.status(204).send(); // Standard delete response
    } catch (error) {
        next(error);
    }
});

// --- ERROR HANDLING ---
// Updated Error Handler in routes.js
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    // If we manually passed an error with a status (like 404 or 400)
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';

    res.status(status).json({
        status: status,
        message: message
    });
});
module.exports = app;