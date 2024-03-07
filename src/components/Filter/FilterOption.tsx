import { useState } from "react";
import ArrowUp from "../UI/ArrowUp";
import ArrowDown from "../UI/ArrowDown";

// type TFilterOptionProps = {
//   opt: {
//     field: string;
//     name: string;
//   };
// };

type TFilterOptionProps = {
    opt: {
        field: string;
        name: string;
        value: string;
        isOpen: boolean;
    };
    openHandler: (field: string) => void;
    changeHandler: (e:React.ChangeEvent<HTMLInputElement>, field: string) => void;
  };

const FilterOption = ({ opt, openHandler, changeHandler }: TFilterOptionProps) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const arrowHandler = () => {
//     setIsOpen(!isOpen);
//   };

// const arrowHandler = () => {
//     setIsOpen(!isOpen);
//   };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between"
        onClick={() => openHandler(opt.field)}
      >
        <label htmlFor={opt.field}>
          {opt.name}
        </label>
        {opt.isOpen ? (
          <ArrowDown />
        ) : (
          <ArrowUp />
        )}
      </div>

      <input
        className={`${opt.isOpen ? 'opacity-1 visible' : 'opacity-0 invisible'} p-2 bg-gray-500 transition-all duration-150`} 
        type={`${opt.field === 'price' ? 'number' : 'search'}`}
        name={opt.field}
        id={opt.field}
        value={opt.value}
        onChange={(e) => changeHandler(e, opt.field)}
      />
    </div>
  );
};

export default FilterOption;
