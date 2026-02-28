function createSpan(label, value) {
    const span = document.createElement("span");
    span.textContent = `${label} : ${value}`;
    return span;
}

function setSvgButton(svgPath) {
    const button = document.createElement("button");
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "2rem");
    svg.setAttribute("height", "2rem");
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", svgPath);
    svg.appendChild(path);
    button.appendChild(svg);
    return button;
}

(() => {
    const cards = document.getElementById("cards");
    const addButton = document.getElementById("add");
    const closeButton = document.getElementById("close");
    const addForm = document.getElementById("addForm");
    const overlay = document.getElementById("overlay");
    const popup = document.getElementById("popup");
    let myLibrary = [];

    class Book {
        constructor(title, author, pages) {
            this.id = crypto.randomUUID();
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.status = "Not Read";
        }
        read() {
            this.status = this.status === "Read" ? "Not Read" : "Read";
        }
    }

    addButton.addEventListener("click", () => {
        overlay.classList.remove("hidden");
        popup.classList.remove("hidden");
        addForm.reset();
    })

    function hide() {
        overlay.classList.add("hidden");
        popup.classList.add("hidden");
    }

    closeButton.addEventListener("click", hide);
    overlay.addEventListener("click", hide);

    addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const book = new Book(data.get("title"), data.get("author"), data.get("pages"));
        addBookToLibrary(book);
        hide();
    })

    function addBookToLibrary(book) {
        myLibrary.push(book);
        display();
    }

    function display() {
        cards.innerHTML = "";
        myLibrary.forEach((book) => {
            const card = document.createElement("div");
            const detail = document.createElement("div");
            const actions = document.createElement("div");
            card.classList.add("card");
            detail.classList.add("detail");
            actions.classList.add("actions");

            detail.appendChild(createSpan("ID", book.id));
            detail.appendChild(createSpan("Title", book.title));
            detail.appendChild(createSpan("Author", book.author));
            detail.appendChild(createSpan("Pages", book.pages));
            detail.appendChild(createSpan("Status", book.status));

            const markAsRead = setSvgButton("M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z");
            if (book.status === "Read") {
                markAsRead.style.backgroundColor = "greenyellow";
            }
            markAsRead.addEventListener("click", () => {
                book.read();
                display();
            });

            const remove = setSvgButton("M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z");
            remove.classList.add("remove");
            remove.addEventListener("click", () => {
                const confirmed = confirm(`Are you sure to delete this book "${book.title}"?`);
                if (confirmed) {
                    myLibrary = myLibrary.filter(bookKept => bookKept.id !== book.id);
                    display();
                }
            });

            actions.appendChild(markAsRead);
            actions.appendChild(remove);
            card.appendChild(detail);
            card.appendChild(actions);
            cards.appendChild(card);
        })
    }
})();