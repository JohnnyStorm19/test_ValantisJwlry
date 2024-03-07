import { TFilter } from "../../models/TFilter";

type TMyInputProps = {
    activeFilter: TFilter;
    inputFilterValue: string | number;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyInput = (props: TMyInputProps) => {

  return (
    <input
      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
      value={props.inputFilterValue}
      onChange={props.handleInputChange}
      type={`${props.activeFilter === "price" ? "number" : "text"}`}
      required
      placeholder={`${
        props.activeFilter === "price"
          ? "add price number..."
          : props.activeFilter === "brand"
          ? "add brand title..."
          : props.activeFilter === "product"
          ? "add product description..."
          : ""
      }`}
    />
  );
};

export default MyInput;
