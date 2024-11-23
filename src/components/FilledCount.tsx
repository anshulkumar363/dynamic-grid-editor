import React from "react";

type FilledCountProps = {
  grid: boolean[][];
};

const FilledCount: React.FC<FilledCountProps> = ({ grid }) => {
  const rowCounts = grid.map((row) => row.filter((cell) => cell).length);
  const colCounts = Array(grid.length)
    .fill(0)
    .map((_, colIndex) =>
      grid.map((row) => row[colIndex]).filter((cell) => cell).length
    );

  return (
    <div>
      <h3>Filled Counts:</h3>
      <div>Rows: {rowCounts.join(", ")}</div>
      <div>Columns: {colCounts.join(", ")}</div>
    </div>
  );
};

export default FilledCount;
