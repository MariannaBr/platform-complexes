import mapboxgl from "mapbox-gl";
import React, { useState, useEffect, useRef } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map: React.FC<{ complexes }> = ({ complexes }) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-122.38798378427391, 37.76000116642954],
      zoom: 14,
    });

    // Create markers
    complexes.map((complex) =>
      new mapboxgl.Marker({
        color: "#db2777",
        draggable: false,
        scale: 0.9,
      })
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<a href="/${complex.slug}" class="outline-none">
              <div class="popup">
                <img class="picture"
                  src=${complex.image}
                  alt="complex overview"
                />
                <div class="picture-over"></div>
              </div>
              <div class=title-over>
                <h2 class="title">
                  ${complex.title}
                </h2>
                <div class="rating">
                <span>
                <svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                </span>
                <span class="number">
                ${complex.rating}
                </span>
               </div>
              </div>
            </a>`
          )
        )
        .setLngLat(complex.coordinates)
        .addTo(map)
    );

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <div
      className="absolute top-16 md:top-28 bottom-0 right-0 w-full h-full md:w-1/3"
      ref={mapContainerRef}
    />
  );
};

export default Map;
