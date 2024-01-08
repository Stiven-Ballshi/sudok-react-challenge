import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [grid, setGrid] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const setGridValue = (rowIndex: number, colIndex: number, value: number) => {
    const newGrid = grid.map((row) => [...row]);
    newGrid[rowIndex][colIndex] = value;
    setGrid(newGrid);
  };

  const getSudoku = async (solveClicked: boolean) => {
    const req = await fetch(
      "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value, solution}}}"
    );
    const payload = await req.json();
    const solution = payload.newboard.grids[0].solution;
    const initialSudoku = payload.newboard.grids[0].value;

    if (solveClicked) {
      const transposedSolution = solution[0].map((_: any, colIndex: number) =>
        solution.map((row: number[]) => row[colIndex])
      );
      setGrid(transposedSolution);
    } else {
      const transposedSudoku = initialSudoku[0].map(
        (_: any, colIndex: number) =>
          initialSudoku.map((row: number[]) => row[colIndex])
      );
      setGrid(transposedSudoku);
    }
  };

  useEffect(() => {
    getSudoku(false);
  }, []);

  return (
    <div className="container">
      <div className="grid">
        {grid.map((row: number[], rowIdx: number) => {
          return (
            <div key={rowIdx} className="row">
              {row.map((num: number, colIdx: number) => {
                return (
                  <input
                    key={colIdx}
                    onChange={(e) =>
                      setGridValue(rowIdx, colIdx, parseInt(e.target.value))
                    }
                    inputMode="numeric"
                    value={num}
                    className="cell"
                  />
                );
              })}
            </div>
          );
        })}
        <button onClick={() => getSudoku(true)}>Solve</button>
      </div>
    </div>
  );
}

export default App;
