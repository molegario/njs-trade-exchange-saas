import qs from 'query-string';
import { Category } from "@prisma/client";
import type { IconType } from 'react-icons';
import { FiTruck } from 'react-icons/fi';
import { FaCarSide } from "react-icons/fa";
import { 
  GiPowerGenerator,
  GiBoatPropeller,
} from 'react-icons/gi';
import { 
  MdForklift,
  MdElectricBolt,
  MdPrecisionManufacturing,
  MdRoomService
 } from 'react-icons/md';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from '@/lib/utils';

interface CategoryItemProps {
  label: string;
  value: string;
};

const iconMap: Record<Category['name'], IconType> = {
  Truck: FiTruck,
  "Heavy Equipment": MdForklift,
  Generators: GiPowerGenerator,
  "Water Based Assets": GiBoatPropeller,
  "Elec Equipment": MdElectricBolt,
  Vehicle: FaCarSide,
  Machine: MdPrecisionManufacturing,
  Service: MdRoomService,
};

const CategoryItem = ({
  label,
  value,
}: CategoryItemProps) => {

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get('categoryId');
  const currentTitle = searchParams.get('title');
  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: isSelected ? null : value,
          title: currentTitle,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    );
    router.push(url);
  };

  const Icon = iconMap[label];

  return (
    <button
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 bg-sky-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        isSelected && "border-sky-700 bg-sky-200/80 text-sky-800"
      )}
      onClick={onClick}
    >
      {
        Icon && (<Icon size={20} />)
      }
      <span className="truncate">
        {label}
      </span>
    </button>
  );
}
 
export default CategoryItem