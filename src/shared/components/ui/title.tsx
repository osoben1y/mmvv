import { memo, type FC } from "react";

interface Props {
  text: string;
  className?: string;
}

const Title: FC<Props> = ({ text, className }) => {
  return <h1 className={`font-medium text-[20px] ${className}`}>{text}</h1>;
};

export default memo(Title);
