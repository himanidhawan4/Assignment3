<h1>Assignment 3</h1>
<h2>Assignment: MERN Backend API (Task Manager):</h2>
<h2>Goal: Build a complete backend API for a simple Task Manager application using Node.js, Express.js, and MongoDB (via Mongoose).</h2>
<h2>STEPS THAT ARE ESSENTIAL FOR SETUP :</h2>
<p> 
1. for creating new file named assignment3</br>
   mkdir assignment3</br>
2. for using this file</br>
  cd assignment3</br>
3. for installing json packages</br>
  npm init -y</br>
4. for installing express.js</br>
 npm install express</br>
5. for making new file named server</br>
 echo > server.js</br>
6. for installing mongoose</br>
 npm install mongoose</br>
7. connecting mongoose and mongodb </br>
 # Middleware to parse JSON datar</br>
app.use(express.json());r</br>
const DB_URI = 'mongodb://127.0.0.1:27017/taskManager';r</br>
// 1. Connect to MongoDB using mongoose.connect()
mongoose.connect(DB_URI) </br>
</p>
</br>
<h2>Task Management (MongoDB)</h2>
Create	POST	/api/tasks	Create a new task (Requires title).<\br>
Read All	GET	/api/tasks	Fetch all tasks with advanced queries (.<\br>
Update	PUT	/api/tasks/:id	Update a task by its ID..<\br>
Delete	DELETE	/api/tasks/:id	Remove a task by its ID..<\br>
<h2> Error Handling<\h2>
   <p> 
The API includes a centralized error handler that returns JSON responses for:
400 Bad Request: Missing titles or invalid ID formats.
404 Not Found: Attempting to access/update a task that doesn't exist.
500 Internal Server Error: Unexpected server-side issues.
 </p>
