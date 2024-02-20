import React, { useState, useEffect, useCallback } from "react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton, NextButton } from "./CarouselArrows";

type PropType = {
  images: string[];
  options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = (props) => {
  const { images, options } = props;
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
    <>
      <div className="embla flex">
        <div className="flex items-center left-4">
          <PrevButton
            className="text-pink-600 cursor-pointer z-10 justify-center w-12 h-12 disabled:opacity-30"
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
          />
        </div>
        <div className="relative w-full embla__viewport mr-4" ref={emblaRef}>
          <div className="embla__container">
            {images.map((image, index) => (
              <div className="embla__slide" key={index}>
                <img
                  className="embla__slide__img aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  src={image}
                  alt="Your alt text"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center left-4">
          <NextButton
            className="text-pink-600 disabled:opacity-30 cursor-pointer z-10 justify-center w-12 h-12"
            onClick={scrollNext}
            disabled={nextBtnDisabled}
          />
        </div>
      </div>
    </>
  );
};

export default Carousel;
