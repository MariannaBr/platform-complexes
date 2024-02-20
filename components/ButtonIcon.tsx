import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PropType = {
  iconName: any;
  color: string;
  title: string;
};

const ButtonIcon: React.FC<PropType> = ({ iconName, color, title }) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center rounded-md px-3 py-2 text-sm text-black font-semibold hover:bg-${color}-500`}
    >
      <FontAwesomeIcon icon={iconName} className="w-6 h-6 text-black pr-2" />
      <span className="text-base font-medium underline">{title}</span>
    </button>
  );
};

export default ButtonIcon;
