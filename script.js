const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board; 

    const resetBoard = () => {
        for(let i = 0; i < board.length; i++){
            board[i] = "";
        }
    };

    const checkEmptySpace = (position) => {
        return board[position] === "";
    };

    const boardPosition = (marker, position) => {
        if(checkEmptySpace(position)){ 
            board[position] = marker; 
        }else{
            console.log("Position already occupied!");
        }
    };
    
    const fullBoardCheck = () => {
        for(let i = 0; i < board.length; i++){
            if(board[i] === ""){
                return false;
            }
        } 
        return true; 
    };

    return { getBoard, resetBoard, checkEmptySpace, boardPosition, fullBoardCheck };
})();

const players = (() => {
    const playerInputs = () => {
        const acceptableMarkers = ["X", "O"];

        let marker = prompt("Player 1, choose X or O");

        let player1 = marker; 
        let player2;

        if(player1 === "X" || player1 === "x"){
            player1 = "X";
            player2 = "O";

        }else if( player1 === "O" || player1 === "o"){
            player1 = "O";
            player2 = "X";

        }else{
            players.playerInputs();

        }

        return {player1, player2};
    };

    const pickPlayer = () => {
            let playerOrder = Math.floor(Math.random() * 2);
            console.log(playerOrder);

            if(playerOrder === 0){
                return "Player 1";
            }else{
                return "Player 2";
            }
            
        }; 

    const playerChoice = (marker) => {
        const acceptableValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let boardPosition = 0;
        const board = gameBoard.getBoard();
 
        while(true) {
            boardPosition = parseInt(prompt("Choose your next position: (1-9)"));

            if(acceptableValues.includes(boardPosition) && board[boardPosition - 1] === ""){
                board[boardPosition - 1] = marker;
                break;
            }else {
                console.log("Invalid choice or position already taken. Please choose a new position between 1-9");
            }
        }
        return boardPosition;

    }

    return {playerInputs, pickPlayer, playerChoice};
})();







console.log(gameBoard.getBoard());

console.log(players.pickPlayer());

console.log(players.playerInputs());

console.log(players.playerChoice());

console.log(gameBoard.fullBoardCheck());