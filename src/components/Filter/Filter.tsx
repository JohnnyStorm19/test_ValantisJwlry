import { useState } from "react";
import FilterOption from "./FilterOption";

const filterOptions = [
  { field: "price", name: "filter by price" },
  { field: "brand", name: "filter by brand" },
  { field: "product", name: "filter by description" },
];
const filterOptionsNew = [
  { field: "price", name: "filter by price", value: '', isOpen: false },
  { field: "brand", name: "filter by brand", value: '', isOpen: false },
  { field: "product", name: "filter by description", value: '', isOpen: false },
];

const Filter = () => {
  const [options, setOptions] = useState(filterOptionsNew);
  

  const openHandler = (field: string) => {
    const newOptions = options.map(option => {
      if(option.field === field) {
        option.isOpen = !option.isOpen;
      } else {
        option.isOpen = false;
        option.value = '';
      }
      return option;
    })
    setOptions(newOptions);
  }
  const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.currentTarget.value;
    const newOptions = options.map(option => {
      if(option.field === field) {
        option.value = value;
      }
      return option;
    })
    setOptions(newOptions);
  }


  return (
    <div className="flex gap-6 justify-center">
      {filterOptionsNew.map((opt) => {
        return (
          <FilterOption key={opt.field} opt={opt} openHandler={openHandler} changeHandler={onChangeHandler} />
        );
      })}
    </div>
  );
};

export default Filter;
