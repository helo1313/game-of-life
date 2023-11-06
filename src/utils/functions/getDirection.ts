export const getDirection = () => {
  const x = Math.floor(Math.random() * 3) - 1;
  const y = Math.floor(Math.random() * 3) - 1;
  return { x, y };
};
