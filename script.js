const playerFactory = (symbol) => {
    return {symbol}
}

const gameBoard = (() => {
    const board =  ["", "", "", "", "", "", "", "", ""]

    const setField = (index, sign) => {
        if (index >  board.length) return;
        board[index] = sign;
    }

    const getField = (index) => {
        if (index >  board.length) return;
        return board[index]
    }

    const reset = () => {
        for (let i=0; i < board.length; i++) {
            board[i] = ""
        }
    }
    const printBoard = () => {
        console.log(board)
    }
    return {setField, getField, reset, printBoard}
})();

const displayController = (() => {
    const fieldElements = document.querySelectorAll(".field")
    const turnLabel = document.getElementById("turnLabel")
    const resetButton = document.getElementById("resetButton")

    fieldElements.forEach((field) => 
        field.addEventListener("click", (e) => {
            if (gameController.getIsOver() || e.target.textContent !== "") return;
            gameController.playRound(parseInt(e.target.dataset.index), gameController.getCurrentPlayerSymbol())
            updateGameboard()
        })
    )
    resetButton.addEventListener("click", (e) => {
        gameBoard.reset()
        gameController.reset()
        updateGameboard()
        turnLabel.classList.remove('game-over')
        setTurnLabel(gameController.getCurrentPlayerSymbol())
    } )

    const setTurnLabel = (text) => {
        turnLabel.textContent= `Player Turn: ${text}`
    }
    const setWinner = (text) => {
        turnLabel.textContent = `The Winner is ${text}!`
        turnLabel.classList.add('game-over')
    }
    const setTie = () => {
        turnLabel.textContent = 'The game is a Tie!'
        turnLabel.classList.add('game-over')
    }
    const updateGameboard = () => {
        for (let i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = gameBoard.getField(i)
        }
    }

    return {setTurnLabel, updateGameboard, setWinner, setTie}
})()

const gameController = (() => {
    const playerX = playerFactory("X")
    const playerO = playerFactory("O")
    let round = 1
    let isOver = false

    const playRound = (fieldIndex, playerSymbol) => {
        gameBoard.setField(fieldIndex, playerSymbol)
        checkWinner(playerSymbol)
        if (isOver) {
            console.log("the game is over!")
            displayController.setWinner(playerSymbol)
            return
        }
        if (round === 9) {
            displayController.setTie()
            isOver = true
            return
        }
        console.log(gameBoard.printBoard())
        round++
        displayController.setTurnLabel(getCurrentPlayerSymbol())
    }

    const getCurrentPlayerSymbol = () => {
        return round % 2 === 1 ? playerX.symbol : playerO.symbol
    }

    const checkWinner = (symbol) => {
        if (gameBoard.getField(0) == symbol && gameBoard.getField(1) == symbol && gameBoard.getField(2) == symbol) {
            isOver = true
        } else if  (gameBoard.getField(0) == symbol && gameBoard.getField(4) == symbol && gameBoard.getField(8) == symbol) {
            isOver = true
        } else if  (gameBoard.getField(3) == symbol && gameBoard.getField(4) == symbol && gameBoard.getField(5) == symbol) {
            isOver = true
        } else if  (gameBoard.getField(6) == symbol && gameBoard.getField(7) == symbol && gameBoard.getField(8) == symbol) {
            isOver = true
        } else if  (gameBoard.getField(0) == symbol && gameBoard.getField(3) == symbol && gameBoard.getField(6) == symbol) {
            isOver = true
        } else if  (gameBoard.getField(1) == symbol && gameBoard.getField(4) == symbol && gameBoard.getField(7) == symbol) {
            isOver = true
        } else if  (gameBoard.getField(2) == symbol && gameBoard.getField(5) == symbol && gameBoard.getField(8) == symbol) {
            isOver = true
        } else if  (gameBoard.getField(2) == symbol && gameBoard.getField(4) == symbol && gameBoard.getField(6) == symbol) {
            isOver = true
        }
    }

    const reset = () => {
        round = 1
        isOver = false
    }

    const getIsOver = () => {
        return isOver
    }
    return {playRound, getCurrentPlayerSymbol, checkWinner, getIsOver, reset}
})()

