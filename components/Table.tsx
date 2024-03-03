import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import labels from "../lib/featuresLabels.json";
import { ComplexProps } from "./Complex";

const Table: React.FC<{ complexes: ComplexProps[] }> = ({ complexes }) => {
  let rows = [];
  complexes.map((complex) => {
    let row = {};
    for (var feature in complex) {
      console.log(feature, feature.length);
      if (labels[feature]) {
        row[labels[feature]] = complex[feature];
      }
    }
    rows.push(row);
  });
  const [rowData, setRowData] = useState(rows);

  let columns = [];
  let column = {};
  for (var label in labels) {
    column = { field: labels[label] };
    columns.push(column);
  }
  const [colDefs, setColDefs] = useState(columns);

  return (
    <div>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
};

export default Table;
