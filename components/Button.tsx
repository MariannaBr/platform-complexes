import React from "react";

type PropType = {
  buttonColor: string;
  title: string;
  link: string;
};

const Button: React.FC<PropType> = ({ buttonColor, title, link }) => {
  return (
    <a
      href={link}
      className={`rounded-md px-1 py-1 lg:px-3 lg:py-2 font-semibold focus-visible:outline focus-visible:outline-2
       focus-visible:outline-offset-2 ${buttonColor}`}
    >
      {title}
    </a>
  );
};

export default Button;
