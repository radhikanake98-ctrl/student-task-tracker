const taskInput = document.getElementById("taskInput");
const addTaskButton=document.getElementById("addTaskButton");
const taskList=document.getElementById("taskList");
const taskCounter=document.getElementById("taskCounter");
const allButton = document.getElementById("allButton");
const pendingButton = document.getElementById("pendingButton");
const completedButton = document.getElementById("completedButton");

let completedCount=0;
let tasks=JSON.parse(localStorage.getItem("tasks"))|| [];
tasks = tasks.map(function(task) {
    if (typeof task === "string") {
        return {
            id:Date.now() + Math.random(),
            text: task,
            completed: false
        };
    }
    if (!task.id) {
        task.id = Date.now() + Math.random();
    }

    return task;
});

localStorage.setItem("tasks", JSON.stringify(tasks));
tasks.forEach(function(task) {
    if (task.completed) {
        completedCount++;
    }
});
console.log(taskInput);
console.log(addTaskButton);
console.log(taskList);
addTaskButton.addEventListener("click", function() {
    const taskText=taskInput.value;
    if (taskText===""){
        return;
    }
    const newTaskObject={
        id: Date.now(),
        text: taskText,
        completed: false
};
    tasks.push(newTaskObject);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    const newTask=document.createElement("li");
    newTask.textContent=taskText;

    const completeButton=document.createElement("button");
    completeButton.textContent="Complete";

    completeButton.addEventListener("click",function(){
    newTask.classList.add("completed");
    completedCount++;

    completeButton.disabled=true;

    taskCounter.textContent="Total: "+taskList.children.length + " |Completed: "+ completedCount + " |Pending: "+(taskList.children.length-completedCount);
    });
    const deleteButton=document.createElement("button");
    deleteButton.textContent="Delete";
    deleteButton.addEventListener("click",function(){ 
    newTask.remove();
    const taskToDelete=newTaskObject;
    tasks =tasks.filter(function(item){
        return item.id !==taskToDelete.id;
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
    taskCounter.textContent="Total: " + taskList.children.length;
});
    newTask.appendChild(deleteButton);
    newTask.appendChild(completeButton);
    taskList.appendChild(newTask);
    taskCounter.textContent="Total: " + taskList.children.length;
    taskInput.value="";
});  
function displayTask(task){
    const newTask=document.createElement("li"); 
    newTask.textContent=task.text; 

    const completeButton=document.createElement("button"); 
    completeButton.textContent="Complete"; 

    completeButton.addEventListener("click",function(){ 
        newTask.classList.add("completed"); 
        task.completed=true;
        localStorage.setItem("tasks",JSON.stringify(tasks));
        completedCount++; 

        completeButton.disabled=true; 
    }); 
    if(task.completed){
        newTask.classList.add("completed");
        completeButton.disabled=true;
        taskCounter.textContent =
        "Total: " + taskList.children.length +
        " |Completed: " + completedCount +
        " |Pending: " + (taskList.children.length - completedCount);

    };

    newTask.appendChild(completeButton); 
    taskList.appendChild(newTask); 
}
    
tasks.forEach(function(task){
    displayTask(task);
}); 
taskCounter.textContent=
"Total:" + taskList.children.length +
" |Completed: " +completedCount +
" |Pending: " + (taskList.children.length - completedCount);
function clearTasks() {
    taskList.innerHTML = "";
}
function showTasks(filter) {
    clearTasks();

    tasks.forEach(function(task) {

        if (filter === "all") {
            displayTask(task);
        }

        if (filter === "pending" && !task.completed) {
            displayTask(task);
        }

        if (filter === "completed" && task.completed) {
            displayTask(task);
        }

    });
}
allButton.addEventListener("click", function() {
    showTasks("all");
});

pendingButton.addEventListener("click", function() {
    showTasks("pending");
});

completedButton.addEventListener("click", function() {
    showTasks("completed");
});
