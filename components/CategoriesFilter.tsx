"use client";
import { CATEGORY_IDS, CategoryId } from "@/types/races";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setCategory,
  clearCategory,
  selectCategory,
} from "@/lib/store/categorySlice";
import { FilterChip } from "./FilterChip";

export function CategoriesFilter() {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(selectCategory);

  const handleCategoryClick = (categoryId: CategoryId) => {
    if (selectedCategory === categoryId) {
      dispatch(clearCategory());
    } else {
      dispatch(setCategory(categoryId));
    }
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide items-center">
      <span className="text-text-secondary">Categories:</span>
      <FilterChip
        onClick={() => dispatch(clearCategory())}
        isSelected={selectedCategory === null}
      >
        All
      </FilterChip>

      {Object.entries(CATEGORY_IDS).map(([key, categoryId]) => {
        return (
          <FilterChip
            key={categoryId}
            onClick={() => handleCategoryClick(categoryId)}
            isSelected={selectedCategory === categoryId}
          >
            {key.replace("_", " ")}
          </FilterChip>
        );
      })}
    </div>
  );
}
