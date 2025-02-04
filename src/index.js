import "./styles.css";
import {checknewtodo, newtodo} from "./newtodo.js";
import {showTasks} from "./showtasks.js";
import {createProject} from "./createproject.js";
import {showProjects} from "./showprojects.js";
import {searchTasks} from "./searchtasks.js";

localStorage.setItem("query", "");

if (!(Object.keys(localStorage).includes("projects"))) {
    let projects = new Object();
    projects["1"] = "Today";
    projects["2"] = "Upcoming";
    projects["3"] = "Overdue";
    localStorage.setItem("projects", JSON.stringify(projects));
}    
if (!(Object.keys(localStorage).includes("ids")))
    localStorage.setItem("ids", 0);
if (!(Object.keys(localStorage).includes("projectids")))
    localStorage.setItem("projectids", 3);

let addtaskdialog = document.querySelector("#add-task-dialog");
let title = document.querySelector("#title");
let addtask = document.querySelector("#add-task");

let newprojectdialog = document.querySelector("#new-project-dialog");
let name = document.querySelector("#new-project-dialog-name");
let newproject = document.querySelector("#new-project-dialog-options-new-project");

document.querySelector(".today").addEventListener("click", () => {
    showTasks("1");
});

document.querySelector("#app-logo").addEventListener("click", () => showTasks("1"));
document.querySelector("#app-name").addEventListener("click", () => showTasks("1"));

document.querySelector(".upcoming").addEventListener("click", () => {
    showTasks("2");
});

document.querySelector(".overdue").addEventListener("click", () => {
    showTasks("3");
});

showTasks("1");
showProjects();

title.addEventListener("keyup", () => {
    if (title.value === "")
        addtask.disabled = true;
    else
        addtask.disabled = false;        
});

let dd = document.querySelector("#duedate");

function closeAddTaskDialog() {
    addtaskdialog.close();

    title.value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#duedate").value = "";
    document.querySelector("#priority").selectedIndex = "0";
    addtask.disabled = true;
    dd.disabled = false;
}

function closeNewProjectDialog() {
    newprojectdialog.close();
    name.value = "";
    newproject.disabled = true;
}

addtaskdialog.addEventListener("mousedown", (event) => {
    if (event.target === addtaskdialog)
        closeAddTaskDialog();
});

newprojectdialog.addEventListener("mousedown", (event) => {
    if (event.target === newprojectdialog)
        closeNewProjectDialog();
});

document.querySelector("#new-task").addEventListener("click", () => {
    if (document.querySelector(".project-title").getAttribute("id").slice(7) === "1")
        dd.disabled = true;
    else {
        let today = new Date();
        dd.setAttribute("min", String(today.getFullYear()) + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0'));
    }
    addtaskdialog.showModal();
});

addtask.addEventListener("click", () => {
    if (checknewtodo() == 0) {
        newtodo();
        closeAddTaskDialog();
        showTasks(document.querySelector(".project-title").getAttribute("id").slice(7));
    }
});

document.querySelector("#add-task-cancel").addEventListener("click", () => {
    closeAddTaskDialog();
});

name.addEventListener("input", () => {
    newproject.disabled = (name.value === "");
});

document.querySelector("#new-project").addEventListener("click", () => {
    newprojectdialog.showModal();
});

document.querySelector("#new-project-dialog-options-new-project").addEventListener("click", () => {
    createProject(name.value);
    closeNewProjectDialog();
    showProjects();
});

document.querySelector("#new-project-dialog-options-new-project-cancel").addEventListener("click", () => {
    closeNewProjectDialog();
});

document.querySelector("#search").addEventListener("click", () => {
    let query = document.querySelector("#search-task").value;
    if (query !== "")
        searchTasks(document.querySelector(".project-title").getAttribute("id").slice(7), query);
});