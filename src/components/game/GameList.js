import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Box } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const GameList = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: true,
    alertOpen: false,
    alertMessage: "",
    alertType: "",
    rows: [],
  });

  const columns = [
    { field: "sno", headerName: "SNO", width: 70 },
    { field: "id", headerName: "Game Id", width: 70 },
    { field: "gameName", headerName: "Game Name", width: 150 },
    { field: "groupName", headerName: "Group name", width: 150 },
    { field: "category", headerName: "Game Category", width: 150 },
    { field: "participantType", headerName: "Participant Type", width: 150 },
    { field: "gameDescription", headerName: "Game Description", width: 300 },
    { field: "totalMatches", headerName: "Total Matches", width: 100 },
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
      renderCell: (params) => {
        return (
          <>
            <Button
              component={Link}
              variant="outlined"
              to={`${params.row.id}`}
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <Button
              onClick={() => handleGameDelete(params.row.id)}
              variant="outlined"
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const handleGameDelete = (gameId) => {
    axios
      .post("https://localhost:7084/api/Game/DeleteGame", {
        GameId: gameId,
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
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, alertOpen: false });
  };
  useEffect(() => {
    setState({ ...state, loading: true });
    axios
      .get("https://localhost:7084/api/Game/GetAllGame")
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
                id: result[i]["Game_Id"],
                gameName: result[i]["Game_Name"],
                groupName: result[i]["Group_Name"],
                gameDescription: result[i]["Game_Description"],
                view: result[i]["View"],
                createdDate: result[i]["Created_Date"],
                category: result[i]["Category"],
                participantType: result[i]["Participant_Type"],
                totalMatches: result[i]["Total_Matches"],
              };
              arr.push(obj);
            }
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
        setState({ ...state, errorFetching: true, loading: false });
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
              open={state.alerOpen}
              autoHideDuration={1000}
              onClose={handleAlertClose}
            >
              <Alert
                onClose={handleAlertClose}
                severity={state.alertType}
                sx={{ width: "100%" }}
              >
                {state.alertMessage}
              </Alert>
            </Snackbar>
          </Box>
        </>
      )}
    </>
  );
};

export default GameList;
