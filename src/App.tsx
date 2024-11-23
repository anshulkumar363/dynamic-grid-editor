import React, { useState } from "react";
import styled from "styled-components";
import Grid from "./components/Grid";

const App: React.FC = () => {
  const [grid, setGrid] = useState<boolean[][]>(
    Array(10)
      .fill(false)
      .map(() => Array(10).fill(false))
  );
  const [error, setError] = useState<string | null>(null);

  // Reset the grid to empty cells
  const resetGrid = () => {
    setGrid(
      Array(10)
        .fill(false)
        .map(() => Array(10).fill(false))
    );
    setError(null);
  };

  // Randomly fill the grid while respecting constraints
  const randomFillGrid = () => {
    const newGrid = Array(10)
      .fill(false)
      .map(() => Array(10).fill(false));

    const fillRandomly = () => {
      for (let i = 0; i < 10; i++) {
        let rowFilled = 0;

        for (let j = 0; j < 10; j++) {
          if (rowFilled >= 3) break; // Ensure no more than 3 filled cells per row

          if (Math.random() > 0.7) {
            newGrid[i][j] = true;
            rowFilled++;
          }

          // Ensure constraints are met (no more than 3 filled cells per column, and no 2x2 filled squares)
          if (!isValid(newGrid)) {
            newGrid[i][j] = false;
            rowFilled--;
          }
        }
      }
    };

    const isValid = (grid: boolean[][]): boolean => {
      // Row and column constraints
      for (let i = 0; i < grid.length; i++) {
        const rowCount = grid[i].filter((cell) => cell).length;
        const colCount = grid.map((row) => row[i]).filter((cell) => cell).length;

        if (rowCount > 3 || colCount > 3) {
          return false;
        }
      }

      // 2x2 filled square constraint
      for (let i = 0; i < grid.length - 1; i++) {
        for (let j = 0; j < grid[i].length - 1; j++) {
          if (
            grid[i][j] &&
            grid[i + 1][j] &&
            grid[i][j + 1] &&
            grid[i + 1][j + 1]
          ) {
            return false;
          }
        }
      }

      return true;
    };

    fillRandomly();
    setGrid(newGrid);
  };

  // Calculate the filled cells in each row and column
  const calculateRowCounts = () => {
    return grid.map((row) => row.filter((cell) => cell).length);
  };

  const calculateColumnCounts = () => {
    return Array(10)
      .fill(0)
      .map((_, colIndex) =>
        grid.map((row) => row[colIndex]).filter((cell) => cell).length
      );
  };

  const rowCounts = calculateRowCounts();
  const colCounts = calculateColumnCounts();

  return (
    <Container>
      <Title>Dynamic Grid Editor</Title>
      {error && <Error>{error}</Error>}
      <Grid grid={grid} setGrid={setGrid} setError={setError} />
      <Counts>
        <div>
          <strong>Row Counts:</strong> {rowCounts.join(", ")}
        </div>
        <div>
          <strong>Column Counts:</strong> {colCounts.join(", ")}
        </div>
      </Counts>
      <ButtonGroup>
        <Button onClick={resetGrid}>Reset Grid</Button>
        <Button onClick={randomFillGrid}>Random Fill</Button>
      </ButtonGroup>
      <Legend>
        <div className="legend-item">
          <div className="color-box" style={{ backgroundColor: "#ffffff" }}></div> 0 = Empty
        </div>
        <div className="legend-item">
          <div className="color-box" style={{ backgroundColor: "#4a90e2" }}></div> 1 = Filled
        </div>
      </Legend>
    </Container>
  );
};

// Styled Components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  background: #f4f4f4;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 2rem;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #357ab8;
  }
`;

const Counts = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #333;
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .legend-item {
    display: flex;
    align-items: center;
    margin: 0 10px;

    .color-box {
      width: 20px;
      height: 20px;
      margin-right: 8px;
      border: 1px solid #ddd;
    }
  }
`;

const Error = styled.div`
  color: red;
  margin-top: 10px;
`;

export default App;
