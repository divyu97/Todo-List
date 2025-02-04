function sortTasks(task1, task2) {
    let date1 = task1.duedate;
    let date2 = task2.duedate;
    if (date1 === "" && date2 !== "")
        return -1;
    else if (date1 !== "" && date2 === "")
        return 1;
    else if (date1 === "" && date2 === "")
        return 0;
    else {
        let dt1 = new Date(date1);
        let dt2 = new Date(date2);
        if (dt1 > dt2)
            return 1;
        else if (dt1 < dt2)
            return -1;
        else
            return 0;
    }
}

export function obtainTasks(projectid) {
    let tasks = Object.keys(localStorage);
    tasks.splice(tasks.indexOf("ids"), 1);
    tasks.splice(tasks.indexOf("projectids"), 1);
    tasks.splice(tasks.indexOf("projects"), 1);
    tasks.splice(tasks.indexOf("query"), 1);

    let high = [];
    let medium = [];
    let low = [];
    let nopriority = [];

    tasks.forEach((task) => {
        let object = JSON.parse(localStorage[task]);
        if (object.projectid === projectid) {
            let priority = object.priority;
            if (priority == "High")
                high.push(object);
            else if (priority == "Medium")
                medium.push(object);
            else if (priority == "Low") 
                low.push(object);
            else
                nopriority.push(object);
        }
    });

    high.sort(sortTasks);
    medium.sort(sortTasks);
    low.sort(sortTasks);
    nopriority.sort(sortTasks);

    return {high, medium, low, nopriority, length: high.length + medium.length + low.length + nopriority.length};
}