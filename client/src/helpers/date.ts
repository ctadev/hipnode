export const formattedDate = (dateStr: Date) => {
  const dateObj = new Date(dateStr);

  return dateObj.toDateString();
};
