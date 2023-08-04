import { addZero } from "./addZero";

//time formatting
export const timeFormat = (value: string) => {
  if (!value) return;
  let data = new Date(value)?.toLocaleDateString();
  var date = data.split("/");
  var dd = addZero(String(date[0]));
  var mm = addZero(String(date[1]));
  var yyyy = date[2];
  return dd + "-" + mm + "-" + yyyy;
};
