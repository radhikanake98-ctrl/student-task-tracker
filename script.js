const taskInput = document.getElementById("taskInput");
const addTaskButton=document.getElementById("addTaskButton");
const taskList=document.getElementById("taskList");
const taskCounter=document.getElementById("taskCounter");
let completedCount=0;
console.log(taskInput);
console.log(addTaskButton);
console.log(taskList);
addTaskButton.addEventListener("click", function() {
    const taskText=taskInput.value;
    if (taskText===""){
        return;
    }
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
    taskCounter.textContent="Total: " + taskList.children.length;
});
    newTask.appendChild(deleteButton);
    newTask.appendChild(completeButton);
    taskList.appendChild(newTask);
    taskCounter.textContent="Total: " + taskList.children.length;
    taskInput.value="";
});   
