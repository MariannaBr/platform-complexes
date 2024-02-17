import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

// mine token
// mapboxgl.accessToken =
//   "pk.eyJ1IjoibWFyaWFubmFiciIsImEiOiJjbHNwNjFpbzAwbXh5MnFtcjRhNDZ4dXR6In0.TAwVve-HQ72yu4Vnl_i_EA";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyaWFubmFiciIsImEiOiJjbHNwNjFpbzAwbXh5MnFtcjRhNDZ4dXR6In0.TAwVve-HQ72yu4Vnl_i_EA";

const Marker = ({ onClick, children, feature }) => {
  const _onClick = () => {
    onClick(feature.properties.description);
  };

  return (
    <button onClick={_onClick} className="marker">
      {children}
    </button>
  );
};

const Map: React.FC<{ complexes }> = ({ complexes }) => {
  const mapContainerRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-122.3968239, 37.7580916],
      zoom: 12,
    });

    // Render custom marker components
    complexes.forEach((complex) => {
      // Create a React ref
      const ref = React.createRef();
      // Create a new DOM node and save it to the React ref
      ref.current = document.createElement("div");
      // Render a Marker Component on our new DOM node
      createRoot(ref.current).render(
        <Marker onClick={markerClicked} feature={complex} />
      );

      // Create a Mapbox Marker at our new DOM node
      new mapboxgl.Marker(ref.current)
        .setLngLat(complex.coordinates)
        .addTo(map);
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, []);

  const markerClicked = (title) => {
    window.alert(title);
  };

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
