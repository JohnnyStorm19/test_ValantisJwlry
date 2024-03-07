import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changeCurrentFilter,
  changeInputFilterValue,
  clearFilteredProducts,
  goFetchFilteredProducts,
} from "../../store/filterSlice";
import MyInput from "../UI/MyInput";

const selectOptions = [
  { value: "price", text: "price" },
  { value: "brand", text: "brand" },
  { value: "product", text: "description" },
  { value: "none", text: "no filter" },
];

const SelectFilter = () => {
  const inputFilterValue = useAppSelector(
    (state) => state.filter.currentInputValue
  );
  const activeFilter = useAppSelector((state) => state.filter.currentFilter);

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeCurrentFilter({ currentFilter: e.currentTarget.value }));
    dispatch(changeInputFilterValue({ currentInputValue: '' }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    dispatch(goFetchFilteredProducts());
    dispatch(clearFilteredProducts())
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
    changeInputFilterValue({currentInputValue: e.currentTarget.value.trim()})
    );
  };

  return (
    <form className="flex gap-3 items-center" onSubmit={submitHandler}>
      <label className="font-bold" htmlFor="filter-select">
        Filter by
      </label>
      <select
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
        id="filter-select"
        value={activeFilter}
        onChange={handleChange}
      >
        {selectOptions.map((opt) => {
          return (
            <option key={opt.value} value={opt.value}>
              {opt.text}
            </option>
          );
        })}
      </select>

      {activeFilter != "none" && (
        <>
          <MyInput activeFilter={activeFilter} handleInputChange={handleInputChange} inputFilterValue={inputFilterValue} />
          <button className="paginate-btn">ok</button>
        </>
      )}
    </form>
  );
};

export default SelectFilter;
