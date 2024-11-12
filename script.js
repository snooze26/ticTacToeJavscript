//gameBoard DOM element

const gameBoardFn = (() => {
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

    return { togglePlayer, getCurrentPlayer}; 
})();


const manipulateDOM = (() => {
        const boardLogic = () => {

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

                            boardLogic();
                        }else{
                            alert("Position already taken!");
                        };
                    });
                    row.appendChild(cell);
                };
            gameBoardTable.appendChild(row);
            }
        };



        //reset board 
        document.querySelector("#resetBtn").addEventListener("click", () => {
            gameBoardFn.resetBoard();
            manipulateDOM.boardLogic();
        });


    return { boardLogic };
    
})();

manipulateDOM.boardLogic();

