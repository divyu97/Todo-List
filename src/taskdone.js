import {showTasks} from "./showtasks.js";
import {searchTasks} from "./searchtasks.js";

function markTaskDone(taskid) {
    localStorage.removeItem(taskid);
}

export function markTaskDoneDialog(taskid) {
    let actualdialog = document.createElement("dialog");

    let dialog = document.createElement("div");
    dialog.setAttribute("class", "mark-task-done-dialog");
    document.querySelector("body").appendChild(actualdialog);
    actualdialog.appendChild(dialog);

    let dialoginfo = document.createElement("div");
    dialoginfo.setAttribute("class", "mark-task-done-dialog-info");
    dialog.appendChild(dialoginfo);
    let heading = document.createElement("div");
    heading.setAttribute("class", "mark-task-done-info-heading");
    heading.textContent = "Mark the task as done?";
    dialoginfo.appendChild(heading);
    let description = document.createElement("div");
    description.setAttribute("class", "mark-task-done-info-description");
    description.innerHTML = "This will mark the " + `'${JSON.parse(localStorage[taskid]).title.bold()}'` +" task as done and permanently delete it.";
    dialoginfo.appendChild(description);

    let dialogoptions = document.createElement("div");
    dialogoptions.setAttribute("class", "mark-task-done-options");
    dialog.appendChild(dialogoptions);
    let cancel = document.createElement("button");
    cancel.setAttribute("id", "mark-task-done-options-cancel");
    cancel.textContent = "Cancel";
    dialogoptions.appendChild(cancel);
    let taskdone = document.createElement("button");
    taskdone.setAttribute("id", "mark-task-done-options-done");
    taskdone.textContent = "Confirm";
    dialogoptions.appendChild(taskdone);

    actualdialog.style = "position: fixed; top: 50%; bottom: 50%;";
    dialog.style = "background-color: White; display: flex; justify-content: center; align-items: flex-end; flex-direction: column; padding: 16px; font-family: GopherLight, Arial; gap: 16px";
    dialoginfo.style = "display: flex; justify-content: center; gap: 10px; flex-direction: column; margin-right: 230px";
    heading.style = "font-family: Gopher, Arial; font-size: 25px";
    description.style = "font-size: 23px;";
    dialogoptions.style = "display: flex; align-items: center; gap: 10px;";
    cancel.style = "all: unset; cursor: pointer; padding: 10px; font-size: 23px; border-radius: 10px; background-color: Grey; border: none; color: White;";
    taskdone.style = "all: unset; cursor: pointer; padding: 10px; font-size: 23px; border-radius: 10px; background-color: Green; border: none; color: White;";

    cancel.addEventListener("click", () => {
        actualdialog.remove();
    });

    actualdialog.addEventListener("mousedown", (event) => {
        if (event.target === actualdialog)
            actualdialog.remove();
    });

    taskdone.addEventListener("click", () => {
        markTaskDone(taskid);
        actualdialog.remove();
        let projectid = document.querySelector(".project-title").getAttribute("id").slice(7);
        let query = localStorage["query"];
        if (query !== "")
            searchTasks(projectid, query);
        else
            showTasks(projectid);
    });

    actualdialog.showModal();
}