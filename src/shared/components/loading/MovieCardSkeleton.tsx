import { memo, type FC } from "react";
import Skeleton from "./Skeleton";

interface Props {
  count?: number;
}

const MovieCardSkeleton: FC<Props> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex flex-col">
          <Skeleton
            className="mb-2 w-full aspect-[2/3]"
            rounded="rounded-xl"
          />
          <Skeleton className="h-5 w-3/4 mb-1" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
};

export default memo(MovieCardSkeleton);