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
    let playerNames = { X: "Player 1", O: "Player 2" };

    const setPlayerNames = () => {
        const name1Input = document.querySelector("#name1");
        const name2Input = document.querySelector("#name2");

        playerNames.X = name1Input.value || "Player 1";
        playerNames.O = name2Input.value || "Player 2";

        document.querySelector("#player1Display").textContent = playerNames.X;
        document.querySelector("#player2Display").textContent = playerNames.O;
    };

    const initNameInputs = () => {
        document.querySelector("#name1").addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                setPlayerNames();
                e.target.blur(); // Remove focus after pressing Enter
            }
        });

        document.querySelector("#name2").addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                setPlayerNames();
                e.target.blur(); // Remove focus after pressing Enter
            }
        });
    };

    const togglePlayer = () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    };

    const getCurrentPlayer = () => currentPlayer;
    const getCurrentPlayerName = () => playerNames[currentPlayer];

    return { togglePlayer, getCurrentPlayer, setPlayerNames, getCurrentPlayerName, initNameInputs };
})();

const manipulateDOM = (() => {
    const boardLogic = () => {
        const boardArray = gameBoardFn.getBoard();
        const gameBoardTable = document.querySelector("#gameBoard");

        gameBoardTable.innerHTML = "";

        // Row creation
        for (let i = 0; i < boardArray.length; i += 3) {
            const row = document.createElement("tr");

            // Cell creation
            for (let j = i; j < i + 3; j++) {
                const cell = document.createElement("td");

                cell.textContent = boardArray[j] || "";
                cell.classList.add("board-cell");

                if (boardArray[j] === "X") {
                    cell.style.color = "blue";
                } else if (boardArray[j] === "O") {
                    cell.style.color = "red";
                }

                cell.addEventListener("click", () => {
                    if (gameBoardFn.checkEmptySpace(j)) {
                        const currentPlayer = playersFn.getCurrentPlayer();
                        const currentPlayerName = playersFn.getCurrentPlayerName();

                        gameBoardFn.boardPosition(currentPlayer, j);

                        if (gameBoardFn.declareWinner(currentPlayer)) {
                            alert(`${currentPlayerName} wins!`);
                            gameBoardFn.resetBoard();
                        } else if (gameBoardFn.getBoard().every(cell => cell !== "")) {
                            alert("It's a tie!");
                            gameBoardFn.resetBoard();
                        } else {
                            playersFn.togglePlayer();
                        }

                        boardLogic();
                    } else {
                        alert("Position already taken!");
                    }
                });

                row.appendChild(cell);
            }
            gameBoardTable.appendChild(row);
        }
    };

    // Reset board
    document.querySelector("#resetBtn").addEventListener("click", () => {
        gameBoardFn.resetBoard();
        manipulateDOM.boardLogic();
        playersFn.setPlayerNames();  // Reset player names on reset
    });

    return { boardLogic };
})();

// Initialize game
manipulateDOM.boardLogic();
playersFn.initNameInputs();
