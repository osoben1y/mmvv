import { ArrowRight } from "lucide-react";
import { memo, type FC } from "react";

interface Props {
  text: string;
  className?: string;
}

const ShowAll: FC<Props> = ({ text, className }) => {
  return (
    <button
      className={`flex items-center gap-1 text-[#C61F1F] cursor-pointer hover:opacity-80 ${className}`}
    >
      <span>{text}</span>
      <ArrowRight className="w-4 h-4" />
    </button>
  );
};

export default memo(ShowAll);
