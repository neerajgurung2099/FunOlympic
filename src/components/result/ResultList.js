import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Box } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";
import Checkbox from "@mui/material/Checkbox";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
const ResultList = () => {
  const [state, setState] = useState({
    loading: true,
    errorFetching: false,
    rows: [],
  });

  const columns = [
    { field: "id", headerName: "Match Id", width: 70 },
    { field: "gameName", headerName: "Game Name", width: 150 },
    { field: "matchTitle", headerName: "Match Title", width: 400 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        console.log(params.id);
        return (
          <Button component={Link} to={"" + params.id} variant="outlined">
            Manage Result
          </Button>
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
      .get("https://localhost:7084/api/Game/GetAllMatches")
      .then((response) => {
        if (response.data.value) {
          var result = JSON.parse(response.data.value);
          if (result.length >= 0) {
            console.log(result);
            var arr = [];
            var obj = {};
            for (var i = 0; i < result.length; i++) {
              obj = {
                id: result[i]["Match_Id"],
                gameName: result[i]["Game_Name"],
                matchTitle: result[i]["Match_Title"],
                view: result[i]["View"],
                startDate: result[i]["Start_Date"],
                startTime: result[i]["Start_Time"],
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
              pageSize={10}
              disableSelectionOnClick
              rowsPerPageOptions={[10]}
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

export default ResultList;
