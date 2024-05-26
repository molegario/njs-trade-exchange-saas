"use client";

import qs from "query-string";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {

  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentCategoryId = searchParams.get("categoryId");

  useEffect(
    () => {
      const url = qs.stringifyUrl({
        url: pathname,
        query: {
          title: debouncedValue,
          categoryId: currentCategoryId,
        },
      }, {
        skipNull: true,
        skipEmptyString: true,
      });
      router.push(url);
    },
    [
      debouncedValue, currentCategoryId, pathname, router,
    ]
  );

  return <div className="relative">
    <Search className="h-4 w-4 absolute top-3 left-3 text-slate-200"/>
    <Input
      placeholder="Search posts..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="pl-8"
    />
  </div>;
};

export default SearchInput;