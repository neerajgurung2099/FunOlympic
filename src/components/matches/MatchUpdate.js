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
import { useNavigate, useParams } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const MatchUpdate = () => {
  const navigate = useNavigate();
  const params = useParams();
  const matchId = params.matchId;
  const initialState = {
    view: true,
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
    axios
      .post("https://localhost:7084/api/Game/UpdateMatch", {
        MatchId: matchId,
        GameId: 0,
        View: values.view,
        MatchTitle: values.matchTitle,
        LiveLink: values.liveLink,
        startTime: dayjs(values.startDateTime).format("HH:mm:ss"),
        startDate: dayjs(values.startDateTime).format("MM/DD/YYYY"),
        matchParticipants: [],
      })
      .then((response) => {
        if (response.data.value) {
          const data = JSON.parse(response.data.value);
          if (data.Status == 200) {
            navigate("/matches");
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

  useEffect(() => {
    axios
      .post("https://localhost:7084/api/Game/GetMatchDetailsById", {
        MatchId: matchId,
        GameId: 0,
        MatchTitle: "",
        matchParticipants: [],
        LiveLink: "",
        startTime: dayjs(),
        startDate: dayjs(),
      })
      .then((response) => {
        var result = JSON.parse(response.data.value);
        console.log(result);
        setValues({
          ...values,
          matchTitle: result[0]["Match_Title"],
          liveLink: result[0]["Live_Link"],
          view: result[0]["View"],
        });
      })
      .catch((error) => console.log(error));
  }, []);

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
          <CardHeader subheader="Update game" title="Match" />
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
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
              <Grid item md={6} xs={12} sx={{ display: "flex !important" }}>
                <FormControlLabel
                  sx={{ ml: 2 }}
                  control={
                    <IosSwitch
                      onChange={() =>
                        setValues({ ...values, view: !values.view })
                      }
                      sx={{ mr: 2 }}
                    />
                  }
                  checked={values.view}
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

export default MatchUpdate;
