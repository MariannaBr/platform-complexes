import React from "react";

type PropType = {
  amenities?: string[];
};

const ListAmenities: React.FC<PropType> = ({ amenities }) => {
  return (
    <div className="mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 lg:mx-0">
      {amenities &&
        amenities.map((amenity, index) => (
          <ul key={index} role="list" className="">
            <li>
              <div className="flex items-center gap-x-3">
                <div className="h-2 w-2 rounded-full bg-pink-600" />
                {amenity}
              </div>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default ListAmenities;
