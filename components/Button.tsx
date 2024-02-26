import React from "react";

type PropType = {
  color: string;
  title: string;
  link: string;
};

const Button: React.FC<PropType> = ({ color, title, link }) => {
  return (
    <a
      href={link}
      className={`rounded-md bg-${color}-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-${color}-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${color}-600`}
    >
      {title}
    </a>
  );
};

export default Button;
