import { useCallback, useEffect, useState } from "react";
import { getRequestConfig } from "../services/api/requestApi";
import axios, { AxiosError } from "axios";
import { TProduct } from "../models/TProduct";
import { TError } from "../models/TError";

type THookProps = {
  offset: number;
  limit: number;
};

export const useFetchProducts = ({ offset, limit }: THookProps) => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<TError>({ isError: false, errorObj: null });

  const fetchIds = useCallback(async () => {
    const controller = new AbortController();
    const requestConfig = getRequestConfig({
      method: "POST",
      postData: {
        action: "get_ids",
        params: { offset, limit },
      },
    });
    try {
      const response = await axios({
        ...requestConfig,
        signal: controller.signal,
      });
      return response.data.result;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        (error.response?.status === 400 || error.response?.status === 500)
      ) {
        setError({ isError: true, errorObj: error });
        console.log("error status 500!");
      }
      console.log("error obj: ", error);
    }
  }, [limit, offset]);

  const fetchProductsByIds = async (arrayOfIds: string[]) => {
    const requestConfig = getRequestConfig({
      method: "POST",
      postData: {
        action: "get_items",
        params: { ids: arrayOfIds },
      },
    });
    try {
      const response = await axios(requestConfig);
      setProducts(response.data.result);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        (error.response?.status === 400 || error.response?.status === 500)
      ) {
        setError({ isError: true, errorObj: error });
        console.log("error status 500!");
      }
    } 
  };

  const fetchData = useCallback(async () => {
    setError({ isError: false, errorObj: null });
    setLoading(true);
    try {
      const ids = await fetchIds();
      if (ids.length > 0) {
        await fetchProductsByIds(ids);
      }
    } catch (error) {
      handleFetchError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  }, [fetchIds]);

  const handleFetchError = (error: AxiosError) => {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      setError({ isError: true, errorObj: error });
    }
  };

  const refetchOnError = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { products, loading, error, refetchOnError };
};