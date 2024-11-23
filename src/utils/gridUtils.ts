export const createEmptyGrid = (size: number): boolean[][] => {
    return Array(size).fill(Array(size).fill(false));
  };
  