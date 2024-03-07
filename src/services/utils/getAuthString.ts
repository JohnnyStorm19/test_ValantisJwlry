import md5 from "md5";

export const getAuthString = (currentDate: string) => {
  return md5(`Valantis_${currentDate}`);
};
