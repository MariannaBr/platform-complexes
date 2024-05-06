import React, { useState, useEffect, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import labels from "../lib/featuresLabels.json";
import { ComplexProps } from "./Complex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import TableHeader from "./TableHeader";
import EmptyTableOverlay from "./EmptyTableOverlay";

const Table: React.FC<{ complexes: ComplexProps[] }> = ({ complexes }) => {
  const defaultColDef = useMemo(() => {
    return {
      wrapHeaderText: true,
      minWidth: 152,
    };
  }, []);

  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);

  // create rows
  useEffect(() => {
    if (complexes && complexes.length > 0) {
      let rows = [];
      for (var feature in labels) {
        if (feature !== "amenity") {
          let row = { [labels["amenity"]]: labels[feature] };
          complexes.forEach((complex) => {
            row[complex["title"]] = complex[feature];
          });
          rows.push(row);
        }
      }
      setRowData(rows);
    }
  }, [complexes]);

  // create columns
  useEffect(() => {
    if (complexes && complexes.length > 0) {
      let columns = [
        {
          field: labels["amenity"],
          minWidth: 210,
          pinned: "left",
        },
      ];
      complexes.forEach((complex) => {
        let column = {
          field: complex["title"],
          sortable: true,
          headerComponentParams: { link: `/${complex.slug}` },
          cellDataType: "text",
          minWidth: 152,
          pinned: "no",
          headerClass: "custom_header",
          cellStyle: { textAlign: "center" },
          cellRenderer: (params) => {
            if (typeof params.value === "boolean") {
              return params.value ? (
                <FontAwesomeIcon icon={faCheck} className="check_true" />
              ) : (
                <FontAwesomeIcon icon={faXmark} className="check_false" />
              );
            }
            return params.value;
          },
        };
        columns.push(column);
      });
      setColDefs(columns);
    }
  }, [complexes]);

  // create custom header
  const components = useMemo(() => {
    return {
      agColumnHeader: TableHeader,
    };
  }, []);

  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      // Wait for the next tick to ensure AG Grid has processed the row data
      setTimeout(() => {
        gridRef.current.api.sizeColumnsToFit();
      });
    }
  }, [rowData]);

  const noRowsOverlayComponent = useMemo(() => {
    return EmptyTableOverlay;
  }, []);

  return (
    <div className="ag-theme-quartz max-h-screen" style={{ height: "80vh" }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs}
        components={components}
        defaultColDef={defaultColDef}
        noRowsOverlayComponent={noRowsOverlayComponent}
      />
    </div>
  );
};

export default Table;
