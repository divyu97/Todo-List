export function Todo(title, desc, duedate, priority, project, projectid, id) {
    this.title = title;
    this.desc = desc;
    this.duedate = duedate;
    this.priority = priority;
    this.project = project;
    this.projectid = projectid;
    this.id = id;
}

export function checknewtodo() {
    if (document.querySelector("#title").value === "") {
        alert("Title field cannot be empty");
    } else return 0;
}

export function newtodo() {
    let projectid = document.querySelector(".project-title").getAttribute("id");
    let title = document.querySelector("#title").value;
    let desc = document.querySelector("#description").value;
    let duedate;
    if (projectid === "project1") {
        let today = new Date();
        duedate = String(today.getFullYear()) + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    } else
        duedate = document.querySelector("#duedate").value;
    let priority = document.querySelector("#priority").value;
    let project = document.querySelector(".project-title").textContent;
    let id = Number(localStorage["ids"]) + 1;
    let todo = new Todo(title, desc, duedate, priority, project, projectid.slice(7), id);

    localStorage.setItem(String(id), JSON.stringify(todo));
    localStorage["ids"] = Number(localStorage["ids"]) + 1;
}