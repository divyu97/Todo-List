import {deleteTaskDialog} from "./deletetask.js";
import {markTaskDoneDialog} from "./taskdone.js";
import {editTaskDialog} from "./edittask.js";
import editIcon from "./edit.png";
import deleteIcon from "./delete.png";

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function createTask(name, duedate, id) {
    let task = document.createElement("div");
    task.setAttribute("class", "task");
    task.setAttribute("id", id);

    let taskdata = document.createElement("div");
    taskdata.setAttribute("class", "task-data");
    task.appendChild(taskdata);
    let mark = document.createElement("div");
    mark.setAttribute("class", "mark");
    taskdata.appendChild(mark);
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("click", () => {
        markTaskDoneDialog(id);
    });
    mark.appendChild(checkbox);
    let taskinfo = document.createElement("div");
    taskinfo.setAttribute("class", "task-info");
    taskdata.appendChild(taskinfo);
    let tasktitle = document.createElement("div");
    tasktitle.setAttribute("class", "task-title");
    tasktitle.textContent = name;
    taskinfo.appendChild(tasktitle);
    let taskduedate = document.createElement("div");
    taskduedate.setAttribute("class", "task-duedate");
    let today = new Date();
    let todaydate = String(today.getFullYear()) + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    today.setDate(today.getDate() + 1);
    let tomorrowdate = String(today.getFullYear()) + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    if (document.querySelector(".project-title").getAttribute("id") === "project1")
        taskduedate.textContent = "";
    else if (duedate === "")
        taskduedate.textContent = "No due date";
    else if (duedate === todaydate)
        taskduedate.textContent = "Today";
    else if (duedate === tomorrowdate)
        taskduedate.textContent = "Tomorrow";
    else {
        let month, date;
        if (duedate[5] === "0")
            month = Number(duedate[6]) - 1;
        else
            month = Number(duedate[5] + duedate[6]) - 1;
        if (duedate[8] === "0")
            date = duedate[9];
        else
            date = duedate[8] + duedate[9];
        taskduedate.textContent = date + " " + months[month] + ", " + duedate[0] + duedate[1] + duedate[2] + duedate[3];
    }
    taskinfo.appendChild(taskduedate);

    let taskoptions = document.createElement("div");
    taskoptions.setAttribute("class", "task-options");
    task.appendChild(taskoptions);
    let edittask = document.createElement("button");
    edittask.setAttribute("class", "edit-task");
    edittask.addEventListener("click", () => {
        editTaskDialog(id);
    });
    taskoptions.appendChild(edittask);
    let img1 = document.createElement("img");
    img1.setAttribute("src", editIcon);
    img1.setAttribute("width", "22");
    img1.setAttribute("height", "22");
    edittask.appendChild(img1);
    let deletetask = document.createElement("button");
    deletetask.setAttribute("class", "delete-task");
    taskoptions.appendChild(deletetask);
    let img2 = document.createElement("img");
    img2.setAttribute("src", deleteIcon);
    img2.setAttribute("width", "22");
    img2.setAttribute("height", "22");
    deletetask.appendChild(img2);
    deletetask.addEventListener("click", () => {
        deleteTaskDialog(id);
    });

    return task;
}