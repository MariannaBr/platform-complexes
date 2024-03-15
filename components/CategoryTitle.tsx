import React from "react";

type PropType = {
  title: string;
};

const CategoryTitle: React.FC<PropType> = ({ title }) => {
  return <h3 className="text-xl font-semibold mt-10">{title}</h3>;
};

export default CategoryTitle;
