import { TProduct } from "../models/TProduct";
import { getFormattedPrice } from "../services/utils/getFormattedPrice";

type TProductCardProps = {
  productData: TProduct;
};

const ProductCard = ({ productData }: TProductCardProps) => {
  return (
    <div className="flex flex-col gap-5 p-3 border-solid border-2 border-sky-500 rounded-md">
      <h3 className="text-3xl font-bold text-center">
        {productData.brand ?? "Бренд не указан"}
      </h3>
      <p className="grow">{productData.product}</p>
      <span className="block text-3xl font-bold text-center">
        {getFormattedPrice(productData.price)}
      </span>
      <span className="block text-xs text-right">
        {productData.id}
      </span>
    </div>
  );
};

export default ProductCard;
