/**
 * @description Format date to `MM/DD/YYYY`
 */
const formatDate = (unformattedDate: Date | string): string => {
  const date =
    typeof unformattedDate === "string"
      ? new Date(unformattedDate)
      : unformattedDate;
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month}/${day}/${year}`;
};

export { formatDate };
