import { Todo } from "./newtodo.js";
import { showTasks } from "./showtasks.js";
import {searchTasks} from "./searchtasks.js";

function fillData(id, title, desc, due, prty) {
    let task = JSON.parse(localStorage[id]);

    title.value = task.title;
    desc.value = task.desc;
    due.value = task.duedate;
    prty.value = task.priority;
}

function disableFields(title, desc, due, prty) {
    title.disabled = true;
    desc.disabled = true;
    due.disabled = true;
    prty.disabled = true;
}

function enableFields(title, desc, due, prty) {
    title.disabled = false;
    desc.disabled = false;
    due.disabled = false;
    prty.disabled = false;
}

function finalButtons(id, title, desc, due, prty, dialog, style) {
    let confirm = document.createElement("button");
    confirm.setAttribute("id", "edit-task-dialog-edit-task-options-confirm");
    confirm.textContent = "CONFIRM";
    style.textContent += " #edit-task-dialog-edit-task-options-confirm { background-color: Green; color: white; cursor: pointer; } #edit-task-dialog-edit-task-options-confirm:disabled { background-color: rgba(0, 128, 0, 0.6); color: white; cursor: not-allowed; }";
    title.addEventListener("input", () => {
        if (title.value === "")
            confirm.disabled = true;
        else
            confirm.disabled = false;        
    });

    let buttons = document.querySelector(".edit-task-dialog-edit-task-options");

    confirm.addEventListener("click", () => {
        let todo = new Todo(title.value, desc.value, due.value, prty.value, JSON.parse(localStorage[id]).project, document.querySelector(".project-title").getAttribute("id").slice(7), Number(id));
        localStorage.setItem(id, JSON.stringify(todo));
        buttons.textContent = "";
        let btns = initialButtons(id, title, desc, due, prty, dialog, style);
        buttons.appendChild(btns[0]);
        buttons.appendChild(btns[1]);
        disableFields(title, desc, due, prty);
        fillData(id, title, desc, due, prty);
    });

    let cancel = document.createElement("button");
    cancel.setAttribute("id", "edit-task-dialog-edit-task-options-cancel");
    cancel.textContent = "CANCEL";
    cancel.addEventListener("click", () => {
        buttons.textContent = "";
        let btns = initialButtons(id, title, desc, due, prty, dialog, style);
        buttons.appendChild(btns[0]);
        buttons.appendChild(btns[1]);
        disableFields(title, desc, due, prty);
        fillData(id, title, desc, due, prty);
    });
    
    cancel.style = "background-color: red; cursor: pointer; color: white;";

    return [confirm, cancel];
}

function initialButtons(id, title, desc, due, prty, dialog, style) {
    let edit = document.createElement("button");
    edit.setAttribute("id", "edit-task-dialog-edit-task-options-edit-task");
    edit.textContent = "EDIT";
    edit.addEventListener("click", () => {
        let buttons = document.querySelector(".edit-task-dialog-edit-task-options");
        buttons.textContent = "";
        let btns = finalButtons(id, title, desc, due, prty, dialog, style);
        buttons.appendChild(btns[0]);
        buttons.appendChild(btns[1]);
        enableFields(title, desc, due, prty);
        let today = new Date();
        due.setAttribute("min", String(today.getFullYear()) + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0'));
    });

    let close = document.createElement("button");
    close.setAttribute("id", "edit-task-dialog-edit-task-options-close");
    close.textContent = "CLOSE";
    close.addEventListener("click", () => {
        dialog.remove();
        style.remove();
        let projectid = document.querySelector(".project-title").getAttribute("id").slice(7);
        let query = localStorage["query"];
        if (query !== "")
            searchTasks(projectid, query);
        else
            showTasks(projectid);
    });

    dialog.addEventListener("mousedown", (event) => {
        if (event.target === dialog) {
            dialog.remove();
            style.remove();
            let projectid = document.querySelector(".project-title").getAttribute("id").slice(7);
            let query = localStorage["query"];
            if (query !== "")
                searchTasks(projectid, query);
            else
                showTasks(projectid);
        }
    });
    
    edit.style = "background-color: rgb(50, 122, 255); color: white; cursor: pointer;";
    close.style = "background-color: red; cursor: pointer; color: white;";

    return [edit, close];
}

export function editTaskDialog(id) {
    let actualdialog = document.createElement("dialog");

    let dialog = document.createElement("div");
    document.querySelector("body").appendChild(actualdialog);
    actualdialog.appendChild(dialog);

    let details = document.createElement("div");
    details.setAttribute("class", "edit-task-dialog-details");
    dialog.appendChild(details);

    let upper = document.createElement("div");
    upper.setAttribute("class", "edit-task-dialog-details-upper");
    details.appendChild(upper);
    let titlediv = document.createElement("div");
    titlediv.setAttribute("class", "edit-task-dialog-details-upper-title");
    upper.appendChild(titlediv);
    let titlelabel = document.createElement("label");
    titlelabel.setAttribute("for", "edit-task-dialog-details-upper-title");
    titlelabel.textContent = "Title";
    titlediv.appendChild(titlelabel);
    let title = document.createElement("input");
    title.setAttribute("id", "edit-task-dialog-details-upper-title");
    title.setAttribute("autofocus", "true");
    title.setAttribute("required", "true");
    titlediv.appendChild(title);
    let descdiv = document.createElement("div");
    descdiv.setAttribute("class", "edit-task-dialog-details-upper-description");
    upper.appendChild(descdiv);
    let desclabel = document.createElement("label");
    desclabel.setAttribute("for", "edit-task-dialog-details-upper-description");
    desclabel.textContent = "Description";
    descdiv.appendChild(desclabel);
    let desc = document.createElement("textarea");
    desc.setAttribute("name", "edit-task-dialog-details-upper-description");
    desc.setAttribute("id", "edit-task-dialog-details-upper-description");
    descdiv.appendChild(desc);

    let lower = document.createElement("div");
    lower.setAttribute("class", "edit-task-dialog-details-lower");
    details.appendChild(lower);
    let duediv = document.createElement("div");
    duediv.setAttribute("class", "edit-task-dialog-details-lower-duedate");
    lower.appendChild(duediv);
    let duelabel = document.createElement("label");
    duelabel.setAttribute("for", "edit-task-dialog-details-lower-duedate");
    duelabel.textContent = "Due date";
    duediv.appendChild(duelabel);
    let due = document.createElement("input");
    due.setAttribute("id", "edit-task-dialog-details-lower-duedate");
    due.setAttribute("type", "date");
    duediv.appendChild(due);
    let prtydiv = document.createElement("div");
    prtydiv.setAttribute("class", "edit-task-dialog-details-lower-priority");
    lower.appendChild(prtydiv);
    let prtylabel = document.createElement("label");
    prtylabel.setAttribute("for", "edit-task-dialog-details-lower-priority");
    prtylabel.textContent = "Priority";
    prtydiv.appendChild(prtylabel);
    let prty = document.createElement("select");
    prty.setAttribute("id", "edit-task-dialog-details-lower-priority");
    let option1 = document.createElement("option");
    option1.textContent = "Select priority";
    option1.setAttribute("selected", "true");
    option1.setAttribute("disabled", "true");
    prty.appendChild(option1);
    let option2 = document.createElement("option");
    option2.textContent = "High";
    prty.appendChild(option2);
    let option3 = document.createElement("option");
    option3.textContent = "Medium";
    prty.appendChild(option3);
    let option4 = document.createElement("option");
    option4.textContent = "Low";
    prty.appendChild(option4);
    prtydiv.appendChild(prty);

    let buttons = document.createElement("div");
    buttons.setAttribute("class", "edit-task-dialog-edit-task-options");
    dialog.appendChild(buttons);

    actualdialog.style = "position: fixed; top: 50%; bottom: 50%;";
    dialog.style = "padding: 25px; display: flex; flex-direction: column; align-items: center; gap: 25px; font-family: GopherLight, Arial; background-color: rgb(255, 193, 50);";
    details.style = "display: flex; flex-direction: column; gap: 25px;";
    upper.style = "display: flex; flex-direction: column; gap: 25px;";
    lower.style = " display: flex; gap: 25px;";
    buttons.style = "display: flex; justify-content: center; gap: 16px;";

    let style = document.createElement("style");
    document.querySelector("head").appendChild(style);
    style.textContent = ".edit-task-dialog-details-upper-title, .edit-task-dialog-details-upper-description, .edit-task-dialog-details-lower-duedate, .edit-task-dialog-details-lower-priority { display: flex; flex-direction: column; font-size: 25px; gap: 5px; } .edit-task-dialog-details-upper-title label, .edit-task-dialog-details-upper-description label, .edit-task-dialog-details-lower-duedate label, .edit-task-dialog-details-lower-priority label { font-weight: bold; } #edit-task-dialog-details-upper-title, #edit-task-dialog-details-upper-description, #edit-task-dialog-details-lower-duedate, #edit-task-dialog-details-lower-priority { font-size: 25px; border: 2px solid black; border-radius: 10px; padding: 8px; } #edit-task-dialog-details-upper-title:focus, #edit-task-dialog-details-upper-description:focus, #edit-task-dialog-details-lower-duedate:focus, #edit-task-dialog-details-lower-priority:focus { border: 2px solid rgb(50, 122, 255); outline: none; } .edit-task-dialog-edit-task-options button { font-family: Gopher, Arial; padding: 10px; font-size: 25px; border-radius: 10px; background-color: rgb(255, 193, 50); border: none; } input:disabled, textarea:disabled, select:disabled { background-color: White }";

    let btns = initialButtons(id, title, desc, due, prty, actualdialog, style);
    buttons.appendChild(btns[0]);
    buttons.appendChild(btns[1]);

    disableFields(title, desc, due, prty);
    fillData(id, title, desc, due, prty);

    actualdialog.showModal();
}