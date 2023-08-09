export const addZero = (value: number | string) => {
  let length = String(value)?.length > 1 ? value : "0" + value;
  return length;
};
