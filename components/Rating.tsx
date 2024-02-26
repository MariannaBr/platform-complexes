import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";

type PropType = {
  placeId: string;
  rating: string;
  rateCount: number;
};

const Rating: React.FC<PropType> = ({ placeId, rating, rateCount }) => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      className="flex self-center ml-10 font-medium text-gray-600 hover:bg-gray-100 p-1 rounded-md"
      href={`https://search.google.com/local/reviews?placeid=${placeId}`}
    >
      <span>
        <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
      </span>
      <span className="px-1">{rating}</span>
      <span>({rateCount})</span>
    </a>
  );
};

export default Rating;
