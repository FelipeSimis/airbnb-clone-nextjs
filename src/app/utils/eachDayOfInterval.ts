type Props = {
  start: Date;
  end: Date;
};

export const eachDayOfInterval = ({ start, end }: Props) => {
  const days = [];

  const currentDay = new Date(start);

  while (currentDay <= end) {
    days.push(new Date(currentDay));

    currentDay.setDate(currentDay.getDate() + 1);
  }

  return days;
};
