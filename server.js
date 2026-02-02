// server.js
const app = require('./routes');
const connectDB = require('./mongoose'); // Import the function from mongoose.js

const PORT = 3000;

connectDB()
    .then(() => {
        console.log('MongoDB connected via dotenv setup!');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Connection error:', err));