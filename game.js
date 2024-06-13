const Gameboard=(()=>{
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    
    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
        });
        document.querySelector('.gameboard').innerHTML = boardHTML;
    };
    return { render };
})();

const createPlayer = (name, mark) => {
    return { name, mark };
};

const Game = (() => {
    let playeres = [];
    let currentPlayerIndex;
    let gameOver = false;
    const start = () => {
        playeres = [createPlayer(document.querySelector("#player-1"), 'X'), createPlayer(document.querySelector("#player-1"), 'O')];
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    };
    return { start };
})();

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
    Game.start();
});