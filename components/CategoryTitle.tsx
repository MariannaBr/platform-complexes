import React from "react";

type PropType = {
  title: string;
};

const CategoryTitle: React.FC<PropType> = ({ title }) => {
  return <div className="text-xl font-semibold mt-10">{title}</div>;
};

export default CategoryTitle;
