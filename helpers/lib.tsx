export const lib = () => {
  const convertToIndex = (row: number, col: number, size: number) => {
    return row * size + col;
  };

  return {
    convertToIndex,
  };
};
