const board = document.querySelector(".board");
const player1score = document.getElementById("player1-score");
const player2score = document.getElementById("player2-score");

function Gameboard() {
    if(!new.target) {
        throw Error("Use new keyword");
    }
    this.boardTile = Array(9).fill("");
    this.mode = "";
    this.turn = null;
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
    this.turn = player;
}
Gameboard.prototype.reset = function () {
    this.boardTile.fill("");
    document.querySelectorAll(".tile").forEach(tile => {
        tile.textContent = "";
    });
    this.isLocked = false;
}

function Player(name, path, color) {
    if(!new.target) {
        throw Error("Use new keyword");
    }
    this.name = name;
    this.score = 0;
    this.mark = () => {
        mark = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        mark.setAttribute("viewBox", "0 0 24 24");
        mark.setAttribute("width", "7rem");
        mark.setAttribute("height", "7rem");
        const markPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        markPath.setAttribute("d", path);
        markPath.setAttribute("fill", color);
        mark.appendChild(markPath);
        return mark;
    };
    this.win = () => {
        this.score++;
    };
}

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

function checkEmpty() {
    const empty = [];
    for(let i = 0; i < 9; i++) if(gameBoard.boardTile[i] === "") empty.push(i);
    return empty;
}

function resetTurn(player) {
    gameBoard.setTurn(player);
    gameBoard.reset();
}

async function computerTurn(computer) {
    const empty = checkEmpty();
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
        alert("Computer Win!");
        computer.win();
        player2score.textContent = "Score: " + computer.score;
        gameBoard.reset();
    }
}

function updateForm() {
    const mode = document.getElementById("mode").value;
    const inputs = document.getElementById("inputs");
    inputs.innerHTML = "";

    if(mode === "computer") {
        inputs.innerHTML = `<input type="text" id="player1" name="player1" placeholder="Input Your Name" required>`
    } else if(mode === "player") {
        inputs.innerHTML = `<input type="text" id="player1" name="player1" placeholder="Input Player 1 Name" required>
                            <input type="text" id="player2" name="player2" placeholder="Input Player 2 Name" required>`
    }       
}

const register = document.getElementById("register");
const main = document.querySelector("main");
document.getElementById("registerForm").addEventListener("submit", e => {
    e.preventDefault();
    register.classList.add("hidden");
    main.classList.remove("hidden");

    const playerOne = new Player(document.getElementById("player1").value, "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z", "green");
    gameBoard.mode = document.getElementById("mode").value;
    const playerTwo = new Player(gameBoard.mode === "computer" ? "Computer" : document.getElementById("player2").value, "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", "red");
    
    const player1name = document.getElementById("player1-name");
    player1name.textContent = "Player 1: " + playerOne.name;
    const player2name = document.getElementById("player2-name");
    player2name.textContent = "Player 2: " + playerTwo.name;

    createTiles(playerOne, playerTwo);

    document.getElementById("restartBtn").onclick = () => {
        resetTurn(playerOne);
    };

    document.getElementById("resetScoreBtn").onclick = () => {
        playerOne.score = 0;
        playerTwo.score = 0;
        document.getElementById("player1-score").textContent = "Score: 0";
        document.getElementById("player2-score").textContent = "Score: 0";
        resetTurn(playerOne);
    };
})

function createTiles(playerOne, playerTwo) {
    gameBoard.setTurn(playerOne);
    for(let i = 0; i < 9; i++){
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.index = i; //Better and safer than 'tile.id = i'
        tile.style.border = "2px black solid";
        tile.addEventListener("click", async () => {
            if(gameBoard.mode === "computer") {
                if(gameBoard.isLocked || gameBoard.boardTile[i] !== "") return;
                gameBoard.isLocked = true;
                gameBoard.setTurn(playerOne);
                if (gameBoard.placeMark(tile.dataset.index, playerOne.mark)) {
                    tile.appendChild(playerOne.mark());
                    if(checkBoard()) {
                        await new Promise(resolve => setTimeout(resolve, 100));
                        alert(`${playerOne.name} Win!`);
                        gameBoard.turn.win();
                        player1score.textContent = "Score: " + gameBoard.turn.score;
                        gameBoard.reset();
                        return;
                    }
                    await new Promise(resolve => setTimeout(resolve, 500));
                    await computerTurn(playerTwo);
                    gameBoard.isLocked = false;
                }
            } else {
                if(gameBoard.boardTile[i] !== "") return;   
                if (gameBoard.placeMark(tile.dataset.index, gameBoard.turn.mark)) {
                    tile.appendChild(gameBoard.turn.mark());
                    if(checkBoard()) {
                        await new Promise(resolve => setTimeout(resolve, 100));
                        alert(`${gameBoard.turn.name} Win!`);
                        gameBoard.turn.win();
                        if(gameBoard.turn === playerOne) player1score.textContent = "Score: " + gameBoard.turn.score;
                        else player2score.textContent = "Score: " + gameBoard.turn.score;
                        resetTurn(playerOne);
                        return;
                    }
                    const empty = checkEmpty();
                    if (empty.length === 0) {
                        await new Promise(resolve => setTimeout(resolve, 100));
                        alert("Draw!");
                        resetTurn(playerOne);
                        return;
                    }
                }
                gameBoard.setTurn(gameBoard.turn === playerOne ? playerTwo : playerOne);
            }
        })
        board.appendChild(tile);
    }
}

/* Force the dropdown to reset on page load
window.addEventListener("load", () => {
    const modeSelect = document.getElementById("mode");
    modeSelect.value = "choose"; 
    updateForm(); // Call this to ensure the input fields are also hidden/reset
}); */