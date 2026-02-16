const board = document.querySelector(".board");

function Gameboard() {
    if(!new.target) {
        throw Error("Use new keyword");
    }
    this.boardTile = Array(9).fill("");
    this.turn = "";
    this.isLocked = false;
    /* Instance method get created for each instance, wasting memory for the same functionality
    this.placeMark = (index, mark) => {
        if(this.boardTile[index] !== "") return false;
        this.boardTile[index] = mark;
        return true;
    }
    this.reset = () => {
        this.boardTile.fill("");
    } */
}

// Prototype lets all instance shares the same functionality
Gameboard.prototype.placeMark = function (index, mark) {
    if(this.boardTile[index] !== "") return false;
    this.boardTile[index] = mark;
    return true;
}
Gameboard.prototype.setTurn = function (player) {
    this.turn = player.name;
}
Gameboard.prototype.reset = function () {
    this.boardTile.fill("");
    document.querySelectorAll(".tile").forEach(tile => {
        tile.textContent = "";
    });
    this.isLocked = false;
}

function Player(name, mark, path, color) {
    if(!new.target) {
        throw Error("Use new keyword");
    }
    this.name = name;
    this.score = 0;
    this.mark = () => {
        mark = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        mark.setAttribute("viewBox", "0 0 24 24");
        mark.setAttribute("width", "10rem");
        mark.setAttribute("height", "10rem");
        const markPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        markPath.setAttribute("d", path);
        markPath.setAttribute("fill", color);
        mark.appendChild(markPath);
        return mark;
    };
    this.win = () => {
        score++;
    };
}

const player = new Player("Jason", "circle", "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z", "green");
const computer = new Player("Computer", "cross", "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", "red");
const gameBoard = new Gameboard();

function checkBoard() {
    // Horizontal
    for(let i = 0; i < 3; i++) {
        if(gameBoard.boardTile[i*3] === "") continue;
        if(gameBoard.boardTile[i*3] === gameBoard.boardTile[i*3+1] && gameBoard.boardTile[i*3+1] === gameBoard.boardTile[i*3+2]) return true;
    }
    // Vertical
    for(let i = 0; i < 3; i++) {
        if(gameBoard.boardTile[i] === "") continue;
        if(gameBoard.boardTile[i] === gameBoard.boardTile[i+3] && gameBoard.boardTile[i+3] === gameBoard.boardTile[i+6]) return true;
    }
    // Diagonal
    if(gameBoard.boardTile[0] !== "" && gameBoard.boardTile[0] === gameBoard.boardTile[4] && gameBoard.boardTile[4] === gameBoard.boardTile[8]) return true;
    // Anti-Diagonal
    if(gameBoard.boardTile[2] !== "" && gameBoard.boardTile[2] === gameBoard.boardTile[4] && gameBoard.boardTile[4] === gameBoard.boardTile[6]) return true;
    return false;
}

async function computerTurn() {
    const empty = [];
    for(let i = 0; i < 9; i++) if(gameBoard.boardTile[i] === "") empty.push(i);
    if (empty.length === 0) {
        alert("Draw!");
        gameBoard.reset();
        return;
    }
    gameBoard.setTurn(computer);
    const index = empty[Math.floor(Math.random() * empty.length)];
    if(gameBoard.placeMark(index, computer.mark)) {
        const tile = document.querySelector(`.tile[data-index="${index}"]`);
        tile.appendChild(computer.mark());
    }
    if(checkBoard()) {
        await new Promise(resolve => setTimeout(resolve, 100));
        alert(`${gameBoard.turn} Win!`)
        gameBoard.reset();
    }
}

function createTiles() {
    for(let i = 0; i < 9; i++){
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.index = i; //Better and safer than 'tile.id = i'
        tile.style.border = "2px black solid";
        tile.addEventListener("click", async () => {
            if(gameBoard.isLocked) return;
            gameBoard.isLocked = true;
            gameBoard.setTurn(player);
            if (gameBoard.placeMark(tile.dataset.index, player.mark)) {
                tile.appendChild(player.mark());
                if(checkBoard()) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    alert(`${gameBoard.turn} Win!`)
                    gameBoard.reset();
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, 500));
                computerTurn();
                gameBoard.isLocked = false;
            }
        })
        board.appendChild(tile);
    }
}

createTiles();