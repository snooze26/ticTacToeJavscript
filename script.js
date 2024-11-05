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
});

const players = (() => {
    const playerInputs = () => {
        const acceptableMarkers = ["X", "O"];

        let marker = prompt("Player 1, choose X or O");

        let player1 = marker; 
        let player2;

        if(player1 === "X"){
            player2 = "O";

        }else{
            player2 = "X";
        }

        return {player1, player2};
    }

    const pickPlayer = (()) => {

    }
});

console.log(gameBoard.board);

players.playerInputs();