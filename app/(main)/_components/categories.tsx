"use client";

import { Category } from "@prisma/client";
import CategoryItem from "./category-item";

interface CategoriesProps {
  categories: Category[];
}

const Categories = ({ categories }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-hidden pb-2 flex-wrap gap-1">
      {categories.map((category) => {
        return (
          <CategoryItem
            key={category.id}
            label={category.name}
            value={category.id}
          />
        );
      })}
    </div>
  );
};

export default Categories;
