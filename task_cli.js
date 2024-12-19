#! /usr/bin/env node
import chalk from "chalk";
import {add, deleteTask, list, listDoneTasks, listTodoTasks, listInProgressTasks, markAsDone, markAsInProgress} from "./task.js"

const args = process.argv.slice(2);
switch(args[0]){
    case "add":
        const description = args[1];
        if (!description){
            console.log(chalk.red("Error: Task description is required"));
        }else{
        const task_id = add(description);
        console.log(chalk.green("Task added successfully (ID:" + task_id +")"));
        }
        break;
    
    case "list":
        if(args.length === 1){
            list();
        }else{
            if(args[1] === "done"){
                listDoneTasks();
            }else if(args[1] === "in-progress"){
                listInProgressTasks();
            }else if(args[1] === "todo"){
                listTodoTasks();
            }else{
                console.log(chalk.red("Error: Invalid option"))
            }
        }
        break;
    
    case "mark-done":
        const taskId = parseInt(args[1]);
        if (!taskId) {
            console.log(chalk.red("Provide task ID"));
        }else{
            markAsDone(taskId);
            console.log(chalk.green("Task marked as done successfully"));
        }
        break;
    case "mark-in-progress":
        const taskID = parseInt(args[1]);
        if (!taskID) {
            console.log(chalk.red("Error: Provide task ID"));
        }else{
            markAsInProgress(taskID);
            console.log(chalk.green("Task marked as done successfully"));
        }
        break;
    
    case "delete":
        const taskid = parseInt(args[1]);
        if(!taskid){
            console.log(chalk.red("Error: Provide task ID"));
        }else{
            deleteTask(taskid);
            console.log(chalk.green("Task removed successfully"));
        }
    }

