import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { modifyInstructions, selectAllRows } from "./app/rowsSlice";
import { selectWorkoutText } from "./app/searchWorkoutTextSlice";
import { selectMuscleText } from "./app/searchMuscleTextSlice";
import commandRegistry from "../CommandRegistry";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "muscle", headerName: "Muscle Group", width: 130 },
  {
    field: "exercise",
    headerName: "Workout",
    width: 200,
    renderCell: (params) => {
      return (
        <Tooltip title={params?.row.exercise}>
          <span className="table-cell-trucate">{params?.row.exercise}</span>
        </Tooltip>
      );
    },
  },
  {
    field: "instructions",
    headerName: "Instructions",
    width: 280,
    editable: true,
    renderCell: (params) => {
      return (
        <Tooltip title={params?.row.instructions}>
          <span className="table-cell-trucate">{params?.row.instructions}</span>
        </Tooltip>
      );
    },
  },
  { field: "image", headerName: "Image", width: 50 },
];

export default function DataTable() {
  const rows = useSelector(selectAllRows);
  const searchWorkoutText = useSelector(selectWorkoutText);
  const searchMuscleText = useSelector(selectMuscleText);
  const dispatch = useDispatch();

  const [displayRows, setDisplayRows] = useState(rows);

  const onEnterKeyDown = (params, event, details) => {
    // console.log(params, event, details)
    // Verify "Enter" key code
    if (event.keyCode === 13) {
      dispatch(
        modifyInstructions({
          ...params.row,
          instructions: event.target.value,
        })
      );
    }
  };

  useEffect(() => {
    // update instructions
    commandRegistry.register("updateinstruction", ({ value, exercise }) => {
      dispatch(
        modifyInstructions({
          ...rows.find((row) => row.exercise === exercise),
          instructions: value,
        })
      );
    });

    // update instruction via command
    // setTimeout(() => {
    //   commandRegistry.execute("updateinstruction", {
    //     rows: rows,
    //     value: "this is a test",
    //     exercise: "barbel bench press",
    //   });
    // }, 5000);
  }, [rows]);

  useEffect(() => {
    // Only show rows with matching workout names
    if (searchMuscleText.length < 1) {
      setDisplayRows(
        rows.filter(
          (row) =>
            row?.exercise !== undefined &&
            row.exercise.includes(searchWorkoutText.toLowerCase())
          // && searchMuscleText.includes(row.muscle)
        )
      );
    } else {
      setDisplayRows(
        rows.filter(
          (row) =>
            row?.exercise !== undefined &&
            row.exercise.includes(searchWorkoutText.toLowerCase()) &&
            searchMuscleText.includes(row.muscle)
        )
      );
    }
  }, [searchWorkoutText, rows, searchMuscleText]);

  return (
    <div style={{ height: "90%", width: "100%" }}>
      <DataGrid
        rows={displayRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        // onRowSelectionModelChange={(params, e, details) =>  console.log(params, e, details)}
        // onCellClick={(params, e, details) => console.log('clicked row', params)}
        disableRowSelectionOnClick
        onCellKeyDown={onEnterKeyDown}
      />
    </div>
  );
}
