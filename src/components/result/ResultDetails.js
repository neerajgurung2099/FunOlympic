import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  FormControl,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
const ResultDetails = () => {
  const params = useParams();
  const matchId = params.matchId;

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post("https://localhost:7084/api/Game/GetMatchParticipantByMatchId", {
        MatchId: matchId,
        LiveLink: "",
        MatchTitle: "",
        StartDate: "",
        StartTime: "",
        matchParticipants: [],
      })
      .then((response) => {
        console.log(response);
        if (response.data.value) {
          var result = JSON.parse(response.data.value);
          console.log(result);
          if (
            result[0]["ParticipantType"] == 1 ||
            result[0]["ParticipantType"] == 2
          ) {
            var pointA = result[0]["Points"] == "" ? 0 : result[0]["Points"];
            var pointB = result[1]["Points"] == "" ? 0 : result[1]["Points"];
            setState({
              ...state,
              PointA: pointA,
              PointB: pointB,
              ParticipantType: result[0]["ParticipantType"],
              FirstId: result[0]["Match_Participant_Id"],
              SecondId: result[1]["Match_Participant_Id"],
              FirstName: result[0]["Participant_Name"],
              SecondName: result[1]["Participant_Name"],
            });
          } else {
            var obj = {};
            var arr = [];
            for (var i = 0; i < result.length; i++) {
              obj = {
                id: result[i]["Match_Participant_Id"],
                participantname: result[i]["Participant_Name"],
                points: result[i]["Points"] == "" ? 0 : result[i]["Points"],
              };
              arr.push(obj);
            }

            setState({ ...state, ParticipantList: arr });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    setState({ ...state, loading: true });
    var arr = [];
    if (state.ParticipantType == 1 || 2) {
      arr.push({
        MatchParticipantId: state.FirstId,
        Points: state.PointA,
      });
      arr.push({
        MatchParticipantId: state.SecondId,
        Points: state.PointB,
      });
    } else {
    }
    console.log(arr);
    axios
      .post("https://localhost:7084/api/Game/InsertMatchPoints", {
        matchParticipants: arr,
      })
      .then((response) => {
        if (response.data.value) {
          const data = JSON.parse(response.data.value);
          if (data.Status == 200) {
            navigate("/results");
          } else {
            setState({
              ...state,
              loading: false,
              open: true,
              success: false,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setState({
          ...state,
          loading: false,
          open: true,
          success: false,
        });
      });
  };

  const initialState = {
    ParticipantType: 0,
    PointA: 0,
    PointB: 0,
    FirstId: 0,
    SecondId: 0,
    ParticipantList: [],
    open: false,
    loading: false,
  };
  const [state, setState] = useState(initialState);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  const participantColumn = [
    { field: "id", headerName: "Paticipant Id", width: 150 },
    { field: "participantname", headerName: "Participant Name", width: 400 },
    {
      field: "points",
      headerName: "Points",
      width: 150,
      type: "number",
      editable: true,
    },
  ];

  const handleClick = () => {
    console.log(state);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      autoComplete="off"
      style={{ boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.50)" }}
    >
      <Card>
        <Snackbar
          open={state.open}
          autoHideDuration={1000}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity={state.success ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {state.success ? "Succesfully Saved" : "Failed to save"}
          </Alert>
        </Snackbar>
        <CardHeader subheader="Manage Match Results" title="Results" />
        <Divider />
        <CardContent>
          <Grid container spacing={1}>
            {state.ParticipantType == 1 || state.ParticipantType == 2 ? (
              <>
                <Grid item md={3} xs={12}>
                  <FormControl fullWidth sx={{ ml: 1, mt: 1 }}>
                    <Typography sx={{ ml: 1 }} variant="h5" gutterBottom>
                      {state.FirstName}
                    </Typography>
                    <TextField
                      sx={{ width: "100% !important" }}
                      helperText="Please specify Match Point"
                      label="Points"
                      name="PointA"
                      onChange={handleChange}
                      required
                      value={state.PointA}
                      variant="outlined"
                      type="number"
                    />
                  </FormControl>
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControl fullWidth sx={{ ml: 1, mt: 1 }}>
                    <Typography sx={{ ml: 1 }} variant="h5" gutterBottom>
                      {state.SecondName}
                    </Typography>
                    <TextField
                      sx={{ width: "100% !important" }}
                      helperText="Please specify Match Points"
                      label="Points"
                      name="PointB"
                      onChange={handleChange}
                      required
                      value={state.PointB}
                      variant="outlined"
                      type="number"
                    />
                  </FormControl>
                </Grid>
              </>
            ) : (
              <Grid item md={8} xs={12}>
                <Box sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={state.ParticipantList}
                    columns={participantColumn}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    cellValueChanged={(params) => {
                      console.log(params);
                    }}
                  />
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <LoadingButton
                sx={{ ml: 2 }}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                onClick={handleClick}
                loading={state.loading ? true : false}
              >
                Save
              </LoadingButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResultDetails;
