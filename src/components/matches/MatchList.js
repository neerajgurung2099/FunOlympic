import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Box } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";
import Checkbox from "@mui/material/Checkbox";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Typography } from "@mui/material";
const MatchList = () => {
  const [state, setState] = useState({
    loading: true,
    errorFetching: false,
    rows: [],
  });

  const columns = [
    { field: "id", headerName: "SNO", width: 70 },
    { field: "gameName", headerName: "Game Name", width: 150 },
    { field: "matchTitle", headerName: "Match Title", width: 150 },
    {
      field: "view",
      headerName: "View",
      sortable: false,
      width: 100,
    },
    { field: "createdDate", headerName: "Created Date", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: () => {
        return (
          <div className="cell-action">
            <div className="view-button">View</div>
            <div className="delete-button">Delete</div>
          </div>
        );
      },
    },
  ];

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, errorFetching: false });
  };
  useEffect(() => {
    setState({ ...state, loading: true });
    axios
      .get("https://localhost:7084/api/Game/GetAllGameGroup")
      .then((response) => {
        if (response.data.value) {
          var result = JSON.parse(response.data.value);
          if (result.length >= 0) {
            console.log(result);
            var arr = [];
            var obj = {};
            for (var i = 0; i < result.length; i++) {
              obj = {
                sno: i + 1,
                id: result[i]["Group_Id"],
                groupName: result[i]["Group_Name"],
                groupDescription: result[i]["Group_Description"],
                view: result[i]["View"],
                createdDate: result[i]["Created_Date"],
              };
              arr.push(obj);
            }
            console.log(arr);
            setState({
              ...state,
              loading: false,
              rows: state.rows.concat(arr),
            });
          } else {
            setState({ rows: [], errorFetching: true, loading: false });
          }
        } else {
          setState({ errorFetching: true, loading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        setState({ errorFetching: true, loading: false });
      });
  }, []);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      {state.loading ? (
        <Box style={{ height: 600, width: "100%" }}>
          <Typography component="div" variant="h3">
            <Skeleton />
          </Typography>
          <Typography component="div" variant="h3">
            <Skeleton sx={{ height: 500 }} />
          </Typography>
        </Box>
      ) : (
        <>
          {console.log(state.rows)}
          <Box style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={state.rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
            <Snackbar
              open={state.errorFetching}
              autoHideDuration={1000}
              onClose={handleAlertClose}
            >
              <Alert
                onClose={handleAlertClose}
                severity={state.errorFetching ? "error" : "success"}
                sx={{ width: "100%" }}
              >
                {state.errorFetching && "Something went wrong"}
              </Alert>
            </Snackbar>
          </Box>
        </>
      )}
    </>
  );
};

export default MatchList;
