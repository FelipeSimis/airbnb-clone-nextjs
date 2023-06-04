export const formatDate = (date: Date | undefined) => {
  return Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);
};
