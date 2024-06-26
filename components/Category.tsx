import React from "react";
import CategoryTitle from "./CategoryTitle";
import Carousel from "./Carousel";
import ListAmenities from "./ListAmenities";
import { EmblaOptionsType } from "embla-carousel";
import { ApartmentProps } from "./Apartment";

type PropType = {
  title?: string;
  images?: string[];
  amenities?: string[];
  apartments?: ApartmentProps[];
  isFavorite?: boolean;
};

const Category: React.FC<PropType> = ({
  title,
  images,
  amenities,
  apartments,
  isFavorite,
}) => {
  const OPTIONS: EmblaOptionsType = { loop: false, slidesToScroll: "auto" };

  return (
    <div>
      <CategoryTitle
        title={title}
        unitCount={apartments && apartments.length}
      />
      {((images && images.length > 0) ||
        (apartments && apartments.length > 0)) && (
        <Carousel
          images={images}
          options={OPTIONS}
          apartments={apartments}
          isFavorite={isFavorite}
        />
      )}
      <ListAmenities amenities={amenities} />
    </div>
  );
};

export default Category;
