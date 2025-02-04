import {showProjects} from "./showprojects.js";
import {showTasks} from "./showtasks.js";
import {searchTasks} from "./searchtasks.js";

function deleteProject(id) {
    let obj = JSON.parse(localStorage["projects"]);
    delete obj[id];
    localStorage.setItem("projects", JSON.stringify(obj));
    let tasks = Object.keys(localStorage);
    tasks.splice(tasks.indexOf("ids"), 1);
    tasks.splice(tasks.indexOf("projectids"), 1);
    tasks.splice(tasks.indexOf("projects"), 1);
    tasks.splice(tasks.indexOf("query"), 1);
    tasks.forEach((task) => {
        if (JSON.parse(localStorage[task]).projectid === id)
            localStorage.removeItem(task);
    });
}

export function deleteProjectDialog(id) {
    let actualdialog = document.createElement("dialog");

    let dialog = document.createElement("div");
    dialog.setAttribute("class", "delete-project-dialog");
    document.querySelector("body").appendChild(actualdialog);
    actualdialog.appendChild(dialog);

    let dialoginfo = document.createElement("div");
    dialoginfo.setAttribute("class", "delete-project-dialog-info");
    dialog.appendChild(dialoginfo);
    let heading = document.createElement("div");
    heading.setAttribute("class", "delete-project-dialog-info-heading");
    heading.textContent = "Delete the project?";
    dialoginfo.appendChild(heading);
    let description = document.createElement("div");
    description.setAttribute("class", "delete-project-dialog-info-description");
    description.innerHTML = "The " + `'${JSON.parse(localStorage["projects"])[id].bold()}'` +" project and all of its tasks will be permanently deleted.";
    dialoginfo.appendChild(description);

    let dialogoptions = document.createElement("div");
    dialogoptions.setAttribute("class", "delete-project-dialog-options");
    dialog.appendChild(dialogoptions);
    let cancel = document.createElement("button");
    cancel.setAttribute("id", "delete-project-dialog-options-cancel");
    cancel.textContent = "Cancel";
    dialogoptions.appendChild(cancel);
    let taskdelete = document.createElement("button");
    taskdelete.setAttribute("id", "delete-project-dialog-options-delete");
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
        deleteProject(id);
        actualdialog.remove();
        showProjects();
        let projectid = document.querySelector(".project-title").getAttribute("id").slice(7);
        let query = localStorage["query"];
        if (id === projectid)
            showTasks("1");
        else if (query !== "")
            searchTasks(projectid, query);
    });

    actualdialog.showModal();
}