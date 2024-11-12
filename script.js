//gameBoard DOM element
const gameBoard = document.querySelector("#gameBoard");

const gameBoardFn = (() => {
    const board = ["X", "X", "X", "X", "X", "X", "X", "X", "X"];

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

    const declareWinner = (marker) => {

        return (
            //row checks
            (board[0] === marker && board[1] === marker && board[2] === marker) ||
            (board[3] === marker && board[4] === marker && board[5] === marker) ||
            (board[6] === marker && board[7] === marker && board[8] === marker) ||
            //column checks
            (board[0] === marker && board[3] === marker && board[6] === marker) ||
            (board[1] === marker && board[4] === marker && board[7] === marker) ||
            (board[2] === marker && board[5] === marker && board[8] === marker) ||
            //cross checks
            (board[0] === marker && board[4] === marker && board[8] === marker) ||
            (board[2] === marker && board[4] === marker && board[6] === marker)
            );
    
    };

    const resetGame = (( ) => {
        let replayChoice; 
        const yesOrNo = ["Y", "y", "N", "n"];

        while(!yesOrNo.includes(replayChoice)){
            replayChoice = prompt("Do you want to keep playing? Y or N");
            
            if(!yesOrNo.includes(replayChoice)){
                replayChoice = alert("Sorry, please chose Y or N");
            };
        };

        if((replayChoice == "Y") || (replayChoice == "y") ){
            return true;
        }else{
            return false;
        };    
    });

    return { boardPosition, checkEmptySpace, declareWinner, fullBoardCheck, getBoard, resetGame, resetBoard };
})();

const playersFn = (() => {

    let currentPlayer = "X";

    const togglePlayer = () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    };

    const getCurrentPlayer = () => currentPlayer; 
    // const playerInputs = () => {
    //     const acceptableMarkers = ["X", "O"];

    //     let marker = prompt("Player 1, choose X or O");

    //     let player1 = marker; 
    //     let player2;

    //     if(player1 === "X" || player1 === "x"){
    //         player1 = "X";
    //         player2 = "O";

    //     }else if( player1 === "O" || player1 === "o"){
    //         player1 = "O";
    //         player2 = "X";

    //     }else{
    //         players.playerInputs();

    //     }

    //     return {player1, player2};
    // };

    // const pickPlayer = () => {
    //         let playerOrder = Math.floor(Math.random() * 2);
    //         console.log(playerOrder);

    //         if(playerOrder === 0){
    //             return "Player 1";
    //         }else{
    //             return "Player 2";
    //         }
            
    //     }; 

    // const playerChoice = (marker) => {
    //     const acceptableValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    //     let boardPosition = 0;
    //     const board = gameBoard.getBoard();
 
    //     while(true) {
    //         boardPosition = parseInt(prompt("Choose your next position: (1-9)"));

    //         if(acceptableValues.includes(boardPosition) && board[boardPosition - 1] === ""){
    //             board[boardPosition - 1] = marker;
    //             break;
    //         }else {
    //             console.log("Invalid choice or position already taken. Please choose a new position between 1-9");
    //         }
    //     }
    //     return boardPosition;

    // }

    // return {playerInputs, pickPlayer, playerChoice};
    return { togglePlayer, getCurrentPlayer}; 
})();


const manipulateDOM = (() => {
        const showBoard = () => {

            const boardArray = gameBoardFn.getBoard();
            gameBoardTable = document.querySelector("#gameBoard");

            gameBoardTable.innerHTML = "";
            
            //row creation
            for(let i = 0; i < boardArray.length; i += 3){
                const row = document.createElement("tr");
                
                //cell creation
                for (let j = i; j < i +3; j++){
                    const cell = document.createElement("td");

                    //add X or O or leave Empty 
                    cell.textContent = boardArray[j] || "";
                    cell.classList.add("board-cell");

                    cell.addEventListener("click", () => {
                        if(gameBoardFn.checkEmptySpace(j)){
                            const currentPlayer = playersFn.getCurrentPlayer();
                            gameBoardFn.boardPosition(currentPlayer, j);
                            
                            //check for winner/reset board
                            if(gameBoardFn.declareWinner(currentPlayer)) {
                                alert(`${currentPlayer} win!`);
                                gameBoardFn.resetBoard();
                            }else if(gameBoardFn.getBoard().every(cell => cell !== "")){
                                alert("it's a tie!");
                                gameBoardFn.resetBoard();
                            }else{
                                playersFn.togglePlayer();
                            }

                            showBoard();
                        }else{
                            console.log("Position already taken!");
                        };
                    });
                    row.appendChild(cell);
                };
            gameBoardTable.appendChild(row);
            }
        };


        const playerChoiceDOM = () => {
                
        };

        //reset board 
        document.querySelector("#resetBtn").addEventListener("click", () => {
            gameBoardFn.resetBoard();
            manipulateDOM.showBoard();
        });


    return { showBoard };
    
})();

manipulateDOM.showBoard();
console.log(playersFn.getCurrentPlayer());



// console.log(gameBoardFn.getBoard());

// console.log(playersFn.pickPlayer());

// console.log(playersFn.playerInputs());

// console.log(playersFn.playerChoice());

// console.log(gameBoardFn.fullBoardCheck());

// console.log(gameBoardFn.resetGame());