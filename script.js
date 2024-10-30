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
        if(player1 === "X"){
            let player2 = "O";

        }else{
            let player2 = "X";
        }

        return (player1, player2);
    }
});

console.log(gameBoard.board);
