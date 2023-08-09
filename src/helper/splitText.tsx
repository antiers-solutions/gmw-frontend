export const splitText = (text: string, to: number) => {
  return text.slice(0, to) + "..." + text.slice(-to);
};
