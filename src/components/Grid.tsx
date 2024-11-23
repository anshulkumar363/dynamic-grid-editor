// import React from "react";
// import styled from "styled-components";

// type GridProps = {
//   grid: boolean[][];
//   setGrid: React.Dispatch<React.SetStateAction<boolean[][]>>;
//   setError: React.Dispatch<React.SetStateAction<string | null>>;
// };

// const Grid: React.FC<GridProps> = ({ grid, setGrid, setError }) => {
//   const toggleCell = (rowIndex: number, colIndex: number) => {
//     const updatedGrid = grid.map((row, rIdx) =>
//       row.map((cell, cIdx) => {
//         if (rIdx === rowIndex && cIdx === colIndex) {
//           return !cell; // Toggle the clicked cell
//         }
//         return cell;
//       })
//     );

//     // Update neighbors if toggling to 1
//     if (updatedGrid[rowIndex][colIndex]) {
//       updateNeighbors(rowIndex, colIndex, updatedGrid);
//     }

//     if (isValid(updatedGrid)) {
//       setGrid(updatedGrid);
//       setError(null);
//     } else {
//       setError("Invalid move! Ensure constraints are met.");
//     }
//   };

//   const updateNeighbors = (
//     rowIndex: number,
//     colIndex: number,
//     grid: boolean[][]
//   ) => {
//     // Update immediate neighbors (up, down, left, right)
//     if (rowIndex > 0) grid[rowIndex - 1][colIndex] = true; // Up
//     if (rowIndex < grid.length - 1) grid[rowIndex + 1][colIndex] = true; // Down
//     if (colIndex > 0) grid[rowIndex][colIndex - 1] = true; // Left
//     if (colIndex < grid[0].length - 1) grid[rowIndex][colIndex + 1] = true; // Right
//   };

//   const isValid = (grid: boolean[][]): boolean => {
//     // Check row and column constraints
//     for (let i = 0; i < grid.length; i++) {
//       const rowCount = grid[i].filter((cell) => cell).length;
//       const colCount = grid.map((row) => row[i]).filter((cell) => cell).length;

//       if (rowCount > 3 || colCount > 3) {
//         return false; // No row or column can have more than 3 filled cells
//       }
//     }

//     // Check 2x2 square constraints
//     for (let i = 0; i < grid.length - 1; i++) {
//       for (let j = 0; j < grid[i].length - 1; j++) {
//         if (
//           grid[i][j] &&
//           grid[i + 1][j] &&
//           grid[i][j + 1] &&
//           grid[i + 1][j + 1]
//         ) {
//           return false; // No 2x2 squares of filled cells
//         }
//       }
//     }

//     return true;
//   };

//   return (
//     <StyledGrid>
//       {grid.map((row, rowIndex) =>
//         row.map((cell, colIndex) => (
//           <Cell
//             key={`${rowIndex}-${colIndex}`}
//             isFilled={cell}
//             onClick={() => toggleCell(rowIndex, colIndex)}
//           />
//         ))
//       )}
//     </StyledGrid>
//   );
// };

// const StyledGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(10, 40px);
//   gap: 2px;
//   margin: 20px auto;
// `;

// const Cell = styled.div<{ isFilled: boolean }>`
//   width: 40px;
//   height: 40px;
//   background-color: ${(props) => (props.isFilled ? "#4a90e2" : "#ffffff")};
//   border: 1px solid #dddddd;
//   border-radius: 4px;
//   box-shadow: ${(props) =>
//     props.isFilled ? "inset 0 0 8px rgba(0, 0, 0, 0.2)" : "none"};
//   cursor: pointer;

//   &:hover {
//     background-color: ${(props) =>
//       props.isFilled ? "#357ab8" : "#f1f1f1"};
//   }
// `;

// export default Grid;
import React from "react";
import styled from "styled-components";

type GridProps = {
  grid: boolean[][];
  setGrid: React.Dispatch<React.SetStateAction<boolean[][]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const Grid: React.FC<GridProps> = ({ grid, setGrid, setError }) => {
  const toggleCell = (rowIndex: number, colIndex: number) => {
    const updatedGrid = grid.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (rIdx === rowIndex && cIdx === colIndex) {
          return !cell; // Toggle the clicked cell
        }
        return cell;
      })
    );

    // Update neighbors if toggling to 1
    if (updatedGrid[rowIndex][colIndex]) {
      updateNeighbors(rowIndex, colIndex, updatedGrid);
    }

    if (isValid(updatedGrid)) {
      setGrid(updatedGrid);
      setError(null);
    } else {
      setError("Invalid move! Ensure constraints are met.");
    }
  };

  const updateNeighbors = (
    rowIndex: number,
    colIndex: number,
    grid: boolean[][]
  ) => {
    // Update immediate neighbors (up, down, left, right)
    if (rowIndex > 0) grid[rowIndex - 1][colIndex] = true; // Up
    if (rowIndex < grid.length - 1) grid[rowIndex + 1][colIndex] = true; // Down
    if (colIndex > 0) grid[rowIndex][colIndex - 1] = true; // Left
    if (colIndex < grid[0].length - 1) grid[rowIndex][colIndex + 1] = true; // Right
  };

  const isValid = (grid: boolean[][]): boolean => {
    // Check row and column constraints
    for (let i = 0; i < grid.length; i++) {
      const rowCount = grid[i].filter((cell) => cell).length;
      const colCount = grid.map((row) => row[i]).filter((cell) => cell).length;

      if (rowCount > 3 || colCount > 3) {
        return false; // No row or column can have more than 3 filled cells
      }
    }

    // Check 2x2 square constraints
    for (let i = 0; i < grid.length - 1; i++) {
      for (let j = 0; j < grid[i].length - 1; j++) {
        if (
          grid[i][j] &&
          grid[i + 1][j] &&
          grid[i][j + 1] &&
          grid[i + 1][j + 1]
        ) {
          return false; // No 2x2 squares of filled cells
        }
      }
    }

    return true;
  };

  return (
    <StyledGrid>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            isFilled={cell}
            onClick={() => toggleCell(rowIndex, colIndex)}
          />
        ))
      )}
    </StyledGrid>
  );
};

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 40px); /* Fix 10 columns with 40px width */
  gap: 2px;
  margin: 20px auto;
  width: 100%; /* Full container width */
  max-width: 450px; /* Maximum width of grid */
  height: auto;
  padding: 10px;
  justify-content: center;
`;

const Cell = styled.div<{ isFilled: boolean }>`
  width: 100%;
  aspect-ratio: 1; /* Make each cell a square */
  background-color: ${(props) => (props.isFilled ? "#4a90e2" : "#ffffff")};
  border: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;

  /* Hover effect */
  &:hover {
    transform: scale(1.1); /* Slight zoom on hover */
  }

  /* Animation on cell toggle */
  &.cell-changed {
    animation: pop 0.2s ease-out;
  }

  @keyframes pop {
    0% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default Grid;
