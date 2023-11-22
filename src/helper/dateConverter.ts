export const dateConverter = (date: Date) => {
  console.log(date);

  const givenDate = new Date(date);
  const currentDate = new Date();

  const differenceInTime = currentDate.getTime() - givenDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays + ' days ago';
};
