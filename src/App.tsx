import { useEffect, useMemo, useState } from "react";
import { TProduct } from "./models/TProduct";
import { useFetchProducts } from "./hooks/useFetchProducts";
import ProductCardsList from "./components/ProductCardsList";
import Header from "./components/Header";
import Pagination from "./components/UI/Pagination";
import Error from "./components/Error";
import Loader from "./components/Loader";
import { useAppSelector } from "./store/hooks";
import { useFilterProducts } from "./hooks/useFilterProducts";

const App = () => {
  const filteredProducts = useAppSelector(
    (state) => state.filter.filteredProducts
  );
  const currentFilter = useAppSelector((state) => state.filter.currentFilter);
  const [offset, setOffset] = useState(0);
  const limit: number = 50;

  const { products, loading, error, refetchOnError } = useFetchProducts({
    offset,
    limit,
  });
  const {
    loading: loadingFilter,
    error: errorFilter,
    refetchOnError: refetchOnFilterError,
  } = useFilterProducts();

  const uniqueProducts = useMemo(() => {
    if (filteredProducts.length >= 0 && currentFilter != "none") {
      setOffset(0);

      const temp: TProduct[] = [];
      filteredProducts.forEach((product) => {
        const inTemp = temp.find(
          (tempProduct) => tempProduct.id === product.id
        );
        if (inTemp) return;

        temp.push(product);
      });
      return temp;
    }

    if (filteredProducts.length === 0 && currentFilter === "none") {
      const temp: TProduct[] = [];
      products.forEach((product) => {
        const inTemp = temp.find(
          (tempProduct) => tempProduct.id === product.id
        );
        if (inTemp) return;

        temp.push(product);
      });
      return temp;
    }
  }, [products, filteredProducts, currentFilter]);

  return (
    <div className="p-5">
      <Header />
      {error.isError && error.errorObj && (
        <Error errorObj={error.errorObj} refetchOnError={refetchOnError} />
      )}
      {errorFilter.isError && errorFilter.errorObj && (
        <Error
          errorObj={errorFilter.errorObj}
          refetchOnError={refetchOnFilterError}
        />
      )}

      {(loading || loadingFilter) && <Loader />}

      {uniqueProducts && uniqueProducts.length > 0 && filteredProducts.length === 0 && (
        <>
          <ProductCardsList products={uniqueProducts} />
          <Pagination
            handleOffset={setOffset}
            isLoading={loading}
            isError={error.isError}
          />
        </>
      )}
      {filteredProducts.length >= 0 &&
        uniqueProducts &&
        uniqueProducts.length >= 0 &&
        currentFilter != "none" && (
          <>
            <h3 className="underline font-bold mb-4">
              Найдено товаров: {uniqueProducts.length}
            </h3>
            <ProductCardsList products={uniqueProducts} />
          </>
        )}
    </div>
  );
};

export default App;
