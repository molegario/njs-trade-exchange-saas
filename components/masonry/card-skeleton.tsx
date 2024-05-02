import { Skeleton } from "./skeleton";

export const ContentCardSkeleton: React.FC = () => {
  return (
    <div className="flex aspect-video cursor-pointer flex-col border border-border p-3 text-center shadow-[rgba(0,0,0,0.24)_0px_3px_8px] transition-all duration-200 ease-[ease-in-out] hover:scale-105 hover:bg-accent md:text-start">
      {/* <Skeleton className="mb-4 h-10 w-full rounded-md" />
      <Skeleton className="h-3 w-3/4 self-center md:self-start" />
      <Skeleton className="mt-2.5 h-2 w-1/2 self-center md:self-start" /> */}
      <div className="mt-2.5 flex flex-col gap-1.5">
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-5/6" />
      </div>
      <Skeleton className="mt-auto h-5 w-full" />
    </div>
  );
};

export const ContentCardSkeletonList = ({ itemcount }: {itemcount: number}) => {
  return (
    <div className="w-full columns-1 md:columns-2 lg:columns-4 2xl:columns-4">
      {Array.from({ length: itemcount || 8 }).map((_, i) => (
        <ContentCardSkeleton key={i} />
      ))}
    </div>
  );
};
