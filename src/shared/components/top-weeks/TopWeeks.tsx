import { memo } from "react";
import Title from "../ui/title";
import ShowAll from "../ui/showAll";

const TopWeeks = () => {
  return (
    <div className="container mt-[50px]">
      <div className="flex justify-between">
        <Title className="text-white" text="На неделе" />
        <ShowAll text="Показать все" />
      </div>
    </div>
  );
};

export default memo(TopWeeks);
