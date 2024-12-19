#! /usr/bin/env node
import chalk from "chalk";
import {add, deleteTask, list, listDoneTasks, listTodoTasks, listInProgressTasks, markAsDone, markAsInProgress, updateTask} from "./task.js"

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
        break;

    case "update":
        const newDesciption = args[2];
        const id = parseInt(args[1]);
        if(!id && !newDesciption){
            console.log(chalk.red("Error: Provide task ID and description"));
        }else if (!newDesciption){
            console.log(chalk.red("Error: Provide task description"));
        }else if(!id){
            confirm.log(chalk.red.bold("Error: Provide task ID"))
        }else{
            const task_id = updateTask(id, newDesciption);
            console.log("TaskID:" + task_id + " has been successfully updated")
        }
        break;

    case "--help":
        const listOfCommands = ["add", "update", "list", "delete", "mark"]
        console.log("Here are list of commands");
        listOfCommands.forEach(command => {
            if(command === "add"){
                console.log(chalk.yellow(command) + ": to add a new task ---- [add <description>]");
            }else if(command === "update"){
                console.log(chalk.yellow(command) + ": to update existing task ---- [update <task_id> <description>]");
            }else if(command === "list"){
                console.log(chalk.yellow(command) + ": to list all tasks ---- [list], [list done], [list in-progress], [list todo]");
            }else if(command === "delete"){
                console.log(chalk.yellow(command) + ": to delete task ---- [delete <task_id>]");
            }else if(command === "mark"){
                console.log(chalk.yellow(command) + ": to change task status --- [mark-done <task_id>], [mark-in-progres <task_id>]")
            }
        })   
    }

