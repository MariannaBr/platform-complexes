import React from "react";

const EmptyTableOverlay = (props) => {
  return (
    <div className="relative isolate overflow-hidden py-24 sm:rounded-3xl sm:px-24 xl:py-32">
      <p className="mx-auto mb-8 max-w-2xl text-center text-lg font-bold tracking-tight text-black sm:text-2xl">
        To compare apartment communities, you need to add some to your
        favorites.
      </p>
    </div>
  );
};

export default EmptyTableOverlay;
