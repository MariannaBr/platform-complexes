import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import labels from "../lib/featuresLabels.json";
import { ComplexProps } from "./Complex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const Table: React.FC<{ complexes: ComplexProps[] }> = ({ complexes }) => {
  const defaultColDef = useMemo(() => {
    return {
      wrapHeaderText: true,
      autoHeaderHeight: true,
    };
  }, []);

  let rows = [];
  for (var feature in labels) {
    if (feature !== "amenity") {
      let row = {};
      complexes.map((complex) => {
        row[labels["amenity"]] = labels[feature];
        row[complex["title"]] = complex[feature];
      });
      rows.push(row);
    }
  }
  const [rowData, setRowData] = useState(rows);

  //   complexes.map((complex) => {
  //       let row = {};
  //       for (var feature in complex) {
  //         if (labels[feature]) {
  //           row[labels[feature]] = complex[feature];
  //         }
  //       }
  //       rows.push(row);
  //     });

  let columns = [];
  const firstColumn = {
    field: labels["amenity"],
  };
  columns.push(firstColumn);
  complexes.map((complex) => {
    let column = {};
    column = {
      field: complex["title"],
      cellDataType: "boolean",
      width: 154,
      headerClass: "custom_header",
      cellStyle: { textAlign: "center" },
      cellRenderer: (params) => {
        return params.value ? (
          <FontAwesomeIcon icon={faCheck} className="check_true" />
        ) : (
          <FontAwesomeIcon icon={faXmark} className="check_false" />
        );
      },
    };
    columns.push(column);
  });
  const [colDefs, setColDefs] = useState(columns);

  //   for (var label in labels) {
  //     if (label === "title") {
  //       column = { field: labels[label], width: 160 };
  //     } else if (label === "rating") {
  //       column = { field: labels[label], width: 100 };
  //     } else {
  //       column = { field: labels[label], width: 80 };
  //     }
  //     columns.push(column);
  //   }

  return (
    <div className=" mx-6 my-20">
      <div className="ag-theme-quartz" style={{ height: 870 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};

export default Table;
