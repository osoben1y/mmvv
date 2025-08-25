import { memo, type FC } from "react";

interface Props {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: string;
  count?: number;
}

const Skeleton: FC<Props> = ({
  className = "",
  width,
  height,
  rounded = "rounded-md",
  count = 1,
}) => {
  const style = {
    width: width,
    height: height,
  };

  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`bg-gray-300 dark:bg-gray-700 animate-pulse ${rounded} ${className}`}
      style={style}
    />
  ));

  return <>{skeletons}</>;
};

export default memo(Skeleton);