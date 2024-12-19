# Todo CLI

A command-line interface (CLI) application for managing tasks efficiently. This tool allows users to create, update, delete, and track the status of their tasks.

## Features
- Add new tasks with a description.
- Update existing tasks.
- List all tasks or filter by status (done, in-progress, or todo).
- Delete tasks by their ID.
- Mark tasks as done or in-progress.

---

## Installation

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your system.

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Make the CLI globally accessible:
   ```bash
   npm link
   ```

Now you can use `todo-cli` from anywhere on your system.

---

## Usage

### Adding a New Task
To add a new task, use the `add` command:
```bash
todo-cli add <description>
```
Example:
```bash
todo-cli add "Write documentation for Todo CLI"
```

### Updating an Existing Task
To update the description of an existing task, use the `update` command:
```bash
todo-cli update <task_id> <description>
```
Example:
```bash
todo-cli update 1 "Finalize documentation for Todo CLI"
```

### Listing Tasks
To list all tasks, use:
```bash
todo-cli list
```
To filter tasks by status, use one of the following commands:
- List completed tasks:
  ```bash
  todo-cli list done
  ```
- List tasks in progress:
  ```bash
  todo-cli list in-progress
  ```
- List tasks yet to be started:
  ```bash
  todo-cli list todo
  ```

### Deleting a Task
To delete a task by its ID, use the `delete` command:
```bash
todo-cli delete <task_id>
```
Example:
```bash
todo-cli delete 2
```

### Changing Task Status
- To mark a task as done:
  ```bash
  todo-cli mark-done <task_id>
  ```
  Example:
  ```bash
  todo-cli mark-done 3
  ```
- To mark a task as in-progress:
  ```bash
  todo-cli mark-in-progress <task_id>
  ```
  Example:
  ```bash
  todo-cli mark-in-progress 4
  ```

---

## Development

### Running Locally
To run the CLI locally without installing it globally:
```bash
node index.js <command>
```
Example:
```bash
node index.js add "Test the CLI locally"
```

### Project Structure
- `task_cli.js`: Entry point for the CLI.
- `tododb.json`: Stores the task data. It will be automatically generated when the cli is running.
- `task.js`: Contains helper functions for handling commands and task management.

### Testing
You can write tests for the CLI using a testing framework like Mocha or Jest. To install Jest:
```bash
npm install jest --save-dev
```
Run tests:
```bash
npm test
```

---


## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For issues, suggestions, or feedback, please create an issue in the repository or reach out via email.

