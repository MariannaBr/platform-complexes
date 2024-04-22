import React from "react";
import UnitCount from "./UnitCount";

type PropType = {
  title: string;
  unitCount?: number;
};

const CategoryTitle: React.FC<PropType> = ({ title, unitCount }) => {
  return (
    <div className="md:flex mt-10 mb-6 items-baseline">
      <h3 className={`text-xl font-semibold ${unitCount && "mr-4"}`}>
        {title}
      </h3>
      {unitCount && <UnitCount count={unitCount} />}
    </div>
  );
};

export default CategoryTitle;
