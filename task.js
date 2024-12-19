import fs from "fs";

const todo_db = "./tododb.json";
// intiatate the todo database which is a json file
if(!fs.existsSync(todo_db)){ // check if file exists 
    fs.writeFileSync(todo_db, JSON.stringify([]));
}
const tasks = JSON.parse(fs.readFileSync(todo_db, "utf-8")); // load all the task in the database

const currentTime = new Date().toLocaleTimeString("en-Us", {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Change to true for 12-hour time
});

const nextTaskId = () => {
    const nextTaskId = Math.max(...tasks.map(task => task.id)) + 1; // get the max id and add 1 to it 
    return nextTaskId;
    
}

// function add task based on the description
const add = (description) => {
    let task_id = nextTaskId();
    let status = 'todo';
    let createAt = currentTime;
    let updatedAt = createAt;
    tasks.push({"id": task_id, "description": description, "status": status, "createdAt": createAt, "updatedAt": updatedAt});
    fs.writeFileSync(todo_db, JSON.stringify(tasks));
}

// list all task avalible
const list = () => {
    console.log(tasks);
}
// list all undone tasks 
const listTodoTasks = () => {
    let todoTasks = tasks.filter(task => task.status == "todo");
    console.log(todoTasks);
}

// list all done tasks
const listDoneTasks = () => {
    let doneTasks = tasks.filter(task => task.status == "done");
    console.log(doneTasks);
}

// list all inprogress tasks
const listInProgressTasks = () => {
    let inProgressTasks = tasks.filter(task => task.status == "in-progress");
    console.log(inProgressTasks);
}

// update a task as done
const markAsDone = (task_id) => {
    tasks[task_id-1] = "done";
    task[task_id-1] = currentTime;
    fs.writeFileSync(todo_db, JSON.stringify(tasks));
}

// update a task as in-progress
const markAsInProgress = (task_id) => {
    tasks[task_id-1].status = "in-progress";
    tasks[task_id-1].updatedAt = currentTime;
    fs.writeFileSync(todo_db, JSON.stringify(tasks));
}

// delete a task
const deleteTask = (task_id) => {
    let newTasks = tasks.filter(task => task.id !== task_id);
    fs.writeFileSync(todo_db, JSON.stringify(newTasks));
}
