import fs from "fs";
import chalk from "chalk";
import Table from "cli-table";


const todo_table = new Table({
    head: ["id", "description", "status", "createdAt", "updatedAt"],
    colWidths: [10, 60, 20, 20, 20],
})

const todo_db = "./tododb.json";
// intiatate the todo database which is a json file
if(!fs.existsSync(todo_db)){ // check if file exists 
    fs.writeFileSync(todo_db, JSON.stringify([]));
}
const tasks = JSON.parse(fs.readFileSync(todo_db, "utf-8")); // load all the task in the database

// get the current time
const currentTime = new Date().toLocaleTimeString("en-Us", {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Change to true for 12-hour time
});

const nextTaskId = () => {
    if (tasks.length > 0){
        const nextTaskId = Math.max(...tasks.map(task => task.id)) + 1; // get the max id and add 1 to it 
        return nextTaskId;
    }else{
        return 1;
    } 
}

// function add task based on the description
export const add = (description) => {
    let task_id = nextTaskId();
    let status = 'to-do';
    let createAt = currentTime;
    let updatedAt = createAt;
    tasks.push({"id": task_id, "description": description, "status": status, "createdAt": createAt, "updatedAt": updatedAt});
    fs.writeFileSync(todo_db, JSON.stringify(tasks));
    return task_id;
}

// list all task avalible
export const list = () => {
    if (tasks.length && tasks){
        console.log(chalk.green.bold('List of tasks'));
        tasks.forEach(task => {
            if(task.status === "to-do"){
                todo_table.push([task.id, task.description, chalk.red.bold(task.status), task.createdAt, task.updatedAt]);
            }else if (task.status === "in-progress"){
                todo_table.push([task.id, task.description, chalk.yellow(task.status), task.createdAt, task.updatedAt]);
            }else{
                todo_table.push([task.id, task.description, chalk.green.bold(task.status), task.createdAt, task.updatedAt]);
            }
        });
        console.log(todo_table.toString());
    }else{
        console.log(chalk.red.bold('No tasks available'));
    }
}
// list all undone tasks 
export const listTodoTasks = () => {
    let todoTasks = tasks.filter(task => task.status == "to-do");
    if(todoTasks && todoTasks.length){
        console.log(chalk.green.bold('List of in progress tasks'));
        todoTasks.forEach(task => {
            todo_table.push([task.id, task.description, chalk.red.bold(task.status), task.createdAt, task.updatedAt]);
        });
        console.log(todo_table.toString());
    }else{
        console.log(chalk.green.bold('No undone tasks available'));
    }
}

// list all done tasks
export const listDoneTasks = () => {
    let doneTasks = tasks.filter(task => task.status == "done");
    if(doneTasks && doneTasks.length){
        console.log(chalk.red.bold('List of undone tasks'));
        doneTasks.forEach(task => {
            todo_table.push([task.id, task.description, chalk.green.bold(task.status), task.createdAt, task.updatedAt]);
        });
        console.log(todo_table.toString());
    }else{
        console.log(chalk.red.bold('No done tasks available'));
    }
}

// list all inprogress task
export const listInProgressTasks = () => {
    let inProgressTasks = tasks.filter(task => task.status == "in-progress");
    if(inProgressTasks && inProgressTasks.length){
        console.log(chalk.yellow.bold('List of inprogress tasks'));
        inProgressTasks.forEach(task => {
            todo_table.push([task.id, task.description, chalk.yellow(task.status), task.createdAt, task.updatedAt]);
        });
        console.log(todo_table.toString());
    }else{
        console.log(chalk.yellowBright.bold('No in progress tasks available'));
    }
}

// update a task as done
export const markAsDone = (task_id) => {
    tasks[task_id-1].status = "done";
    tasks[task_id-1].updatedAt = currentTime;
    console.log(tasks[task_id-1])
    fs.writeFileSync(todo_db, JSON.stringify(tasks));
}

// update a task as in-progress
export const markAsInProgress = (task_id) => {
    tasks[task_id-1].status = "in-progress";
    tasks[task_id-1].updatedAt = currentTime;
    fs.writeFileSync(todo_db, JSON.stringify(tasks));
}

// delete a task
export const deleteTask = (task_id) => {
    let newTasks = tasks.filter(task => task.id !== task_id);
    fs.writeFileSync(todo_db, JSON.stringify(newTasks));
}

// update a task
export const updateTask = (task_id, description) => {
    tasks[task_id-1].description = description;
    tasks[task_id-1].updatedAt = currentTime;
    fs.writeFileSync(todo_db, JSON.stringify(tasks));
    return task_id
}


