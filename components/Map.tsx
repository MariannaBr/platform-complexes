import mapboxgl from "mapbox-gl";
import React, { useState, useEffect, useRef } from "react";
//import { createRoot } from "react-dom/client";

// mine token
// mapboxgl.accessToken =
//   "pk.eyJ1IjoibWFyaWFubmFiciIsImEiOiJjbHNwNjFpbzAwbXh5MnFtcjRhNDZ4dXR6In0.TAwVve-HQ72yu4Vnl_i_EA";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyaWFubmFiciIsImEiOiJjbHNwNjFpbzAwbXh5MnFtcjRhNDZ4dXR6In0.TAwVve-HQ72yu4Vnl_i_EA";

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
      center: [-122.3968239, 37.7580916],
      zoom: 14,
    });

    // Create markers
    complexes.map((complex) =>
      new mapboxgl.Marker({
        color: "#E31C5F",
        draggable: false,
      })
        .setPopup(
          new mapboxgl.Popup().setText(
            "Construction on the Washington Monument began in 1848."
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
      className="absolute top-24 bottom-0 right-0 w-1/2"
      ref={mapContainerRef}
    />
  );
};

export default Map;
