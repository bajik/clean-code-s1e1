//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".todo__task-btn--add");
const incompleteTaskHolder = document.getElementById("tasks-incomplete");
const completedTasksHolder = document.getElementById("tasks-completed");

// New task list item
const createNewTaskElement = function(taskString) {

  const listItem = document.createElement("li");
  listItem.classList.add("todo__task");

  const checkBox = document.createElement("input");
  checkBox.classList.add("todo__task-select");
  checkBox.type = "checkbox";

  const label = document.createElement("label");
  label.innerText = taskString;
  label.classList.add("todo__task-title");

  const editInput = document.createElement("input");
  editInput.classList.add("todo__task-input");
  editInput.type = "text";

  const editButton = document.createElement("button");
  editButton.classList.add("todo__task-btn", "todo__task-btn--edit");
  editButton.innerText = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("todo__task-btn", "todo__task-btn--del");

  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.classList.add("todo__button-image");
  deleteButtonImg.src = "./remove.svg";

  deleteButton.appendChild(deleteButtonImg);

  // and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



const addTask = function() {
  console.log("Add Task...");
  // Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  // Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";
}

// Edit an existing task.
const editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;

  const editInput = listItem.querySelector(".todo__task-input");
  const label = listItem.querySelector(".todo__task-title");
  const editBtn = listItem.querySelector(".todo__task-btn--edit");
  const containsClass = listItem.classList.contains("todo__task--edit");
  // If class of the parent is .todo__task--edit

  if (containsClass) {
    // switch to .todo__task--edit
    // label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  // toggle .todo__task--edit on the parent.
  listItem.classList.toggle("todo__task--edit");
};

// Delete task.
const deleteTask = function(){
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  // Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

// Mark task completed
const taskCompleted = function() {
  console.log("Complete Task...");

  // Append the task list item to the #tasks-completed
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function() {
  console.log("Incomplete Task...");
  // Mark task as incomplete.
  // When the checkbox is unchecked
  // Append the task list item to the #tasks-incomplete.
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

const ajaxRequest = function() {
  console.log("AJAX Request");
}

// The glue to hold it all together.

// Set the click handler to the addTask function.
// addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

const bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  console.log("bind list item events");
  // select ListItems children
  const checkBox = taskListItem.querySelector(".todo__task-select");
  const editButton = taskListItem.querySelector(".todo__task-btn--edit");
  const deleteButton = taskListItem.querySelector(".todo__task-btn--del");

  // Bind editTask to edit button.
  editButton.onclick = editTask;
  // Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  // Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

// cycle over incompleteTaskHolder ul list items
// for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  // bind events to list items chldren (tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++) {
  // bind events to list items chldren (tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.
//prevent creation of empty tasks.
//Change edit to save when you are in edit mode.