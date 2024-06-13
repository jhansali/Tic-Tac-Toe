const displayController = (() => {
    const renderMessage = (message) => {
        document.querySelector('.message').textContent = message;
    };
    const winnerMessage = (winner) => {
        document.querySelector('.message').textContent = `${winner} wins!`;
    };
    return { renderMessage, winnerMessage };
})();

const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
        });
        document.querySelector('.gameboard').innerHTML = boardHTML;
        const squares = document.querySelectorAll('.square');
        squares.forEach((square, index) => {
            square.addEventListener('click', Game.handleClick);
        });
    };

    const update = (index, mark) => {
        gameboard[index] = mark;
        render();
    };

    const getGameboard = () => gameboard;

    return { render, update, getGameboard };
})();

const createPlayer = (name, mark) => {
    return { name, mark };
};

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver = false;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player-1").value, 'X'),
            createPlayer(document.querySelector("#player-2").value, 'O')
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    };

    const handleClick = (e) => {
        if (gameOver) return;
        let index = parseInt(e.target.id.split('-')[1]);
        if (Gameboard.getGameboard()[index] === "") {
            Gameboard.update(index, players[currentPlayerIndex].mark);
            if (checkWinner(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
                gameOver = true;
                setTimeout(() => {
                    // alert(`${players[currentPlayerIndex].name} wins!`);
                    displayController.winnerMessage(`${players[currentPlayerIndex].name}`);
                    // restart();
                }, 100);
                return;
            } else if (Gameboard.getGameboard().every(square => square !== "")) {
                gameOver = true;
                setTimeout(() => {
                    // alert("It's a tie!");
                    displayController.renderMessage("It's a tie!");
                    // restart();
                }, 100);
                return;
            }
            currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0; // Toggle the player index
        }
    };

    const restart = () => {
        Gameboard.getGameboard().fill("");
        Gameboard.render();
        gameOver = false;
        document.querySelector("#player-1").value = "";
        document.querySelector("#player-2").value = "";
        document.querySelector('.message').textContent = "";
        document.querySelector('.result-display').textContent = "";
    };

    return { start, handleClick, restart };
})();

function checkWinner(gameboard, mark) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombos.some(combo => {
        return combo.every(index => {
            return gameboard[index] === mark;
        });
    });
}

const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', () => {
    Game.restart();
});

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
    Game.start();
});