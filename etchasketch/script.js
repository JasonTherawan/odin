const input = document.getElementById("input");
const btn = document.getElementById("input-btn");
const grid = document.querySelector(".grid");

btn.addEventListener("click", () => {
    let n = parseInt(input.value);
    if(n >= 16 && n <= 100) createGrid(n);
    else alert("Input number between 16-100");
    input.value = "";
});

function randomRgb() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function createGrid(n) {
    grid.textContent = "";
    const size = grid.offsetWidth - 3.7;
    for(let i = 0; i < n*n; i++) {
        let opacity = 0.0;
        const div = document.createElement("div");
        div.style.width = size/n + "px";
        div.style.height = size/n + "px";
        div.style.border = "solid black 1px";
        div.style.opacity = `${opacity}`;

        div.addEventListener("mouseenter", () => {
            div.style.backgroundColor = randomRgb();
            div.style.opacity = `${opacity}`;
            opacity += 0.1;
        });
        div.addEventListener("mouseleave", () => {
            div.style.backgroundColor = "rgb(0, 0, 0)";
        });

        grid.appendChild(div);
    }
}

createGrid(16);