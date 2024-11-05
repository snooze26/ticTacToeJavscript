const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board; 

    const resetBoard = () => {
        for(let i = 0; i < board.length; i++){
            board[i] = "";
        }
    };

    // const setMarker = () => {

    // }

    return { getBoard, resetBoard};
})();

const players = (() => {
    const playerInputs = () => {
        const acceptableMarkers = ["X", "O"];

        let marker = prompt("Player 1, choose X or O");

        let player1 = marker; 
        let player2;

        if(player1 === "X" || player1 === "x"){
            player2 = "O";

        }else if( player1 === "O" || player1 === "o"){
            player2 = "X";
        }else{
            players.playerInputs();
        }

        return {player1, player2};
    };

    const pickPlayer = () => {
            let playerOrder = Math.floor(Math.random() * 2);

            if(playerOrder === 0){
                return "Player 1";
            }else{
                return "Player 2";
            }
        }; 

    const playerChoice = () => {
        acceptableValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        boardPosition = 0;

        while (gameBoard.getBoard(board[acceptableValues])){
            boardPosition = parseInt(prompt("Choose your next position: (1-9)"));

        }
        return boardPosition;

    }

    return {playerInputs, pickPlayer, playerChoice};
})();

console.log(gameBoard.getBoard());

console.log(players.playerInputs());

console.log(players.playerChoice);