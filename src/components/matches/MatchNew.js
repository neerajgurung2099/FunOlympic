import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import IosSwitch from "../common/IosSwitch";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const MatchNew = () => {
  const initialState = {
    view: true,
    gameId: "",
    teamA: "",
    teamB: "",
    playerA: "",
    playerB: "",
    participantId: [],
    participantType: 0,
    gameList: [],
    playerList: [],
    teamList: [],
    selectedTeam: [],
    selectedPlayer: [],
    matchTitle: "",
    liveLink: "",
    startDateTime: dayjs(),
  };
  const [values, setValues] = useState(initialState);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setValues({ ...values, open: false });
  };

  const handleSubmit = () => {
    console.log(values);
    setValues({ ...values, loading: true });
    var cloneState = {};
    Object.assign(cloneState, values);
    var arr = [];
    if (values.participantType == 1) {
      arr = [
        { ParticipantId: values.playerA },
        { ParticipantId: values.playerB },
      ];
    } else if (values.participantType == 2) {
      arr = [{ ParticipantId: values.teamA }, { ParticipantId: values.teamB }];
    } else if (values.participantType == 3) {
      var obj = {};
      for (var i = 0; i < values.selectedTeam.length; i++) {
        obj = {
          ParticipantId: values.selectedTeam[i]["id"],
        };
        arr.push(obj);
      }
    } else if (values.participantType == 4) {
      var obj = {};
      arr = [];
      for (var i = 0; i < values.selectedPlayer.length; i++) {
        obj = {
          ParticipantId: values.selectedPlayer[i],
        };
        arr.push(obj);
      }
    }
    cloneState = { ...cloneState, participantId: arr };
    console.log([cloneState, values]);
    console.log(dayjs(cloneState.startDateTime).format("HH:mm:ss"));
    console.log(dayjs(cloneState.startDateTime).format("MM/DD/YYYY"));
    axios
      .post("https://localhost:7084/api/Game/InsertMatch", {
        GameId: cloneState.gameId,
        View: cloneState.view,
        MatchTitle: cloneState.matchTitle,
        matchParticipants: cloneState.participantId,
        LiveLink: cloneState.liveLink,
        startTime: dayjs(cloneState.startDateTime).format("HH:mm:ss"),
        startDate: dayjs(cloneState.startDateTime).format("MM/DD/YYYY"),
      })
      .then((response) => {
        if (response.data.value) {
          const data = JSON.parse(response.data.value);
          if (data.Status == 200) {
            setValues({
              ...initialState,
              gameList: values.gameList,
              open: true,
              success: true,
            });
          } else {
            setValues({
              ...values,
              loading: false,
              open: true,
              success: false,
            });
          }
        } else {
          setValues({
            ...values,
            loading: false,
            open: true,
            success: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setValues({
          ...values,
          loading: false,
          open: true,
          success: false,
        });
      });
  };

  const handleChange = (event) => {
    if (event.target.name == "gameId") {
      var participantType = 0;
      for (var i = 0; i < values.gameList.length; i++) {
        if (values.gameList[i]["id"] == event.target.value) {
          participantType = values.gameList[i]["participantType"];
        }
      }
      setValues({
        ...values,
        [event.target.name]: event.target.value,
        participantType: participantType,
      });
      //   setValues({...values} , participantType : );
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
    }
  };

  useEffect(() => {
    axios
      .get("https://localhost:7084/api/Game/GetAllGame")
      .then((response) => {
        if (response.data.value) {
          var result = JSON.parse(response.data.value);
          var obj = {};
          var arr = [];
          for (var i = 0; i < result.length; i++) {
            obj = {
              id: result[i]["Game_Id"],
              gameName: result[i]["Game_Name"],
              participantType: result[i]["Participant_Id"],
            };
            arr.push(obj);
          }
          setValues({ ...values, gameList: arr });
        } else {
        }
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    if (values.participantType == 1 || values.participantType == 4) {
      axios
        .post("https://localhost:7084/api/Game/GetPlayerByGameId", {
          GameId: parseInt(values.gameId),
          GameName: "",
          GameDescription: "",
          matches: [],
        })
        .then((response) => {
          if (response.data.value) {
            var result = JSON.parse(response.data.value);
            var obj = {};
            var arr = [];
            for (var i = 0; i < result.length; i++) {
              obj = {
                id: result[i]["Player_Id"],
                playerName: result[i]["Player_Name"],
              };
              arr.push(obj);
            }
            setValues({
              ...values,
              playerA: "",
              playerB: "",
              teamA: "",
              teamB: "",
              playerList: arr,
            });
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (values.participantType == 2 || values.participantType == 3) {
      axios
        .post("https://localhost:7084/api/Game/GetTeamByGameId", {
          GameId: parseInt(values.gameId),
          GameName: "",
          GameDescription: "",
        })
        .then((response) => {
          if (response.data.value) {
            var result = JSON.parse(response.data.value);
            var obj = {};
            var arr = [];
            for (var i = 0; i < result.length; i++) {
              obj = {
                id: result[i]["Team_Id"],
                teamName: result[i]["Team_Name"],
              };
              arr.push(obj);
            }
            setValues({
              ...values,
              playerA: "",
              playerB: "",
              teamA: "",
              teamB: "",
              teamList: arr,
            });
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [values.gameId]);

  const teamColumn = [
    { field: "id", headerName: "Team Id", width: 90 },
    { field: "teamName", headerName: "Team Name", width: 150 },
  ];

  const playerColumn = [
    { field: "id", headerName: "Player Id", width: 90 },
    { field: "playerName", headerName: "Player Name", width: 150 },
  ];

  const handleDateTimeChange = (newValue) => {
    setValues({ ...values, startDateTime: newValue });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            open={values.open}
            autoHideDuration={1000}
            onClose={handleAlertClose}
          >
            <Alert
              onClose={handleAlertClose}
              severity={values.success ? "success" : "error"}
              sx={{ width: "100%" }}
            >
              {values.success ? "Succesfully Saved" : "Failed to save"}
            </Alert>
          </Snackbar>
          <CardHeader subheader="Create new game" title="Game" />
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item md={3} xs={12}>
                <FormControl fullWidth sx={{ ml: 1, mt: 1 }}>
                  <InputLabel id="game-label">Game Name</InputLabel>
                  <Select
                    labelId="game-label"
                    id="game-select"
                    value={values.gameId}
                    label="Game Name"
                    name="gameId"
                    onChange={handleChange}
                  >
                    {values.gameList.map((game) => (
                      <MenuItem value={game.id} key={game.id}>
                        {game.gameName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={3} xs={12}>
                <TextField
                  sx={{ width: "100% !important" }}
                  helperText="Please specify Match Title"
                  label="Match Title"
                  name="matchTitle"
                  onChange={handleChange}
                  required
                  value={values.matchTitle}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <TextField
                  sx={{ width: "100% !important" }}
                  helperText="Please specify Video Link"
                  label="Live Link"
                  name="liveLink"
                  onChange={handleChange}
                  required
                  value={values.liveLink}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={3} xs={12} sx={{ display: "flex !important" }}>
                <FormControlLabel
                  sx={{ ml: 2 }}
                  control={
                    <IosSwitch
                      onChange={() =>
                        setValues({ ...values, view: !values.view })
                      }
                      sx={{ mr: 2 }}
                      defaultChecked
                    />
                  }
                  label="View"
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <DesktopDatePicker
                  label="Start Date"
                  inputFormat="MM/DD/YYYY"
                  value={values.startDateTime}
                  onChange={handleDateTimeChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>

              <Grid item md={3} xs={12}>
                <TimePicker
                  label="Start Time"
                  value={values.startDateTime}
                  onChange={handleDateTimeChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>

              {values.participantType == 1 && (
                <>
                  <Grid item md={3} xs={12}>
                    <FormControl fullWidth sx={{ ml: 1, mt: 1 }}>
                      <InputLabel id="playerA-label">Player A</InputLabel>
                      <Select
                        labelId="playerA-label"
                        id="playerA-select"
                        value={values.playerA}
                        label="Player A"
                        name="playerA"
                        onChange={handleChange}
                      >
                        {values.playerList.map((player) => (
                          <MenuItem value={player.id} key={player.id}>
                            {player.playerName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item md={3} xs={12}>
                    <FormControl fullWidth sx={{ ml: 1, mt: 1 }}>
                      <InputLabel id="playerB-label">Player B</InputLabel>
                      <Select
                        labelId="playerB-label"
                        id="playerB-select"
                        value={values.playerB}
                        label="Player B"
                        name="playerB"
                        onChange={handleChange}
                      >
                        {values.playerList.map((player) => (
                          <MenuItem value={player.id} key={player.id}>
                            {player.playerName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {values.participantType == 2 && (
                <>
                  <Grid item md={3} xs={12}>
                    <FormControl fullWidth sx={{ ml: 1, mt: 1 }}>
                      <InputLabel id="teamA-label">Team A</InputLabel>
                      <Select
                        labelId="teamA-label"
                        id="teamA-select"
                        value={values.teamA}
                        label="Team A"
                        name="teamA"
                        onChange={handleChange}
                      >
                        {values.teamList.map((team) => (
                          <MenuItem value={team.id} key={team.id}>
                            {team.teamName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item md={3} xs={12}>
                    <FormControl fullWidth sx={{ ml: 1, mt: 1 }}>
                      <InputLabel id="teamB-label">Team B</InputLabel>
                      <Select
                        labelId="teamB-label"
                        id="teamB-select"
                        value={values.teamB}
                        label="Team B"
                        name="teamB"
                        onChange={handleChange}
                      >
                        {values.teamList.map((team) => (
                          <MenuItem value={team.id} key={team.id}>
                            {team.teamName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {values.participantType == 3 && (
                <>
                  <Grid item md={5} xs={12}>
                    <Box sx={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={values.teamList}
                        columns={teamColumn}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        onSelectionModelChange={(newSelection) => {
                          setValues({
                            ...values,
                            selectedTeam: newSelection,
                          });
                        }}
                      />
                    </Box>
                  </Grid>
                </>
              )}

              {values.participantType == 4 && (
                <>
                  <Grid item md={5} xs={12}>
                    <Box sx={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={values.playerList}
                        columns={playerColumn}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        onSelectionModelChange={(newSelection) => {
                          setValues({
                            ...values,
                            selectedPlayer: newSelection,
                          });
                        }}
                      />
                    </Box>
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <LoadingButton
                  sx={{ ml: 2 }}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                  onClick={handleSubmit}
                  loading={values.loading ? true : false}
                >
                  Save
                </LoadingButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default MatchNew;
