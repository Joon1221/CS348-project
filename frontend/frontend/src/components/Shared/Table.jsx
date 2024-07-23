import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./columns";

export default function Table({ rows, setSelectedCourse, setOpen }) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      onCellClick={(e) => {
        setSelectedCourse(e.row.course);
        setOpen(true);
      }}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection={false}
      disableMultipleRowSelection
      style={{ height: "85%", width: "100%" }}
    />
  );
}
