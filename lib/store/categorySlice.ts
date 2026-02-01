import { CategoryId } from "@/types/races";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  selectedCategory: CategoryId | null;
}

const initialState: CategoryState = {
  selectedCategory: null, // null means "all categories"
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryId | null>) => {
      state.selectedCategory = action.payload;
    },
    clearCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

export const { setCategory, clearCategory } = categorySlice.actions;

// Selector
export const selectCategory = (state: { category: CategoryState }) =>
  state.category.selectedCategory;

export default categorySlice.reducer;
