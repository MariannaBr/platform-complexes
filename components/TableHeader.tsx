import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortDown,
  faSortUp,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

export default (props) => {
  const [ascSort, setAscSort] = useState("inactive");
  const [descSort, setDescSort] = useState("inactive");
  const [noSort, setNoSort] = useState("inactive");

  const onSortChanged = () => {
    setAscSort(props.column.isSortAscending() ? "active" : "inactive");
    setDescSort(props.column.isSortDescending() ? "active" : "inactive");
    setNoSort(
      !props.column.isSortAscending() && !props.column.isSortDescending()
        ? "active"
        : "inactive"
    );
  };

  const onSortRequested = (event) => {
    if (props.column.isSortAscending()) {
      props.setSort("desc", event.shiftKey);
    } else if (props.column.isSortDescending()) {
      props.setSort("", event.shiftKey);
    } else {
      props.setSort("asc", event.shiftKey);
    }
  };

  useEffect(() => {
    props.column.addEventListener("sortChanged", onSortChanged);
    onSortChanged();
  }, []);

  let sort = null;
  if (
    props.enableSorting &&
    (props.column.isSortAscending() || props.column.isSortDescending())
  ) {
    sort = (
      <div style={{ display: "inline-block" }}>
        <div
          onClick={(event) => onSortRequested(event)}
          onTouchEnd={(event) => onSortRequested(event)}
          className="sort_label"
        >
          {props.column.isSortAscending() && (
            <FontAwesomeIcon icon={faSortUp} className="h-3 w-3" />
          )}
          {props.column.isSortDescending() && (
            <FontAwesomeIcon icon={faSortDown} className="h-3 w-3" />
          )}
        </div>
      </div>
    );
  }

  const show = props.displayName !== "Amenity";

  return (
    <div>
      <div className="custom_header ag-header-cell-label">
        {show && (
          <a href={props.link} className="flex mr-2">
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="h-3 w-3"
            />
          </a>
        )}
        <div
          onClick={(event) => onSortRequested(event)}
          onTouchEnd={(event) => onSortRequested(event)}
          className="flex"
        >
          {props.displayName}
        </div>
        {sort}
      </div>
    </div>
  );
};
