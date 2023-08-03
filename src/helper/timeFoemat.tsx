//time formatting
export const timeFormat = (value: string) => {
  let data = new Date(value)?.toLocaleDateString();
  var date = data.split("/");
  var dd = date[0].length > 1 ? date[0] : "0" + date[0];
  var mm = date[1].length > 1 ? date[1] : "0" + date[1];
  var yyyy = date[2];
  return dd + "-" + mm + "-" + yyyy;
};
