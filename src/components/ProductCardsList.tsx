import { TProduct } from "../models/TProduct"
import ProductCard from "./ProductCard"

type TProductsListProps = {
  products: TProduct[];
}

const ProductCardsList = ({products}: TProductsListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
      {products.map(productData => <ProductCard key={productData.id} productData={productData} />)}
    </div>
  )
}

export default ProductCardsList