import React from "react";

export default (props) => {
  return (
    <div className="custom_header ag-header-cell-label">
      <a href={props.link}>{props.displayName}</a>
    </div>
  );
};
