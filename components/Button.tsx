import React from "react";

type PropType = {
  color: string;
  title: string;
};

const Button: React.FC<PropType> = ({ color, title }) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center rounded-md bg-${color}-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-${color}-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${color}-600`}
    >
      {title}
    </button>
  );
};

export default Button;
