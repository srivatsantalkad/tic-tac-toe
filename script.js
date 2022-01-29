const GameBoard = (() => {
    let gameboardArray = [];
    const resetGameboardArray = () => {
        gameboardArray.length = 0;
    };
    return { gameboardArray, resetGameboardArray };
})();

const PlayerFactory = (sign) => {
    return { sign };
}

const GameController = (() => {
    let gameRound = 1;
    const MAX_GAME_ROUNDS = 8;
    let gameEndCondition = false;

    const Player1 = PlayerFactory("X");
    const Player2 = PlayerFactory("O");

    const playRound = (square) => {
        GameBoard.gameboardArray[square] = getCurrPlayerSign();
        if (checkWin()) {
            DisplayController.setResult(getCurrPlayerSign());
            gameEndCondition = true;
            return;
        }
        if (gameRound > MAX_GAME_ROUNDS) {
            DisplayController.setResult("Draw");
            gameEndCondition = true;
            return;
        }
        gameRound++;
        DisplayController.modifyDOM(`Player ${getCurrPlayerSign()}'s turn.`);
    };
    const getCurrPlayerSign = () => {
        return gameRound % 2 == 1 ? Player1.sign : Player2.sign;
    };
    const checkWin = () => {
        let gb = GameBoard.gameboardArray;
        if (gb[0] + gb[1] + gb[2] == "XXX" || gb[0] + gb[1] + gb[2] == "OOO") return true;
        if (gb[3] + gb[4] + gb[5] == "XXX" || gb[3] + gb[4] + gb[5] == "OOO") return true;
        if (gb[6] + gb[7] + gb[8] == "XXX" || gb[6] + gb[7] + gb[8] == "OOO") return true;
        if (gb[0] + gb[3] + gb[6] == "XXX" || gb[0] + gb[3] + gb[6] == "OOO") return true;
        if (gb[1] + gb[4] + gb[7] == "XXX" || gb[1] + gb[4] + gb[7] == "OOO") return true;
        if (gb[2] + gb[5] + gb[8] == "XXX" || gb[2] + gb[5] + gb[8] == "OOO") return true;
        if (gb[0] + gb[4] + gb[8] == "XXX" || gb[0] + gb[4] + gb[8] == "OOO") return true;
        if (gb[2] + gb[4] + gb[6] == "XXX" || gb[2] + gb[4] + gb[6] == "OOO") return true;

        return false;
    };
    const getEndCondition = () => {
        return gameEndCondition;
    };
    const resetGame = () => {
        GameBoard.resetGameboardArray();
        gameRound = 1;
        gameEndCondition = false;
        DisplayController.modifyDOM(`Player ${getCurrPlayerSign()}'s turn.`);
    };
    return { playRound, getEndCondition, resetGame };
})();

const DisplayController = (() => {
    const grid = document.querySelectorAll(".grid-square");
    const result = document.querySelector(".result");
    const resetButton = document.querySelector(".reset");

    grid.forEach((square) => {
        square.addEventListener("click", (e) => {
            if (GameController.getEndCondition() || e.target.textContent != "") return;
            GameController.playRound(parseInt(e.target.id))
            updateGameboard();
        });
    });
    resetButton.addEventListener("click", (e) => {
        GameController.resetGame();
        updateGameboard();
    });
    const updateGameboard = () => {
        for (let i = 0; i < 9; i++) grid[i].textContent = GameBoard.gameboardArray[i];
    };
    const setResult = (winningSign) => {
        if (winningSign == "Draw") modifyDOM("The result is a draw.");
        else modifyDOM(`${winningSign} has won.`);
    };
    const modifyDOM = (text) => {
        result.textContent = text;
    };
    return { setResult, modifyDOM };
})();