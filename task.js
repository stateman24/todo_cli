#! /usr/bin/env node

import { create } from "domain";
import fs from "fs";
import inquirer from "inquirer";

const todo_db = "./tododb.json"
// intiatate the todo database which is a json file
if(!fs.existsSync(todo_db)){ // check if file exists 
    fs.writeFileSync(todo_db, JSON.stringify({"tasks":[]}))
}
const db = JSON.parse(fs.readFileSync(todo_db, "utf-8")) // load all the task in the database

const currentTime = new Date().toLocaleTimeString("en-Us", {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Change to true for 12-hour time
});


const add = (task_id, description) => {
    let status = 'todo';
    let createAt = currentTime;
    let updatedAt = createAt;
    db.tasks.push({"id": task_id, "description": description, "status": status, "createdAt": createAt, "updatedAt": updatedAt})
    fs.writeFileSync(todo_db, JSON.stringify(db))
}

add(1, "get todo cli done by today");
add(2, "brush my teeth this monring");

const markAsDone = (task_id) => {
    db.tasks[task_id].status = "done"
    db.tasks[task_id].updatedAt = currentTime
    fs.writeFileSync(todo_db, JSON.stringify(db))
}

