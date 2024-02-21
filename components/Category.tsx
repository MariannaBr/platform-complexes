import React from "react";
import CategoryTitle from "./CategoryTitle";
import Carousel from "./Carousel";
import ListAmenities from "./ListAmenities";
import { EmblaOptionsType } from "embla-carousel";

type PropType = {
  title: string;
  images: string[];
  amenities: string[];
};

const OPTIONS: EmblaOptionsType = { loop: true };

const Category: React.FC<PropType> = ({ title, images, amenities }) => {
  return (
    <div>
      <CategoryTitle title={title} />
      {images.length > 0 && <Carousel images={images} options={OPTIONS} />}
      <ListAmenities amenities={amenities} />
    </div>
  );
};

export default Category;
