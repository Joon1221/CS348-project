import { FormControlLabel, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

const MatEdit = () => {
  return (
    <FormControlLabel
      control={
        <IconButton>
          <Delete />
        </IconButton>
      }
    />
  );
};

export const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "course", headerName: "Course Code", width: 250 },
  {
    field: "delete",
    headerName: "Delete",
    sortable: false,
    width: 140,
    renderCell: (params) => {
      return (
        <div style={{ cursor: "pointer" }}>
          <MatEdit index={params.row.id} />
        </div>
      );
    },
  },
];
