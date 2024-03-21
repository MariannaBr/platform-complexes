import React, { PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PropType = {
  onClick: () => void;
  iconName: any;
  title: string;
};

const ButtonIcon: React.FC<PropType> = ({ onClick, iconName, title }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-none inline-flex items-center rounded-md bg-white sm:px-2 py-1.5 font-semibold text-black
       hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
      focus-visible:outline-gray-200`}
    >
      <FontAwesomeIcon
        icon={iconName}
        className="w-4 h-4 sm:w-6 sm:h-6 text-black pr-2"
      />
      <span className="text-sm sm:text-base font-medium underline">
        {title}
      </span>
    </button>
  );
};

export default ButtonIcon;
