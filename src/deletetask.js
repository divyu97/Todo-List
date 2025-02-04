import {showTasks} from "./showtasks.js";
import {searchTasks} from "./searchtasks.js";

function deleteTask(taskid) {
    localStorage.removeItem(taskid);
}

export function deleteTaskDialog(taskid) {
    let actualdialog = document.createElement("dialog");

    let dialog = document.createElement("div");
    dialog.setAttribute("class", "delete-task-dialog");
    document.querySelector("body").appendChild(actualdialog);
    actualdialog.appendChild(dialog);

    let dialoginfo = document.createElement("div");
    dialoginfo.setAttribute("class", "delete-task-dialog-info");
    dialog.appendChild(dialoginfo);
    let heading = document.createElement("div");
    heading.setAttribute("class", "delete-task-dialog-info-heading");
    heading.textContent = "Delete the task?";
    dialoginfo.appendChild(heading);
    let description = document.createElement("div");
    description.setAttribute("class", "delete-task-dialog-info-description");
    description.innerHTML = "This will permanently delete the " + `'${JSON.parse(localStorage[taskid]).title.bold()}'` +" task.";
    dialoginfo.appendChild(description);

    let dialogoptions = document.createElement("div");
    dialogoptions.setAttribute("class", "delete-task-dialog-options");
    dialog.appendChild(dialogoptions);
    let cancel = document.createElement("button");
    cancel.setAttribute("id", "delete-task-dialog-options-cancel");
    cancel.textContent = "Cancel";
    dialogoptions.appendChild(cancel);
    let taskdelete = document.createElement("button");
    taskdelete.setAttribute("id", "delete-task-dialog-options-delete");
    taskdelete.textContent = "Delete";
    dialogoptions.appendChild(taskdelete);

    actualdialog.style = "position: fixed; top: 50%; bottom: 50%;";
    dialog.style = "background-color: White; display: flex; justify-content: center; align-items: flex-end; flex-direction: column; padding: 16px; font-family: GopherLight, Arial; gap: 16px";
    dialoginfo.style = "display: flex; justify-content: center; gap: 10px; flex-direction: column; margin-right: 215px";
    heading.style = "font-family: Gopher, Arial; font-size: 25px";
    description.style = "font-size: 23px;";
    dialogoptions.style = "display: flex; align-items: center; gap: 10px;";
    cancel.style = "all: unset; cursor: pointer; padding: 10px; font-size: 23px; border-radius: 10px; background-color: Grey; border: none; color: White;";
    taskdelete.style = "all: unset; cursor: pointer; padding: 10px; font-size: 23px; border-radius: 10px; background-color: Red; border: none; color: White;";

    cancel.addEventListener("click", () => {
        actualdialog.remove();
    });

    actualdialog.addEventListener("mousedown", (event) => {
        if (event.target === actualdialog)
            actualdialog.remove();
    });

    taskdelete.addEventListener("click", () => {
        deleteTask(taskid);
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