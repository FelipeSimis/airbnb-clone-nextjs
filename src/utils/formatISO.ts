export const formatISO = (date: Date) => {
  const isoString = date.toISOString();

  return `${isoString.slice(0, isoString.length - 5)}Z`;
};
