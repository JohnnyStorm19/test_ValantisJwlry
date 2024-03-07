import { TRequestConfig } from "../../models/TRequestConfig";
import { getAuthString } from "../utils/getAuthString";
import { getCurrentDate } from "../utils/getCurrentDate";

export const getRequestConfig = ({ method, postData }: TRequestConfig) => {
  const currentDate = getCurrentDate();
  return {
    method: method,
    baseURL: "https://api.valantis.store:41000/",
    headers: {
      accept: "application/json",
      "X-Auth": getAuthString(currentDate),
    },
    data: postData
  };
};
