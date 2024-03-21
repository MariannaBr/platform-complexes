import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import ButtonIcon from "./ButtonIcon";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import { faHeart, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { titleSave, titleSaved } from "../lib/defaults";
import { getLocalStorageFavorites, getIsFavorite } from "../lib/functions";

type PropType = {
  id: string;
  title: string;
  placeId?: string;
  rating?: string;
  rateCount?: number;
};

const HeaderComplex: React.FC<PropType> = ({
  id,
  title,
  placeId,
  rating,
  rateCount,
}) => {
  const [favorites, setFavorites] = useState(getLocalStorageFavorites());
  const [isFavorite, setIsFavorite] = useState<boolean>(getIsFavorite(id));
  const [icon, setIcon] = useState<IconDefinition>(faHeartReg);
  const [titleButton, setTitle] = useState<string>(titleSave);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIcon(getIsFavorite(id) ? faHeart : faHeartReg);
    setTitle(getIsFavorite(id) ? titleSaved : titleSave);
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    // Check on mount and on resize
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

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
    <div className="py-4 md:py-6 max-w-7xl px-6 xl:px-0 mx-auto">
      {!isMobile && (
        <div className="hidden sm:flex sm:items-center sm:justify-between">
          <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-x-4 text-xs">
            <h1 className="text-2xl font-bold leading-7 text-gray-900">
              {title}
            </h1>
            <Rating placeId={placeId} rating={rating} rateCount={rateCount} />
          </div>
          <div className="flex">
            <ButtonIcon
              onClick={saveFavorite}
              iconName={icon}
              title={titleButton}
            />
          </div>
        </div>
      )}

      {isMobile && (
        <div className="sm:hidden flex items-center justify-between gap-x-4 text-xs">
          <h1 className="text-2xl font-bold leading-7 text-gray-900">
            {title}
          </h1>
          <ButtonIcon
            onClick={saveFavorite}
            iconName={icon}
            title={titleButton}
          />
        </div>
      )}
      {isMobile && (
        <div className="sm:hidden text-xs">
          <Rating placeId={placeId} rating={rating} rateCount={rateCount} />
        </div>
      )}
    </div>
  );
};

export default HeaderComplex;
