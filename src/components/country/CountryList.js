import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Box } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const CountryList = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: true,
    errorFetching: false,
    rows: [],
  });

  const handleCountryDelete = (matchId) => {
    axios
      .post("https://localhost:7084/api/Game/DeleteGame", {
        GameId: matchId,
        GameName: "",
        GameDescription: "",
        matches: [],
      })
      .then((response) => {
        var result = JSON.parse(response.data.value);
        if (result.Status == 200) {
          navigate(0);
        } else {
          setState({
            ...state,
            alertOpen: true,
            alertMessage: "Failed to delete",
            alertType: "error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setState({
          ...state,
          alertOpen: true,
          alertMessage: "Failed to delete",
          alertType: "error",
        });
      });
  };

  const columns = [
    { field: "id", headerName: "SNO", width: 70 },
    { field: "countryName", headerName: "Country Name", width: 900 },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Button
              component={Link}
              variant="outlined"
              to={`${params.row.matchId}`}
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <Button
              onClick={() => handleCountryDelete(params.row.matchId)}
              variant="outlined"
            >
              Delete
            </Button>
          </>
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
      .get("https://localhost:7084/api/Game/GetAllCountry")
      .then((response) => {
        if (response.data.value) {
          var result = JSON.parse(response.data.value);
          if (result.length >= 0) {
            console.log(result);
            var arr = [];
            var obj = {};
            for (var i = 0; i < result.length; i++) {
              obj = {
                id: i + 1,
                countryName: result[i]["Country_Name"],
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

export default CountryList;
