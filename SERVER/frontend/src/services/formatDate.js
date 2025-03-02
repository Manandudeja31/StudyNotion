const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Example usage
// const formattedDate = formatDate("10/31/2024"); // Input format should be parseable by Date
// console.log(formattedDate); // Output: "2024-10-31"

export default formatDate;
