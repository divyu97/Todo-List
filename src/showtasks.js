import {obtainTasks} from "./obtaintasks.js";
import {createTask} from "./createtask.js";
import {organizeTasks} from "./organizetasks.js";

export function showTasks(projectid) {
    localStorage.setItem("query", "");

    organizeTasks();

    let ntbtn = document.querySelector("#new-task");
    if (projectid === "3")
        ntbtn.setAttribute("style", "visibility: hidden");
    else
        ntbtn.setAttribute("style", "visibility: visible");
    let name = JSON.parse(localStorage["projects"])[projectid];
    let searchbar = document.querySelector("#search-task");
    searchbar.setAttribute("placeholder", `Search ${name}`);
    searchbar.value = "";
    let categories = obtainTasks(projectid);
    const mainContent = document.querySelector(".main-content");
    mainContent.textContent = "";
    let projectname = document.createElement("div");
    projectname.setAttribute("class", "project-title");
    projectname.textContent = name;
    projectname.setAttribute("id", "project" + projectid);
    mainContent.appendChild(projectname);

    let pendingTasks = document.createElement("div");
    pendingTasks.setAttribute("class", "pending-tasks");
    mainContent.appendChild(pendingTasks);

    if (categories.length === 0) {
        let notasks = document.createElement("div");
        notasks.setAttribute("class", "no-tasks");
        if (projectid === "1")
            notasks.textContent = "You haven't planned anything for today";
        else if (projectid === "2")
            notasks.textContent = "No upcoming tasks";
        else if (projectid === "3")
            notasks.textContent = "No overdue tasks";
        else
            notasks.textContent = "No pending tasks in " + name;
        pendingTasks.appendChild(notasks);
        
        if (projectid !== "3") { 
            let newtask = document.createElement("button");
            newtask.setAttribute("class", "new-task-link");
            newtask.textContent = "+ New Task";
            newtask.style = "all: unset; font-size: 30px; font-family: Gopher, Arial; cursor: pointer;";
            newtask.addEventListener("click", () => {
                let dd = document.querySelector("#duedate");
                if (projectid === "1")
                    dd.disabled = true;
                else {
                    let today = new Date();
                    dd.setAttribute("min", String(today.getFullYear()) + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0'));
                }
                document.querySelector("#add-task-dialog").showModal();
            });
            pendingTasks.appendChild(newtask);
        }

        pendingTasks.style = "display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 35px; gap: 4px; height: 100%;";
        notasks.style = "font-size: 25px; font-family: GopherLight, Arial;";    
    } else {
        pendingTasks.style = "display: flex; flex-direction: column; gap: 16px;";
        categories.high.forEach((task) => {
            let newTask = createTask(task.title, task.duedate, task.id);
            newTask.style.borderColor = "Red";
            pendingTasks.appendChild(newTask);
        });
        categories.medium.forEach((task) => {
            let newTask = createTask(task.title, task.duedate, task.id);
            newTask.style.borderColor = "rgb(255, 193, 50)";
            pendingTasks.appendChild(newTask);
        });
        categories.low.forEach((task) => {
            let newTask = createTask(task.title, task.duedate, task.id);
            newTask.style.borderColor = "Green";
            pendingTasks.appendChild(newTask);
        });
        categories.nopriority.forEach((task) => {
            let newTask = createTask(task.title, task.duedate, task.id);
            pendingTasks.appendChild(newTask);
        });
    }
}