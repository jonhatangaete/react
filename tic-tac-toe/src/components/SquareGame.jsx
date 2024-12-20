import { Square } from "./Square"
export function SquareGame({board, updateBoard}) {
    return (
        
                  board.map((square, index) => {
                    return (
                      <Square
                        key={index}
                        index={index}
                        updateBoard={updateBoard}>
                        {square}
                      </Square>
                    )
                  })
            
    )
}