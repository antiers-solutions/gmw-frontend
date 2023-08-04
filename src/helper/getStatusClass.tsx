export const getStatusClass = (status: string) => {
  if (status === "active") return "yellow";
  if (status === "complete") return "green";
  if (status === "hold") return "red";
  if (status === "reject") return "purple";
};

export const getStatusName = (status: string) => {
  if (status === "active") return "In-Progress";
  if (status === "complete") return "Completed";
  if (status === "hold") return "Hold";
  if (status === "reject") return "Rejected";
};
