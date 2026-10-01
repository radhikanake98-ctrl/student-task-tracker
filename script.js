const taskInput = document.getElementById("taskInput");
const addTaskButton=document.getElementById("addTaskButton");
const taskList=document.getElementById("taskList");
const taskCounter=document.getElementById("taskCounter");

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
    tasks.push({
        id: Date.now(),
        text: taskText,
        completed: false
});
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
    const taskToDelete=task;
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
    }

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