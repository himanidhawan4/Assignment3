const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'], // Requirement: Schema validation
        minlength: [3, 'Title must be at least 3 characters'], // Requirement: Custom length
        trim: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model('Task', taskSchema);