import {obtainTasks} from "./obtaintasks.js";

export function organizeTasks() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= 3; i++) {
        let folder = obtainTasks(String(i));

        folder.high.forEach((task) => {
            let taskdue = new Date(task.duedate);
            taskdue.setHours(0, 0, 0, 0);
            if (taskdue < today) {
                task.project = "Overdue";
                task.projectid = "3";
                localStorage.setItem(task.id, JSON.stringify(task));
            } else if (taskdue > today) {
                task.project = "Upcoming";
                task.projectid = "2";
                localStorage.setItem(task.id, JSON.stringify(task));
            } else {
                task.project = "Today";
                task.projectid = "1";
                localStorage.setItem(task.id, JSON.stringify(task));
            }
        });
        folder.medium.forEach((task) => {
            let taskdue = new Date(task.duedate);
            taskdue.setHours(0, 0, 0, 0);
            if (taskdue < today) {
                task.project = "Overdue";
                task.projectid = "3";
                localStorage.setItem(task.id, JSON.stringify(task));
            } else if (taskdue > today) {
                task.project = "Upcoming";
                task.projectid = "2";
                localStorage.setItem(task.id, JSON.stringify(task));
            } else {
                task.project = "Today";
                task.projectid = "1";
                localStorage.setItem(task.id, JSON.stringify(task));
            }
        });
        folder.low.forEach((task) => {
            let taskdue = new Date(task.duedate);
            taskdue.setHours(0, 0, 0, 0);
            if (taskdue < today) {
                task.project = "Overdue";
                task.projectid = "3";
                localStorage.setItem(task.id, JSON.stringify(task));
            } else if (taskdue > today) {
                task.project = "Upcoming";
                task.projectid = "2";
                localStorage.setItem(task.id, JSON.stringify(task));
            } else {
                task.project = "Today";
                task.projectid = "1";
                localStorage.setItem(task.id, JSON.stringify(task));
            }
        });
        folder.nopriority.forEach((task) => {
            let taskdue = new Date(task.duedate);
            taskdue.setHours(0, 0, 0, 0);
            if (taskdue < today) {
                task.project = "Overdue";
                task.projectid = "3";
                localStorage.setItem(task.id, JSON.stringify(task));
            } else if (taskdue > today) {
                task.project = "Upcoming";
                task.projectid = "2";
                localStorage.setItem(task.id, JSON.stringify(task));
            } else {
                task.project = "Today";
                task.projectid = "1";
                localStorage.setItem(task.id, JSON.stringify(task));
            }
        });
    }
}