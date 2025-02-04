export function createProject(name) {
    let projects = JSON.parse(localStorage["projects"]);
    projects[String(Number(localStorage["projectids"]) + 1)] = name;
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage["projectids"] = Number(localStorage["projectids"]) + 1;
}