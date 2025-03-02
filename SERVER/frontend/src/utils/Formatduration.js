function formatDuration(dateString) {
  // Parse the input date string into a JavaScript Date object
  const date = new Date(dateString);

  // Extract minutes and seconds
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Pad single-digit minutes and seconds with a leading zero
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  // Format the time as MM:SS
  return `${minutes}:${seconds}`;
}

// Example usage
// const inputDate = "2024-11-16T12:03:35.068Z";
// const formattedTime = formatTime(inputDate);
// console.log(formattedTime); // Output: 12:03

// Example usage:
// console.log(formatDuration(3665)); // Output: 01h 01m 05s
module.exports = formatDuration;
