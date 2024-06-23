"use client";

import { Category } from "@prisma/client";
import { cn } from "@/lib/utils";
import { 
  Truck ,
  Forklift,
  Zap,
  Factory,
  ConciergeBell,
  Ship,
  Car,
  Drill
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

interface CategoriesProps {
  categories: Category[];
}


const Categories = ({ categories }: CategoriesProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const getIcon = (category_name: string) => {
    let Icon = Truck;
    if (category_name === "Heavy Equipment") {
      Icon = Forklift;
    } else if (category_name === "Generators") {
      Icon = Zap;
    } else if (category_name === "Water Based Assets") {
      Icon = Ship;
    } else if (category_name === "Elec Equipment") {
      Icon = Drill;
    } else if (category_name === "Vehicle") {
      Icon = Car;
    } else if (category_name === "Machine") {
      Icon = Factory;
    } else if (category_name === "Service") {
      Icon = ConciergeBell;
    }
    return Icon;
  };

  const onCategoryItemClick = (categoryId: string) => {
    return (evt: { preventDefault: () => void }) => {
      evt.preventDefault();
      const isSelected = currentCategoryId === categoryId;
      console.log("CATEGORYID::", categoryId);
      const url = queryString.stringifyUrl(
        {
          url: pathname,
          query: {
            categoryId: isSelected ? null : categoryId,
            title: currentTitle,
          }
        },{
          skipNull: true,
          skipEmptyString: true
        }
      );
      router.push(url);
    };
  };

  return (
    <div className="flex items-center gap-x-2 overflow-x-hidden pb-2 flex-wrap gap-1">
      {categories.map((category) => {
        const Icon = getIcon(category.name);
        const isSelected = currentCategoryId === category.id;

        return (
          <div
            key={category.id}
            className={cn(
              "py-2 px-3 text-sm border border-slate-200 bg-sky-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
              isSelected && "border-sky-700 bg-sky-200/80 text-sky-800"
            )}
            onClick={onCategoryItemClick(category.id)}
          >
            <Icon className="h-4 w-4" />
            <span>{category?.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
