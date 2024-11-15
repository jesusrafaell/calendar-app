import dayjs from "dayjs";

export const isCompleted = (date: string) => {
  const eventDateTime = dayjs(date);
  const now = dayjs();
  return eventDateTime.isBefore(now) ? true : false;
};
