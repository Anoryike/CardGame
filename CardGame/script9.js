let userWins = 0;
let computerWins = 0;
let userName = "User";

const cards = [
    { name: "6", value: 6, image: "6.png" },
    { name: "7", value: 7, image: "7.png" },
    { name: "8", value: 8, image: "8.png" },
    { name: "9", value: 9, image: "9.png" },
    { name: "10", value: 10, image: "10.png" },
    { name: "Валет", value: 2, image: "J.png" },
    { name: "Дама", value: 3, image: "Q.png" },
    { name: "Король", value: 4, image: "K.png" },
    { name: "Туз", value: 11, image: "A.png" },
];

document.getElementById('start-button').addEventListener('click', startGame);

function displayCard(player, card) {
    const cardImage = document.querySelector(`#${player}-card-image`);
    const scoreContainer = document.querySelector(`#${player} .score-container .score`);
    const totalSumContainer = document.querySelector(`#${player} .total-sum-container .total-sum`);

    cardImage.src = card.image;
    scoreContainer.textContent = card.value;

    cardImage.classList.add('card-appear');

    cardImage.addEventListener('animationend', () => {
        cardImage.classList.remove('card-appear');
    });

    const currentSum = parseInt(totalSumContainer.textContent) + card.value;
    totalSumContainer.textContent = currentSum;
}

function startGame() {
    let userInput = prompt("Enter your name:");
    if (userInput !== null && userInput.length > 0) {
        userName = userInput;
    }
    document.querySelector('#user h2').textContent = userName;
    document.querySelector("#user .score").textContent = '0';
    document.querySelector("#computer .score").textContent = '0';
    playGame();
}

function playGame() {
    function playRound(round) {
        if (round < 3) {
            const userNumber = Math.floor(Math.random() * cards.length);
            const computerNumber = Math.floor(Math.random() * cards.length);

            let userCard = cards[userNumber];
            let computerCard = cards[computerNumber];

            displayCard('user', userCard);
            displayCard('computer', computerCard);

            const userTotalPoints = parseInt(document.querySelector("#user .total-sum-container .total-sum").textContent);
            const computerTotalPoints = parseInt(document.querySelector("#computer .total-sum-container .total-sum").textContent);

            if (userTotalPoints > computerTotalPoints) {
                userWins++;
            } else if (userTotalPoints < computerTotalPoints) {
                computerWins++;
            }

            document.querySelector("#user .score").textContent = userWins;
            document.querySelector("#computer .score").textContent = computerWins;

            setTimeout(() => playRound(round + 1), 2000);
        } else {
            setTimeout(endGame, 1000);
        }
    }
    playRound(0);
}

function endGame() {
    const userTotalPoints = parseInt(document.querySelector("#user .total-sum-container .total-sum").textContent);
    const computerTotalPoints = parseInt(document.querySelector("#computer .total-sum-container .total-sum").textContent);

    if (userTotalPoints > computerTotalPoints) {
        alert(`${userName} won the game with ${userTotalPoints} points!`);
    } else if (userTotalPoints < computerTotalPoints) {
        alert(`Computer won the game with ${computerTotalPoints} points!`);
    } else {
        alert("It's a tie!");
    }
    resetGame();
}

function resetGame() {
    userWins = 0;
    computerWins = 0;
    document.querySelector("#user .score").textContent = '0';
    document.querySelector("#computer .score").textContent = '0';
    document.querySelectorAll(".total-sum").forEach((element) => {
        element.textContent = '0';
    });
}
