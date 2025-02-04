import {obtainTasks} from "./obtaintasks.js";
import {createTask} from "./createtask.js";

let priorities = {High: "Red", Medium: "rgb(255, 193, 50)", Low: "Green"};

function searchResults(projectid, query) {
    let regex = new RegExp("\\b" + query + "\\b", "i");
    let tasks = obtainTasks(projectid);

    let searchresults = [];

    tasks.high.forEach((task) => {
        if (task.title.search(regex) !== -1)
            searchresults.push(String(task.id));
    });
    tasks.medium.forEach((task) => {
        if (task.title.search(regex) !== -1)
            searchresults.push(String(task.id));
    });
    tasks.low.forEach((task) => {
        if (task.title.search(regex) !== -1)
            searchresults.push(String(task.id));
    });
    tasks.nopriority.forEach((task) => {
        if (task.title.search(regex) !== -1)
            searchresults.push(String(task.id));
    });

    return searchresults;
}

export function searchTasks(projectid, query) {
    localStorage.setItem("query", query);
    let results = searchResults(projectid, query);

    let content = document.querySelector(".main-content");
    content.textContent = "";

    let title = document.createElement("div");
    title.setAttribute("class", "project-title");
    title.setAttribute("id", "project" + projectid);
    title.textContent = `Search results for '${query}':`;
    content.appendChild(title);

    let searchresults = document.createElement("div");
    searchresults.setAttribute("class", "search-results");
    content.appendChild(searchresults);
    
    if (results.length === 0) {
        let noresults = document.createElement("div");
        noresults.setAttribute("class", "no-results");
        noresults.textContent = "No results found";
        searchresults.appendChild(noresults);

        searchresults.style = "display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 35px; gap: 4px; height: 100%;";
        noresults.style = "font-size: 25px; font-family: GopherLight, Arial;";
    } else {
        results.forEach((id) => {
            let task = JSON.parse(localStorage[id]);
            let newtask = createTask(task.title, task.duedate, id);
            let priority = task.priority;
            if (priority !== "")
                newtask.style.borderColor = priorities[priority];
            searchresults.appendChild(newtask);
        });
        searchresults.style = "display: flex; flex-direction: column; gap: 16px;";
    }
}