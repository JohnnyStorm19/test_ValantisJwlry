import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { getRequestConfig } from "../services/api/requestApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addFilteredProducts, clearFilteredProducts, disableFetch } from "../store/filterSlice";
import { TError } from "../models/TError";


const getInputValue = (value: string | number) => {
  let currentValue;
  if (typeof value === "number") {
    currentValue = Number(Number(value).toFixed(1));
  }
  if (typeof value === "string") {
    currentValue = value.trim();
  }
  return currentValue;
}


export const useFilterProducts = () => {
  const dispatch = useAppDispatch();
  const activeSelect = useAppSelector((state) => state.filter.currentFilter);
  const selectedValue = useAppSelector(
    (state) => state.filter.currentInputValue
  );
  const goFetch = useAppSelector((state) => state.filter.goFetch);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<TError>({
    isError: false,
    errorObj: null,
  });

  const fetchIdsByFilter = useCallback(async () => {
    const controller = new AbortController();
    const requestConfig = getRequestConfig({
      method: "POST",
      postData: {
        action: "filter",
        params: {
          // [activeSelect]: activeSelect === "price" ? formattedNumber : selectedValue.trim() as string
          [activeSelect]: getInputValue(selectedValue)
        },
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
  }, [activeSelect, selectedValue]);

  const fetchProductsByIds = useCallback(
    async (arrayOfIds: string[]) => {
      const requestConfig = getRequestConfig({
        method: "POST",
        postData: {
          action: "get_items",
          params: { ids: arrayOfIds },
        },
      });
      try {
        const response = await axios(requestConfig);
        dispatch(
          addFilteredProducts({ filteredProducts: response.data.result })
        );
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          (error.response?.status === 400 || error.response?.status === 500)
        ) {
          setError({ isError: true, errorObj: error });
          console.log("error status 500!");
        }
      }
    },
    [dispatch]
  );

  const fetchProductsByFilter = useCallback(async () => {
    setError({ isError: false, errorObj: null });
    setLoading(true);
    try {
      const ids = await fetchIdsByFilter();
      dispatch(disableFetch());
      if (ids.length > 0) {
        await fetchProductsByIds(ids);
        return;
      }
      dispatch(clearFilteredProducts())
    } catch (error) {
      handleFetchError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  }, [fetchIdsByFilter, fetchProductsByIds, dispatch]);

  const handleFetchError = (error: AxiosError) => {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      setError({ isError: true, errorObj: error });
    }
  };

  const refetchOnError = () => {
    fetchProductsByFilter();
  };

  useEffect(() => {
    if (activeSelect === "none") {
      dispatch(clearFilteredProducts());
      return;
    }
    if (goFetch) {
      fetchProductsByFilter();
    }
  }, [activeSelect, fetchProductsByFilter, dispatch, goFetch]);

  return { loading, error, refetchOnError };
};
