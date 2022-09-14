import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./HomeScoreboard.css";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "NO",
    sortable: false,
    disableColumnMenu: true,
    width: 80,
    align: "center",
    headerAlign: "center",
    headerClassName: "header",
  },
  {
    field: "points",
    headerName: "Points",
    disableColumnMenu: true,
    flex: 1,
    align: "center",
    headerAlign: "center",
    headerClassName: "header",
  },
  {
    field: "username",
    headerName: "Username",
    flex: 1,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    headerClassName: "header",
  },
];

const rows = [
  { id: 1, points: "255", username: "Jon" },
  { id: 2, points: "210", username: "Cersei" },
  { id: 3, points: "205", username: "Jaime" },
  { id: 4, points: "190", username: "Arya" },
  { id: 5, points: "185", username: "Daenerys" },
  { id: 6, points: "180", username: "misiaczek" },
  { id: 7, points: "160", username: "Ferrara" },
  { id: 8, points: "140", username: "Rossini" },
  { id: 9, points: "125", username: "Harvey" },
];

export const HomeScoreboard = () => {
  return (
    <div className="home-layout__scoreboard">
      <h1>Scoreboard</h1>
      <Box
        sx={{
          height: 330,
          width: "auto",
          maxWidth: "400px",
          border: "3px solid #402F21",
          borderRadius: "5px",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          disableColumnFilter={true}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
};
