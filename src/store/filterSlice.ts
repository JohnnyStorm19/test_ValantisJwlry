import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "../models/TProduct";
import { TFilter } from "../models/TFilter";

type TInitialState = {
  filteredProducts: TProduct[];
  currentFilter: TFilter;
  currentInputValue: string | number;
  goFetch: boolean;
};

const initialState: TInitialState = {
  filteredProducts: [],
  currentFilter: "none",
  currentInputValue: "",
  goFetch: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addFilteredProducts: (state, action) => {
      state.filteredProducts = [...action.payload.filteredProducts];
    },
    clearFilteredProducts: (state) => {
      state.filteredProducts = [];
    },
    changeInputFilterValue: (state, action) => {
      state.currentInputValue = action.payload.currentInputValue;
    },
    changeCurrentFilter: (state, action) => {
      state.currentFilter = action.payload.currentFilter;
    },
    goFetchFilteredProducts: (state) => {
      state.goFetch = true;
    },
    disableFetch: (state) => {
      state.goFetch = false;
    },
  },
});

export const {
  addFilteredProducts,
  changeCurrentFilter,
  goFetchFilteredProducts,
  changeInputFilterValue,
  disableFetch,
  clearFilteredProducts,
} = filterSlice.actions;

export default filterSlice.reducer;
