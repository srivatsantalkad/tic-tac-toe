let squarePressedBy = "";
const Gameboard = (() => {
    let gameboardArray = [];

    const addMove = (move) => {
        gameboardArray.push(move);
    };
});

const playerFactory = (name) => {
    let horizontalCheck = 3;
    let verticalCheck = 3;
    let diagonalCheck = 3;
    return {name};
}

const Game = (() => {
    const Player1 = playerFactory("Player1");
    const Player2 = playerFactory("Player2");
    const GameBoard1 = Gameboard();

    const board = document.querySelectorAll(".grid");

    let currentPlayer = Player2;
    let gameWon = false;

    let i = 0;
    while (i < 10) {
        currentPlayer = (currentPlayer == Player2) ? Player1 : Player2;
        squarePressedBy = currentPlayer.name;
        board.forEach((square) => {
            square.addEventListener("click", (e) => {
                console.log(e.target.id, squarePressedBy);
                GameBoard1.addMove(squarePressedBy, e.target.id);
            });
        });
        let gba = GameBoard1.gameboardArray;
        if (gba[0] == squarePressedBy && gba[1])
    }
    console.log("game over");

})();

Game;





