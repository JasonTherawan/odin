const projects = [
    {
        title: "Recipes",
        imagePath: "/odin/recipes/recipes.png",
        shortDescription: "A fundamental website structure demonstrating semantic HTML, lists, and image embedding without CSS.",
        longDescription: "This project marks the completion of the HTML Foundations course. It consists of a main index page linking to several recipe pages, built entirely with semantic HTML elements. It demonstrates mastery of relative file paths, unordered/ordered lists, and basic page structure.",
        link: "recipes/index.html"
    },
    {
        title: "Landing Page",
        imagePath: "/odin/landingpage/landingpage.png",
        shortDescription: "A responsive web page layout built from scratch to demonstrate mastery of CSS Flexbox.",
        longDescription: "This project required recreating a provided design mockup pixel-perfectly. The core focus was on using CSS Flexbox for layout management, aligning items, and distributing space effectively across different sections like the hero, information cards, and call-to-action areas.",
        link: "landingpage/index.html"
    },
    {
        title: "Rock Paper Scissors",
        imagePath: "/odin/rockpaperscissors/rockpaperscissors.png",
        shortDescription: "An interactive browser game played against the computer, demonstrating JavaScript control flow and DOM manipulation.",
        longDescription: "Originally a console-only game, this project was revisited to add a graphical user interface. It features event listeners for player input, logic to track scores over a 5-round game, and dynamic DOM updates to display the winner, utilizing basic JavaScript fundamentals.",
        link: "rockpaperscissors/index.html"
    },
    {
        title: "Etch-a-Sketch",
        imagePath: "/odin/etchasketch/etchasketch.png",
        shortDescription: "A browser-based sketchpad that allows users to draw on a customizable grid by hovering their mouse.",
        longDescription: "This project focuses heavily on DOM manipulation. It dynamically generates a grid of square divs using JavaScript and applies 'mouseover' event listeners to change their background colors. It includes controls to resize the grid density and clear the canvas, challenging the management of nodes in the DOM tree.",
        link: "etchasketch/index.html"
    },
    {
        title: "Calculator",
        imagePath: "/odin/calculator/calculator.png",
        shortDescription: "A functional on-screen calculator capable of basic arithmetic operations with mouse and keyboard support.",
        longDescription: "This project involves complex logic to handle user inputs, chaining operations, and floating-point math. It demonstrates the use of arrays or variables to store operator states and updates the display in real-time, while handling edge cases like dividing by zero.",
        link: "calculator/index.html"
    },
    {
        title: "Sign Up Form",
        imagePath: "/odin/signupform/signupform.png",
        shortDescription: "A mock registration page emphasizing raw CSS styling and HTML form validation.",
        longDescription: "The focus here is on 'constraint validation' using HTML attributes and CSS pseudo-classes (:valid, :invalid) to provide visual feedback. It ensures passwords match and fields are correctly formatted before submission, without relying on heavy JavaScript validation.",
        link: "signupform/index.html"
    },
    {
        title: "Admin Dashboard",
        imagePath: "/odin/admindashboard/admindashboard.png",
        shortDescription: "A complex visual layout simulating a dashboard interface, designed specifically to practice CSS Grid.",
        longDescription: "While the Landing Page focused on Flexbox, this project utilizes CSS Grid for a 2-dimensional layout. It features a sidebar, header, and main content area with 'card' modules, demonstrating how Grid and Flexbox work together to create responsive, modern web layouts.",
        link: "admindashboard/index.html"
    },
    {
        title: "Library",
        imagePath: "/odin/library/library.png",
        shortDescription: "A book-tracking application allowing users to add, remove, and toggle the read status of books.",
        longDescription: "This project introduces Object-Oriented Programming concepts. It uses Object Constructors to define book instances and stores them in an array. The app manually renders the DOM based on the array's state, requiring careful management of data binding and index tracking.",
        link: "library/index.html"
    },
    {
        title: "Tic Tac Toe",
        imagePath: "/odin/tictactoe/tictactoe.png",
        shortDescription: "A modular implementation of the classic game featuring modes with asynchronous moves and dynamic SVG rendering.",
        longDescription: "This project focuses on architectural decisions in JavaScript. It utilizes Constructor Functions and Prototypal Inheritance to efficiently manage memory and game state. Key features include an asynchronous computer opponent (using Promises to simulate 'thinking' time), a robust win-detection algorithm, and a strict separation between the gameboard logic and DOM manipulation.",
        link: "tictactoe/index.html"
    },
];

const cardsContainer = document.getElementById("cards");
const overlay = document.getElementById("overlay");
const popupContainer =  document.getElementById("popupContainer");
const popup =  document.getElementById("popup");

function createLink(href, width, height) {
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.classList.add("actionButton");

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M20.03 12C20.03 7.59 16.41 3.97 12 3.97C7.59 3.97 3.97 7.59 3.97 12C3.97 16.41 7.59 20.03 12 20.03C16.41 20.03 20.03 16.41 20.03 12M22 12C22 17.54 17.54 22 12 22C6.46 22 2 17.54 2 12C2 6.46 6.46 2 12 2C17.54 2 22 6.46 22 12M13.54 13V16L17.5 12L13.54 8V11H6.5V13");
    svg.appendChild(path);
    link.appendChild(svg);
    return link;
}

projects.forEach(element => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.addEventListener("click", () => {
        overlay.classList.remove("hidden");
        popupContainer.classList.remove("hidden");

        const buttonContainer = document.createElement("div");
        const closeButton = document.createElement("button");
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("width", "2rem");
        svg.setAttribute("height", "2rem");
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z");
        svg.appendChild(path);
        closeButton.appendChild(svg);
        closeButton.classList.add("actionButton");
        buttonContainer.appendChild(closeButton);
        buttonContainer.classList.add("action");
        buttonContainer.addEventListener("click", hide);

        const popupTitle = document.createElement("h2");
        popupTitle.textContent = element.title;
        popupTitle.style.textAlign = "center";
        const image = document.createElement("img");
        image.setAttribute("src", element.imagePath);
        image.setAttribute("width", "560");
        image.setAttribute("height", "320");
        const longDesc = document.createElement("p");
        longDesc.textContent = element.longDescription;
        longDesc.style.textAlign = "justify";
        const popupAction = document.createElement("div");
        popupAction.classList.add("action");
        const popupLink = createLink(element.link, "2rem", "2rem");
        
        popupAction.appendChild(popupLink);
        popup.appendChild(buttonContainer);
        popup.appendChild(popupTitle);
        popup.appendChild(image);
        popup.appendChild(longDesc);
        popup.appendChild(popupAction);
    });

    const title = document.createElement("h3");
    title.textContent = element.title;
    const shortDesc = document.createElement("p");
    shortDesc.textContent = element.shortDescription;
    const action = document.createElement("div");
    action.classList.add("action");
    const link = createLink(element.link, "1.5rem", "1.5rem");
    
    action.appendChild(link);
    card.appendChild(title);
    card.appendChild(shortDesc);
    card.appendChild(action);
    cardsContainer.appendChild(card);
});

function hide() {
    overlay.classList.add("hidden");
    popupContainer.classList.add("hidden");
    popup.innerHTML = "";
}

overlay.addEventListener("click", hide);