export const getStatusClass = (status: string) => {
  if (status === "active" || status === "in-progress" || status === "in-review")
    return "yellow";
  if (status === "complete" || status === "accepted" || status === "completed")
    return "green";
  if (status === "hold" || status === "rejected") return "red";
  if (status === "reject") return "purple";
};

export const getStatusName = (status: string) => {
  if (status === "active") return "In-Progress";
  if (status === "complete") return "Completed";
  if (status === "hold") return "Hold";
  if (status === "reject") return "Rejected";
};
