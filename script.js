const taskInput = document.getElementById("taskInput");
const addTaskButton=document.getElementById("addTaskButton");
const taskList=document.getElementById("taskList");
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
    });
    const deleteButton=document.createElement("button");
    deleteButton.textContent="Delete";
    deleteButton.addEventListener("click",function(){ 
    newTask.remove();
});
    newTask.appendChild(deleteButton);
    newTask.appendChild(completeButton);
    taskList.appendChild(newTask);
    taskInput.value="";
});   
