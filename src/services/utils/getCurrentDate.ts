export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = (today.getMonth() + 1).toString();
  let day = today.getDate().toString();

  if (Number(month) < 10) {
    month = `0${month}`
  }
  if (Number(day) < 10) {
    day = `0${day}`
  }

  const currentDate = year + month + day;
  return currentDate;
};
