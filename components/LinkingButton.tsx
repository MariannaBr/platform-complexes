import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

type PropType = {
  link: string;
  linkTitle: string;
};

const LinkingButton: React.FC<PropType> = ({ link, linkTitle }) => {
  return (
    <a href={link} target="_blank">
      <button
        type="button"
        className="inline-flex items-center rounded mx-3 px-3 py-2 text-sm font-semibold shadow-lg text-pink-600 ring-1 ring-inset ring-pink-600 hover:bg-gray-100"
      >
        {linkTitle}
        <FontAwesomeIcon
          icon={faArrowRight}
          className="lg:hidden w-6 h-6 pl-2"
        />
      </button>
    </a>
  );
};

export default LinkingButton;
