import React from "react";
import styled from "styled-components";

type ControlsProps = {
  grid: boolean[][];
  setGrid: React.Dispatch<React.SetStateAction<boolean[][]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const Controls: React.FC<ControlsProps> = ({ grid, setGrid, setError }) => {
  const resetGrid = () => {
    setGrid(Array(10).fill(Array(10).fill(false)));
    setError(null);
  };

  const randomFill = () => {
    let newGrid;
    do {
      newGrid = Array(10)
        .fill(0)
        .map(() =>
          Array(10)
            .fill(0)
            .map(() => Math.random() < 0.5)
        );
    } while (!isValid(newGrid));
    setGrid(newGrid);
    setError(null);
  };

  const isValid = (grid: boolean[][]): boolean => {
    // Validation logic as in `Grid` component
    return true;
  };

  return (
    <StyledControls>
      <StyledButton onClick={resetGrid} primary>
        Reset
      </StyledButton>
      <StyledButton onClick={randomFill}>Random Fill</StyledButton>
    </StyledControls>
  );
};

const StyledControls = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
`;

const StyledButton = styled.button<{ primary?: boolean }>`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.primary ? "white" : "#4a90e2")};
  background: ${(props) => (props.primary ? "#4a90e2" : "white")};
  border: 2px solid #4a90e2;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.primary ? "#357ab8" : "#f1f1f1")};
    color: ${(props) => (props.primary ? "white" : "#357ab8")};
    border-color: #357ab8;
  }
`;

export default Controls;
