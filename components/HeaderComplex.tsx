import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import ButtonIcon from "./ButtonIcon";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import { faHeart, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { titleSave, titleSaved } from "../lib/defaults";
import { getLocalStorageFavorites, getIsFavorite } from "../lib/localStorage";

type PropType = {
  id: string;
  title: string;
  placeId?: string;
  rating?: string;
  rateCount?: number;
  isHomepage: boolean;
};

const HeaderComplex: React.FC<PropType> = ({
  id,
  title,
  placeId,
  rating,
  rateCount,
  isHomepage,
}) => {
  const [favorites, setFavorites] = useState(getLocalStorageFavorites());
  const [isFavorite, setIsFavorite] = useState<boolean>(getIsFavorite(id));
  const [icon, setIcon] = useState<IconDefinition>(faHeartReg);
  const [titleButton, setTitle] = useState<string>(titleSave);

  useEffect(() => {
    setIcon(getIsFavorite(id) ? faHeart : faHeartReg);
    setTitle(getIsFavorite(id) ? titleSaved : titleSave);
  });

  const saveFavorite = () => {
    if (isFavorite) {
      const index = favorites.indexOf(id);
      if (index > -1) {
        favorites.splice(index, 1);
        setIsFavorite(false);
      }
    } else {
      favorites.push(id);
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIcon(icon === faHeartReg ? faHeart : faHeartReg);
    setTitle(titleButton === titleSave ? titleSaved : titleSave);
  };

  return (
    <div className="py-6 max-w-7xl mx-auto">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-x-4 text-xs">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h1>
          <Rating placeId={placeId} rating={rating} rateCount={rateCount} />
        </div>
        <div className="flex">
          {!isHomepage && (
            <ButtonIcon
              onClick={saveFavorite}
              iconName={icon}
              title={titleButton}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderComplex;
