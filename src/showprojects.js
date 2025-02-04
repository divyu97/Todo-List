import {deleteProjectDialog} from "./deleteproject.js";
import {showTasks} from "./showtasks.js";
import deleteIcon from "./delete.png";

function createProjectDOM(name, id) {
    let project = document.createElement("div");
    project.setAttribute("class", "project");
    project.setAttribute("id", "project" + id);

    let projectname = document.createElement("div");
    projectname.setAttribute("class", "project-name");
    projectname.textContent = name;
    projectname.addEventListener("click", () => {
        showTasks(id);
    });
    project.appendChild(projectname);

    let deleteproject = document.createElement("button");
    deleteproject.setAttribute("class", "project-delete");
    project.appendChild(deleteproject);
    deleteproject.addEventListener("click", () => {
        deleteProjectDialog(id);
    });
    let img = document.createElement("img");
    img.setAttribute("src", deleteIcon);
    img.setAttribute("width", "20");
    img.setAttribute("height", "20");
    deleteproject.appendChild(img);

    return project;
}

export function showProjects() {
    const removeprojects = document.querySelectorAll(".project");
    removeprojects.forEach((project) => {
        project.remove();
    });

    const projects = document.querySelector(".projects");

    const projectids = Object.keys(JSON.parse(localStorage["projects"]));
    projectids.splice(0, 3);

    projectids.forEach((projectid) => {
        projects.appendChild(createProjectDOM(JSON.parse(localStorage["projects"])[projectid], projectid));
    });
}