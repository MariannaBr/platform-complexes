import React from "react";

type PropType = {
  link: string;
  linkTitle: string;
};

const LinkingButton: React.FC<PropType> = ({ link, linkTitle }) => {
  return (
    <a href={link} target="_blank">
      <button
        type="button"
        className="rounded bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-lg hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
      >
        {linkTitle}
      </button>
    </a>
  );
};

export default LinkingButton;
