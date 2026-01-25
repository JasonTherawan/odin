let humanScore = 0;
let computerScore = 0;
let humanChoice = "";

let humanscore = document.querySelector("#humanscore");
let computerscore = document.querySelector("#computerscore");
const humanchoice = document.querySelector(".humanchoice");
const computerchoice = document.querySelector(".computerchoice");
const announcement = document.querySelector("#winner");

const btns = document.querySelectorAll("button");
btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        humanChoice = btn.id;
        humanchoice.src = `assets/${btn.id}.jpeg`;
        let computerChoice = getComputerChoice();
        computerchoice.src = `assets/${computerChoice}.jpeg`;
        playRound(humanChoice, computerChoice);
    })
})

function getComputerChoice() {
    let computerChoice = Math.floor(Math.random() * 3) + 1;
    if (computerChoice == 1) return "rock";
    else if (computerChoice == 2) return "paper";
    else return "scissors";
}

function playRound(humanChoice, computerChoice) {
    if((humanChoice.toLowerCase() == 'rock' && computerChoice.toLowerCase() == 'scissors') ||
       (humanChoice.toLowerCase() == 'paper' && computerChoice.toLowerCase() == 'rock') ||
       (humanChoice.toLowerCase() == 'scissors' && computerChoice.toLowerCase() == 'paper')){
        humanScore++;
        humanscore.textContent = `Your Score: ${humanScore}`;
        announcement.textContent = `Human won! ${humanChoice} beats ${computerChoice}!`;
        announcement.style.color = 'green';
    }
    else if(humanChoice.toLowerCase() == computerChoice.toLowerCase()){
        announcement.textContent = "Draw!";
        announcement.style.color = 'black';
    }
    else {
        computerScore++;
        computerscore.textContent = `Computer's Score: ${computerScore}`;
        announcement.textContent = `Computer won! ${computerChoice} beats ${humanChoice}!`;
        announcement.style.color = 'red';
    }
    if(humanScore == 5) setTimeout(() => {
        alert("HUMAN WON!!!");
        location.reload();
    }, 50);
    if(computerScore == 5) setTimeout(() => {
        alert("COMPUTER WON!!!");
        location.reload();
    }, 50);
}