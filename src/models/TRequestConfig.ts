import { TAction } from "./TAction";
import { TProduct } from "./TProduct";

export type TFetchParams = {
  price?: number;
  field?: keyof TProduct;
  offset?: number;
  limit?: number;
  ids?: string[];
  brand?: string;
  product?: string;
};
export type TRequestConfig = {
  method: "POST";
  postData: {
    action: TAction;
    params?: TFetchParams
  };
};
