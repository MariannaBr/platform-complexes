import React, { useState, useEffect, useCallback } from "react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton, NextButton } from "./CarouselArrows";
import Apartment, { ApartmentProps } from "./Apartment";

type PropType = {
  images?: string[];
  options?: EmblaOptionsType;
  apartments?: ApartmentProps[];
  complexTitle?: string;
};

const Carousel: React.FC<PropType> = (props) => {
  const { images, options, apartments, complexTitle } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="embla">
      <div className="relative">
        <PrevButton
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          aria-label="next"
        />
      </div>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images &&
            images.length > 0 &&
            images.map((image, index) => (
              <div className="embla__slide" key={index}>
                <img className="embla__slide__img" src={image} alt="Amenity" />
              </div>
            ))}
          {apartments &&
            apartments.length > 0 &&
            apartments.map((apartment, index) => (
              <div className="embla__slide" key={index}>
                <div className="">
                  <Apartment
                    apartment={apartment}
                    complexTitle={complexTitle}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="relative">
        <NextButton
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          aria-label="previous"
        />
      </div>
    </div>
  );
};

export default Carousel;
