import { useState } from "react"
import { Square }  from "./components/Square.jsx"
import confetti from "canvas-confetti"
import { TURNS } from "./constants.js"
import { checkWinner, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { SquareGame } from "./components/SquareGame.jsx"

function App() {
  const [board, setBoard] = useState(() => {
    const boardLocalStorage = JSON.parse(window.localStorage.getItem("board"))
    return boardLocalStorage ?? Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnLocalStorage = window.localStorage.getItem("turn")
    return turnLocalStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)
  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    window.localStorage.setItem("board", JSON.stringify(newBoard))
    window.localStorage.setItem("turn", newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner !== null) {
      confetti()
      setWinner(newWinner)
      window.localStorage.removeItem("board")
      window.localStorage.removeItem("turn")
    } 
    else if (checkEndGame(newBoard)) setWinner(false)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem("board")
    window.localStorage.removeItem("turn")
  }
  return (
    <main className="board">
      <h1>#</h1>
      <button onClick={resetGame}>Reset</button>
      <section className="game">
        <SquareGame board={board} updateBoard={updateBoard} />
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />

    </main>
  )
}

export default App
