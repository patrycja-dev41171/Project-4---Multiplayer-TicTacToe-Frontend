import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../../redux-toolkit/store";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./HomeScoreboard.css";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "NO",
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

export const HomeScoreboard = () => {
  const { scoreboard } = useSelector((store: StoreState) => store.user);
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
          rows={scoreboard}
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
