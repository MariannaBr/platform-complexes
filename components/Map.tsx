import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

// mine token
// mapboxgl.accessToken =
//   "pk.eyJ1IjoibWFyaWFubmFiciIsImEiOiJjbHNwNjFpbzAwbXh5MnFtcjRhNDZ4dXR6In0.TAwVve-HQ72yu4Vnl_i_EA";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyaWFubmFiciIsImEiOiJjbHNwNjFpbzAwbXh5MnFtcjRhNDZ4dXR6In0.TAwVve-HQ72yu4Vnl_i_EA";

const Map: React.FC = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div ref={mapContainerRef} className="flex h-full" />
    </div>
  );
};

export default Map;
