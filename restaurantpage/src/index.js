import "./style.css";
import home from "./components/home.js";
import menu from "./components/menu.js";
import about from "./components/about.js";
const pages = { home, menu, about };

const main = document.getElementById("content");
main.appendChild(home);

const nav = document.querySelector("nav");
nav.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if(!li) return;
    main.innerHTML = "";
    main.appendChild(pages[li.id]);
});