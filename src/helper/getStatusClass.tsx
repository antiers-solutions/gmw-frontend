export const getStatusClass = (status: string) => {
  if (status === "active") return "yellow";
  if (status === "complete") return "green";
  if (status === "hold") return "red";
  if (status === "reject") return "purple";
};
